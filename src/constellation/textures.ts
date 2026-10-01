import { CanvasTexture, SRGBColorSpace } from 'three';

const LOGO_SIZE = 256;

// Draws a logo onto a dark disc with a thin brand-colour ring, so dark logos (Linux, SQL)
// stay readable over the background and links can pass behind without clutter.
export async function createLogoTexture(svg: string, color: string): Promise<CanvasTexture> {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = LOGO_SIZE;
    const ctx = canvas.getContext('2d')!;
    const center = LOGO_SIZE / 2;

    ctx.beginPath();
    ctx.arc(center, center, center - 6, 0, Math.PI * 2);
    ctx.fillStyle = '#191a1b';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();

    const image = await loadSvg(svg);
    const inset = LOGO_SIZE * 0.24;
    ctx.drawImage(image, inset, inset, LOGO_SIZE - inset * 2, LOGO_SIZE - inset * 2);

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
}

function loadSvg(svg: string): Promise<HTMLImageElement> {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const image = new Image();

    return new Promise((resolve, reject) => {
        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not rasterize logo SVG'));
        };
        image.src = url;
    });
}

// Soft white radial falloff; tinted per sprite through material.color.
export function createGlowTexture(size = 128): CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.08)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return new CanvasTexture(canvas);
}
