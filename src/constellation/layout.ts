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

// Small per-node drift so the cluster breathes instead of sitting rigid.
export function floatOffset(phase: number, time: number, target: Vector3): Vector3 {
    return target.set(
        Math.sin(time * 0.6 + phase) * 0.12,
        Math.sin(time * 0.8 + phase * 1.7) * 0.16,
        Math.cos(time * 0.5 + phase * 0.9) * 0.12,
    );
}
