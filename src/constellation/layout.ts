import { Vector3 } from 'three';

// Evenly spreads `count` points over a sphere (golden-angle spiral), so no two logos bunch up.
export function fibonacciSphere(count: number, radius: number): Vector3[] {
    const points: Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - ((i + 0.5) / count) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        points.push(new Vector3(Math.cos(theta) * ring, y, Math.sin(theta) * ring).multiplyScalar(radius));
    }

    return points;
}

// Reorders `points` so linked indices sit close together; seeded, so the layout is stable.
export function arrangeForLinks(points: Vector3[], links: [number, number][], restarts = 20): Vector3[] {
    const count = points.length;
    const cost = (slot: number[]) =>
        links.reduce((sum, [a, b]) => sum + points[slot[a]].distanceToSquared(points[slot[b]]), 0);

    let best = points.map((_, i) => i);
    let bestCost = cost(best);

    for (let seed = 1; seed <= restarts; seed++) {
        const random = seededRandom(seed);
        const slot = points.map((_, i) => i);
        for (let i = count - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [slot[i], slot[j]] = [slot[j], slot[i]];
        }

        let current = cost(slot);
        let improved = true;
        while (improved) {
            improved = false;
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    [slot[i], slot[j]] = [slot[j], slot[i]];
                    const next = cost(slot);
                    if (next < current - 1e-9) {
                        current = next;
                        improved = true;
                    } else {
                        [slot[i], slot[j]] = [slot[j], slot[i]];
                    }
                }
            }
        }

        if (current < bestCost) {
            bestCost = current;
            best = slot;
        }
    }

    return best.map(i => points[i]);
}

function seededRandom(seed: number): () => number {
    return () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 2 ** 32;
    };
}

// Small per-node drift so the cluster breathes instead of sitting rigid.
export function floatOffset(phase: number, time: number, target: Vector3): Vector3 {
    return target.set(
        Math.sin(time * 0.6 + phase) * 0.12,
        Math.sin(time * 0.8 + phase * 1.7) * 0.16,
        Math.cos(time * 0.5 + phase * 0.9) * 0.12,
    );
}
