<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Stars fly from z = 1 (far) to z = 0 (the viewer). Speeds are z units per second.
const CRUISE_SPEED = 0.08; // drift with the page at rest
const MAX_BOOST = 1.6; // extra speed at full warp
const SCROLL_BOOST = 0.002; // boost added per pixel scrolled
const BOOST_DECAY = 0.15; // fraction of the boost left after one second
const STREAK = 0.06; // seconds of travel each streak trails behind its star
const MAX_STAR_SIZE = 2.5; // px, for a star right in front of the viewer
const PX_PER_STAR = 3000; // canvas area per star, so phones get fewer
const MIN_STARS = 150;
const MAX_STARS = 450;

type Star = { x: number, y: number, z: number };

const canvas = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let stars: Star[] = [];
let boost = 0;
let lastScrollY = 0;
let lastFrame = 0;
let frameId = 0;
let resizeObserver: ResizeObserver | null = null;
let visibilityObserver: IntersectionObserver | null = null;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const randomStar = (z = Math.random()): Star => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.max(z, 0.05),
});

const resize = () => {
    if (!canvas.value || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    width = canvas.value.clientWidth;
    height = canvas.value.clientHeight;
    canvas.value.width = Math.round(width * dpr);
    canvas.value.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(MAX_STARS, Math.max(MIN_STARS, Math.round(width * height / PX_PER_STAR)));
    while (stars.length < count) stars.push(randomStar());
    stars.length = count;

    if (reducedMotion) draw(0);
}

// Moves every star by dt seconds and paints the frame. dt = 0 just repaints.
const draw = (dt: number) => {
    if (!ctx) return;

    const speed = CRUISE_SPEED + boost;
    const cx = width / 2;
    const cy = height / 2;
    // At z = 1 the [-1, 1] star field spans the canvas's longer side, so it always covers it.
    const focal = Math.max(width, height) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';

    stars.forEach((star, i) => {
        star.z -= speed * dt;

        let sx = cx + star.x / star.z * focal;
        let sy = cy + star.y / star.z * focal;

        if (star.z <= 0.01 || sx < 0 || sx > width || sy < 0 || sy > height) {
            star = stars[i] = randomStar(1);
            sx = cx + star.x * focal;
            sy = cy + star.y * focal;
        }

        const tailZ = star.z + speed * STREAK;
        const tx = cx + star.x / tailZ * focal;
        const ty = cy + star.y / tailZ * focal;
        const nearness = 1 - star.z;
        const size = Math.max(nearness * MAX_STAR_SIZE, 0.5);

        ctx!.globalAlpha = Math.max(nearness, 0.15);

        // Canvas drops zero-length lines, so a star that has barely moved is drawn as a dot
        if (Math.hypot(sx - tx, sy - ty) < size) {
            ctx!.beginPath();
            ctx!.arc(sx, sy, size / 2, 0, Math.PI * 2);
            ctx!.fillStyle = '#ffffff';
            ctx!.fill();
        } else {
            ctx!.beginPath();
            ctx!.moveTo(tx, ty);
            ctx!.lineTo(sx, sy);
            ctx!.lineWidth = size;
            ctx!.strokeStyle = '#ffffff';
            ctx!.stroke();
        }
    });

    ctx.globalAlpha = 1;
}

const tick = (now: number) => {
    // Capped so a frame after a long pause (tab hidden) doesn't teleport the stars
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    boost *= Math.pow(BOOST_DECAY, dt);
    draw(dt);
    frameId = requestAnimationFrame(tick);
}

const start = () => {
    if (frameId) return;
    lastFrame = performance.now();
    lastScrollY = window.scrollY;
    frameId = requestAnimationFrame(tick);
}

const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
}

const handleScroll = () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    if (frameId) boost = Math.min(boost + delta * SCROLL_BOOST, MAX_BOOST);
}

onMounted(() => {
    if (!canvas.value) return;
    ctx = canvas.value.getContext('2d');

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.value);

    if (reducedMotion) return;

    // Only animate while the section is on screen
    visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
    });
    visibilityObserver.observe(canvas.value);

    window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
    stop();
    resizeObserver?.disconnect();
    visibilityObserver?.disconnect();
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <canvas ref="canvas" class="warp-starfield" aria-hidden="true"></canvas>
</template>

<style scoped lang="scss">
.warp-starfield {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: $bottom-layer;
}
</style>
