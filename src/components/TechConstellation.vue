<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useTranslation } from '@/i18n';
import { mount, type Constellation, type HoverInfo } from '@/constellation/constellation';
import type { JobId } from '@/constellation/jobs';

const props = defineProps<{
    activeJob: JobId | null
}>();

const { t } = useTranslation();

const container = ref<HTMLElement | null>(null);
const failed = ref(false);
const tooltip = ref<{ label: string; color: string; x: number; y: number } | null>(null);

let scene: Constellation | null = null;
let unmounted = false;

function onHover(info: HoverInfo | null): void {
    if (!info) {
        tooltip.value = null;
        return;
    }
    tooltip.value = {
        label: info.tech.label,
        color: info.tech.color,
        x: info.x,
        y: info.y + info.radius + 6,
    };
}

onMounted(async () => {
    try {
        const created = await mount(container.value!, { onHover });
        // mount() waits for the logo textures; the section may have scrolled away meanwhile.
        if (unmounted) {
            created.dispose();
            return;
        }
        scene = created;
        scene.setActiveJob(props.activeJob);
    } catch (error) {
        failed.value = true;
        console.error(error);
    }
});

onUnmounted(() => {
    unmounted = true;
    scene?.dispose();
    scene = null;
});

watch(() => props.activeJob, id => scene?.setActiveJob(id));

// TechStack.vue waits on this before swapping to the 2D grid.
function collapse(): Promise<void> {
    tooltip.value = null;
    return scene?.collapse() ?? Promise.resolve();
}

defineExpose({ collapse });
</script>

<template>
    <div class="constellation">
        <div ref="container" class="constellation-canvas"></div>
        <div
            v-if="tooltip"
            class="constellation-tooltip"
            :style="{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)` }"
        >
            <span class="tooltip-name" :style="{ color: tooltip.color }">{{ tooltip.label }}</span>
        </div>
        <!-- WebGL unavailable: TechStack.vue still offers the 2D grid through its toggle. -->
        <small v-if="failed" class="constellation-error text-light-gray">{{ t('techStack.webglUnavailable') }}</small>
    </div>
</template>

<style scoped lang="scss">
.constellation {
    position: relative;
    width: 100%;
    height: 100%;
}

// Bloom lifts the canvas background a few levels above the page's $black, which shows as a
// faint rectangle; fading the edges out blends it into the page. 71% is where the ellipse
// meets the edge midpoints.
.constellation-canvas {
    position: absolute;
    inset: 0;
    mask-image: radial-gradient(ellipse at center, #000 60%, transparent 71%);
    -webkit-mask-image: radial-gradient(ellipse at center, #000 60%, transparent 71%);
}

.constellation-canvas :deep(canvas) {
    display: block;
}

.constellation-tooltip {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.35rem 0.7rem;
    border-radius: $radius-md;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(12, 12, 12, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    pointer-events: none;
    white-space: nowrap;
    translate: -50% 0;
    z-index: $top-layer;
}

.tooltip-name {
    font-weight: bold;
}

.constellation-error {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
}
</style>
