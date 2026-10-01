import { AdditiveBlending, Color, Group, Sprite, SpriteMaterial, Texture, Vector3 } from 'three';
import { logos } from './logos';
import type { Tech } from './techs';
import { fibonacciSphere } from './layout';
import { createLogoTexture } from './textures';

export const CLUSTER_RADIUS = 4;

const LOGO_SCALE = 0.9;
const GLOW_SCALE = 2.1;

export interface TechNode {
    tech: Tech;
    group: Group;
    logo: Sprite;
    glow: Sprite;
    // Resting position on the sphere; the render loop adds the float offset on top.
    home: Vector3;
    phase: number;
    brand: Color;
    // 0 = dimmed, 0.6 = neutral, 1 = highlighted. `level` eases toward `target` each frame.
    level: number;
    target: number;
    hover: number;
}

export async function createNodes(techs: Tech[], glowTexture: Texture): Promise<TechNode[]> {
    const positions = fibonacciSphere(techs.length, CLUSTER_RADIUS);
    const textures = await Promise.all(techs.map(tech => createLogoTexture(logos[tech.id], tech.color)));

    return techs.map((tech, i) => {
        const brand = new Color(tech.color);

        const logo = new Sprite(new SpriteMaterial({ map: textures[i], transparent: true, depthWrite: false }));
        logo.scale.setScalar(LOGO_SCALE);
        logo.renderOrder = 2;
        logo.userData.techId = tech.id;

        const glow = new Sprite(new SpriteMaterial({
            map: glowTexture,
            color: brand.clone(),
            blending: AdditiveBlending,
            transparent: true,
            depthWrite: false,
        }));
        glow.scale.setScalar(GLOW_SCALE);
        glow.renderOrder = 1;

        const group = new Group();
        group.position.copy(positions[i]);
        group.add(glow, logo);

        return {
            tech,
            group,
            logo,
            glow,
            home: positions[i].clone(),
            phase: i * 1.37,
            brand,
            level: 0.6,
            target: 0.6,
            hover: 0,
        };
    });
}

// Maps a node's eased state onto its sprites. Called every frame.
export function applyNodeState(node: TechNode): void {
    const { level, hover } = node;
    const logoMaterial = node.logo.material;
    const glowMaterial = node.glow.material;

    // Logos stay below the bloom threshold; only the additive glow is pushed over it.
    const brightness = 0.25 + level * 0.65 + hover * 0.1;
    logoMaterial.color.setScalar(brightness);
    logoMaterial.opacity = 0.35 + level * 0.65;

    const glowStrength = Math.max(0, level - 0.5) * 2 + hover * 0.6;
    glowMaterial.color.copy(node.brand).multiplyScalar(0.3 + glowStrength * 0.9);
    glowMaterial.opacity = 0.12 + glowStrength * 0.45;

    const scale = 1 + (level - 0.6) * 0.35 + hover * 0.35;
    node.logo.scale.setScalar(LOGO_SCALE * scale);
    node.glow.scale.setScalar(GLOW_SCALE * (0.75 + glowStrength * 0.2 + hover * 0.25));
}

export function disposeNodes(nodes: TechNode[]): void {
    for (const node of nodes) {
        node.logo.material.map?.dispose();
        node.logo.material.dispose();
        node.glow.material.dispose();
    }
}
