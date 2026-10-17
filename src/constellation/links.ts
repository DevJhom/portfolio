import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    LineBasicMaterial,
    LineSegments,
} from 'three';
import type { TechNode } from './nodes';

export interface LinkSet {
    lines: LineSegments<BufferGeometry, LineBasicMaterial>;
    edges: [TechNode, TechNode][];
    opacity: number;
    target: number;
    maxOpacity: number;
}

// `tint` overrides the brand colours, e.g. a neutral grey for the ambient web. `boost` pushes
// the colours past the bloom threshold, since WebGL lines are always 1px and need the halo.
export function createLinkSet(edges: [TechNode, TechNode][], maxOpacity: number, tint?: Color, boost = 1): LinkSet {
    const color = new Color();
    const positions = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);

    edges.forEach(([a, b], i) => {
        color.copy(tint ?? a.brand).multiplyScalar(boost).toArray(colors, i * 6);
        color.copy(tint ?? b.brand).multiplyScalar(boost).toArray(colors, i * 6 + 3);
    });

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    const material = new LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
    });

    const lines = new LineSegments(geometry, material);
    lines.frustumCulled = false;
    lines.renderOrder = 0;

    return { lines, edges, opacity: 0, target: 0, maxOpacity };
}

// Eases opacity toward the target and, while visible, re-reads the floating node positions.
export function updateLinkSet(set: LinkSet, ease: number): void {
    set.opacity += (set.target - set.opacity) * ease;
    set.lines.material.opacity = set.opacity * set.maxOpacity;
    set.lines.visible = set.opacity > 0.005;
    if (!set.lines.visible) return;

    const attribute = set.lines.geometry.getAttribute('position') as BufferAttribute;
    set.edges.forEach(([a, b], i) => {
        a.group.position.toArray(attribute.array, i * 6);
        b.group.position.toArray(attribute.array, i * 6 + 3);
    });
    attribute.needsUpdate = true;
}

export function disposeLinkSet(set: LinkSet): void {
    set.lines.geometry.dispose();
    set.lines.material.dispose();
}
