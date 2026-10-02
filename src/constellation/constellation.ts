import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Raycaster,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer,
    type Texture,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { jobs, type JobId } from './jobs';
import { techs, type Tech } from './techs';
import { floatOffset } from './layout';
import { constellationEdges, createLinkSet, disposeLinkSet, nearestEdges, updateLinkSet, type LinkSet } from './links';
import { applyNodeState, createNodes, disposeNodes, type TechNode } from './nodes';
import { createPostFx } from './postfx';
import { createGlowTexture } from './textures';

const BACKGROUND = '#0c0c0c';
const MOBILE_QUERY = '(max-width: 768px)';
const NEUTRAL = 0.6;
const EASE = 0.08;
const MAX_DISTANCE = 20;
// Radius of the sphere that must fit on screen: cluster radius plus logo size and drift.
const FIT_RADIUS = 4.9;
const COLLAPSE_MS = 450;

export interface HoverInfo {
    tech: Tech;
    // Screen position of the node, in CSS pixels relative to the container.
    x: number;
    y: number;
    // On-screen radius of the logo, so a label can sit just below it at any zoom.
    radius: number;
}

export interface ConstellationOptions {
    // Called every frame while a node is hovered (it moves as the cluster turns), then once with null.
    onHover?: (info: HoverInfo | null) => void;
}

export interface Constellation {
    setActiveJob(id: JobId | null): void;
    // Pulls every node into the centre and fades the scene out; resolves when it is done.
    collapse(): Promise<void>;
    dispose(): void;
    renderer: WebGLRenderer;
}

