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

// Minimum spanning tree over the given nodes (Prim's), plus `extra` of the shortest
// remaining edges, which gives a constellation shape rather than a full mesh.
export function constellationEdges(nodes: TechNode[], extra: number): [TechNode, TechNode][] {
    if (nodes.length < 2) return [];

    const dist = (a: TechNode, b: TechNode) => a.home.distanceTo(b.home);
    const inTree = new Set<TechNode>([nodes[0]]);
    const edges: [TechNode, TechNode][] = [];

    while (inTree.size < nodes.length) {
        let best: [TechNode, TechNode] | null = null;
        let bestDistance = Infinity;
        for (const a of inTree) {
            for (const b of nodes) {
                if (inTree.has(b)) continue;
                const d = dist(a, b);
                if (d < bestDistance) {
                    bestDistance = d;
                    best = [a, b];
                }
            }
        }
        edges.push(best!);
        inTree.add(best![1]);
    }

    const used = new Set(edges.map(([a, b]) => key(a, b)));
    const rest: [TechNode, TechNode][] = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (!used.has(key(nodes[i], nodes[j]))) rest.push([nodes[i], nodes[j]]);
        }
    }
    rest.sort((x, y) => dist(...x) - dist(...y));

    return edges.concat(rest.slice(0, extra));
}

// Each node's k nearest neighbours, de-duplicated: a faint web that is always visible.
export function nearestEdges(nodes: TechNode[], k: number): [TechNode, TechNode][] {
    const seen = new Set<string>();
    const edges: [TechNode, TechNode][] = [];

    for (const a of nodes) {
        const nearest = nodes
            .filter(b => b !== a)
            .sort((x, y) => a.home.distanceTo(x.home) - a.home.distanceTo(y.home))
            .slice(0, k);
        for (const b of nearest) {
            const id = key(a, b);
            if (seen.has(id)) continue;
            seen.add(id);
            edges.push([a, b]);
        }
    }

    return edges;
}

function key(a: TechNode, b: TechNode): string {
    return [a.tech.id, b.tech.id].sort().join('|');
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
