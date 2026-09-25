<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useIsMobile } from '@/helpers/helpers';
import { sourceLines, type Kind, type Token } from '@components/sourceCode';

const isMobile = useIsMobile();
const backdrop = ref<HTMLElement | null>(null);

const KIND_CLASS: Record<Kind, string> = {
    tag: 'text-vs-dark-blue',
    attr: 'text-vs-blue',
    str: 'text-vs-orange',
    cmt: 'text-vs-comment',
    punc: 'text-vs-gray',
};

const kindClass = (kind?: Kind) => kind ? KIND_CLASS[kind] : '';
const lineLength = (line: Token[]) => line.reduce((total, [text]) => total + text.length, 0);
const maxChars = Math.max(...sourceLines.map(lineLength));

// Mimics the old background-attachment: fixed — the block stays pinned to the viewport
// while its bottom edge wipes upward as #home scrolls away. overflow cannot clip a fixed
// element, so the clip lives on the element itself.
let frame = 0;

function updateWipe(): void {
    frame = 0;
    backdrop.value?.style.setProperty('--wipe', `${window.scrollY}px`);
}

function onScroll(): void {
    if (!frame) frame = requestAnimationFrame(updateWipe);
}

onMounted(() => {
    updateWipe();
    window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
    if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
    <div v-if="!isMobile" ref="backdrop" class="code-backdrop" aria-hidden="true">
        <div class="code-block" :style="{ '--max-chars': maxChars }">
            <div
                v-for="(line, i) in sourceLines"
                :key="i"
                class="code-line"
                :style="{ '--line': i, '--chars': lineLength(line) }"
            >
                <span v-for="([text, kind], j) in line" :key="j" :class="kindClass(kind)">{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
// No z-index: the backdrop must paint below .spotlight ($bottom-layer) so the cursor
// still reveals it, and below #home section ($middle-layer) so the hero text stays lit.
.code-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5vw;
    color: #D4D4D4;
    // Stands in for background-size: contain — the vh term keeps all 49 lines on screen,
    // the vw term keeps the longest line inside narrow windows.
    font-size: min(1.15vw, 1.5vh);
    line-height: 1.25;
    pointer-events: none;
    user-select: none;
    clip-path: inset(0 0 var(--wipe, 0px) 0);
}

// Explicit width so centring does not drift while the lines animate from zero width.
.code-block {
    width: calc(var(--max-chars) * 1ch);
}

.code-line {
    width: 0;
    overflow: hidden;
    white-space: pre;
    border-right: 0.12em solid transparent;
    animation: type-line 0.4s linear forwards, show-caret 0.4s step-end forwards;
    animation-delay: calc(1000ms + var(--line) * 35ms);
}

// 1000ms above clears the Loading splash, which covers the viewport at $loading-layer
// for exactly that long — without it the whole reveal plays behind an opaque overlay.

.code-line:last-child {
    animation: type-line 0.4s linear forwards, blink-caret 0.6s step-end infinite;
    animation-delay: calc(1000ms + var(--line) * 35ms);
}

// width: 0 -> 100% would resolve the percentage against the parent, so every line would
// wipe to the container edge instead of its own length. Monospace makes ch exact.
@keyframes type-line {
    to { width: calc(var(--chars) * 1ch); }
}

@keyframes show-caret {
    from { border-right-color: $blue; }
    to { border-right-color: transparent; }
}

@media (prefers-reduced-motion: reduce) {
    .code-line, .code-line:last-child {
        animation: none;
        width: max-content;
        border-right-color: transparent;
    }
}
</style>