export async function mount(container: HTMLElement, options: ConstellationOptions = {}): Promise<Constellation> {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    // scene.background, not renderer.setClearColor: through the EffectComposer the clear
    // colour lands in the linear render target unconverted and OutputPass encodes it a
    // second time, turning #0c0c0c into #3d3d3d.
    scene.background = new Color(BACKGROUND);
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.1, 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    // The canvas sits in a scrolling page, so the wheel must keep scrolling it. Touch screens
    // rotate too: see the touch-action note below for how that coexists with page scrolling.
    controls.enableZoom = false;
    controls.minDistance = 6;
    controls.maxDistance = MAX_DISTANCE;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.6;

    const postFx = createPostFx(renderer, scene, camera, isMobile ? 0.5 : 0.7);

    // Nodes
    const glowTexture = createGlowTexture();
    const nodes = await createNodes(techs, glowTexture);
    for (const node of nodes) scene.add(node.group);
    const nodeById = new Map(nodes.map(node => [node.tech.id, node]));

    // Links: a faint always-on web, plus one constellation per job that fades in on demand.
    const ambient = createLinkSet(nearestEdges(nodes, 2), 0.18, new Color('#7e7e7e'));
    const jobLinks = new Map<JobId, LinkSet>(jobs.map(job => {
        const members = job.techs.map(id => nodeById.get(id)!);
        return [job.id, createLinkSet(constellationEdges(members, 2), 1, undefined, 1.8)];
    }));
    const linkSets = [ambient, ...jobLinks.values()];
    for (const set of linkSets) scene.add(set.lines);

    const dust = createDust(glowTexture, isMobile ? 250 : 500);
    scene.add(dust);

    // State
    let hovered: TechNode | null = null;

    function setActiveJob(id: JobId | null): void {
        const used = new Set(jobs.find(job => job.id === id)?.techs ?? []);
        for (const node of nodes) {
            node.target = id === null ? NEUTRAL : used.has(node.tech.id) ? 1 : 0;
        }
        for (const [jobId, set] of jobLinks) set.target = jobId === id ? 1 : 0;
        ambient.target = id === null ? 1 : 0.35;
    }

    // Picking
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const logos = nodes.map(node => node.logo);
    let downAt: { x: number; y: number } | null = null;

    function pick(event: PointerEvent): TechNode | null {
        const rect = canvas.getBoundingClientRect();
        pointer.set(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(logos, false)[0];
        return hit ? nodeById.get(hit.object.userData.techId) ?? null : null;
    }

    function setHovered(node: TechNode | null): void {
        if (node === hovered) return;
        hovered = node;
        canvas.style.cursor = node ? 'pointer' : '';
        // Pause auto-rotate while reading a label, so it doesn't slide out from under the cursor.
        controls.autoRotate = !reducedMotion && !node;
        if (!node) options.onHover?.(null);
    }

    function onPointerMove(event: PointerEvent): void {
        // While dragging to orbit, keep whatever is hovered instead of flickering across nodes.
        if (event.pointerType !== 'mouse' || event.buttons !== 0) return;
        setHovered(pick(event));
    }

    function onPointerLeave(event: PointerEvent): void {
        if (event.pointerType === 'mouse') setHovered(null);
    }

    function onPointerDown(event: PointerEvent): void {
        downAt = { x: event.clientX, y: event.clientY };
    }

    // Touch has no hover: a tap (not a drag) selects or clears a node.
    function onPointerUp(event: PointerEvent): void {
        if (!downAt) return;
        const moved = Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y);
        downAt = null;
        if (event.pointerType !== 'mouse' && moved < 8) setHovered(pick(event));
    }

    const canvas = renderer.domElement;
    // OrbitControls sets touch-action: none, which would swallow vertical page scrolls. pan-y
    // hands vertical swipes back to the browser (it sends pointercancel, which OrbitControls
    // treats as pointerup) and leaves horizontal drags to OrbitControls, so a sideways swipe
    // spins the constellation and an up/down swipe still scrolls the page.
    if (coarsePointer) canvas.style.touchAction = 'pan-y';
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);

    // Sizing
    function resize(): void {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        // Portrait shapes are narrow, so widen the vertical FOV to keep the cluster large.
        camera.fov = camera.aspect < 1 ? 60 : 45;
        camera.position.setLength(fitDistance());
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        postFx.setSize(width, height);
    }
    // Distance at which FIT_RADIUS fills the narrower of the two FOVs.
    function fitDistance(): number {
        const halfVertical = (camera.fov * Math.PI) / 360;
        const halfHorizontal = Math.atan(Math.tan(halfVertical) * camera.aspect);
        const distance = FIT_RADIUS / Math.sin(Math.min(halfVertical, halfHorizontal));
        return Math.min(Math.max(distance, controls.minDistance), controls.maxDistance);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Collapse: 0 = normal, 1 = every node pulled into the centre and faded out.
    let collapseStart: number | null = null;
    let collapsing: Promise<void> | null = null;

    function collapse(): Promise<void> {
        if (reducedMotion) return Promise.resolve();
        if (!collapsing) {
            collapseStart = performance.now();
            setHovered(null);
            // A timer, not the render loop, resolves this: rAF stalls in background tabs.
            collapsing = new Promise(resolve => window.setTimeout(resolve, COLLAPSE_MS));
        }
        return collapsing;
    }

    // Loop
    const offset = new Vector3();
    const projected = new Vector3();
    let last = performance.now();

    renderer.setAnimationLoop(now => {
        const delta = Math.min((now - last) / 1000, 0.1);
        last = now;
        const time = now / 1000;
        // Frame-rate independent easing: EASE is the per-frame factor at 60fps.
        const ease = 1 - Math.pow(1 - EASE, delta * 60);
        const progress = collapseStart === null ? 0 : Math.min((now - collapseStart) / COLLAPSE_MS, 1);
        // Ease-in cubic, so the pull starts gently and snaps shut at the end.
        const remaining = 1 - progress * progress * progress;

        for (const node of nodes) {
            node.group.position.copy(node.home);
            if (!reducedMotion) node.group.position.add(floatOffset(node.phase, time, offset));
            node.group.position.multiplyScalar(remaining);

            node.level += (node.target - node.level) * ease;
            node.hover += ((node === hovered ? 1 : 0) - node.hover) * Math.min(ease * 2, 1);
            applyNodeState(node);
            if (progress > 0) {
                node.group.scale.setScalar(Math.max(remaining, 0.001));
                node.logo.material.opacity *= remaining;
                node.glow.material.opacity *= remaining;
            }
        }

        for (const set of linkSets) {
            updateLinkSet(set, ease);
            set.lines.material.opacity *= remaining;
        }
        if (!reducedMotion) dust.rotation.y += delta * 0.01;

        controls.update(delta);
        postFx.composer.render(delta);

        if (hovered) {
            const height = container.clientHeight;
            const distance = camera.position.distanceTo(hovered.group.position);
            const pixelsPerUnit = height / (2 * Math.tan((camera.fov * Math.PI) / 360) * distance);
            projected.copy(hovered.group.position).project(camera);
            options.onHover?.({
                tech: hovered.tech,
                x: (projected.x * 0.5 + 0.5) * container.clientWidth,
                y: (-projected.y * 0.5 + 0.5) * height,
                radius: (hovered.logo.scale.x / 2) * pixelsPerUnit,
            });
        }
    });

    function dispose(): void {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointerup', onPointerUp);
        controls.dispose();

        disposeNodes(nodes);
        for (const set of linkSets) disposeLinkSet(set);
        dust.geometry.dispose();
        dust.material.dispose();
        glowTexture.dispose();

        postFx.dispose();
        renderer.dispose();
        canvas.remove();
    }

    setActiveJob(null);
    return { setActiveJob, collapse, dispose, renderer };
}

// Faint specks in a thick shell around the cluster, for depth while orbiting. The shell
// starts beyond controls.maxDistance, so no speck can drift right up to the lens and
// balloon into a large blob.
function createDust(texture: Texture, count: number): Points<BufferGeometry, PointsMaterial> {
    const positions = new Float32Array(count * 3);
    const point = new Vector3();

    for (let i = 0; i < count; i++) {
        point.randomDirection().multiplyScalar(MAX_DISTANCE + 4 + Math.random() * 20);
        point.toArray(positions, i * 3);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    const material = new PointsMaterial({
        map: texture,
        color: '#4c4c4c',
        size: 0.3,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
    });

    return new Points(geometry, material);
}
