<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useIsMobile } from '@/helpers/helpers';
import { sourceLines, type Kind, type Token } from '@components/sourceCode';

const isMobile = useIsMobile();

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

// The backdrop is pointer-events: none and sits under the spotlight, so its lines never
// get :hover — the row under the cursor is worked out from the mouse position instead.
const codeBlock = ref<HTMLElement | null>(null);
const activeLine = ref<number | null>(null);

function updateActiveLine(e: MouseEvent): void {
    if (!codeBlock.value) return;

    // MainPage's .cursor-area-1 is the strip on the right where the crosshair is switched
    // off; no highlight there either.
    const area = document.querySelector('.cursor-area-1')?.getBoundingClientRect();
    if (area && e.clientX >= area.left && e.clientX <= area.right && e.clientY >= area.top && e.clientY <= area.bottom) {
        activeLine.value = null;
        return;
    }

    const rect = codeBlock.value.getBoundingClientRect();
    const line = Math.floor((e.clientY - rect.top) / (rect.height / sourceLines.length));
    activeLine.value = line >= 0 && line < sourceLines.length ? line : null;
}

onMounted(() => {
    window.addEventListener('mousemove', updateActiveLine);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', updateActiveLine);
});
</script>

<template>
    <div v-if="!isMobile" class="code-backdrop-clip" aria-hidden="true">
        <div class="code-backdrop" :style="{ '--max-chars': maxChars }">
            <div ref="codeBlock" class="code-block">
                <div v-if="activeLine !== null" class="line-highlight" :style="{ '--active': activeLine }"></div>
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
    </div>
</template>

<style scoped lang="scss">
$line-height: 1.25;

// No z-index: the backdrop must paint below .spotlight ($bottom-layer) so the cursor
// still reveals it, and below #home section ($middle-layer) so the hero text stays lit.
// Unlike overflow, clip-path also clips the fixed .code-backdrop inside it.
.code-backdrop-clip {
    position: absolute;
    inset: 0;
    clip-path: inset(0);
    pointer-events: none;
}

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
    line-height: $line-height;
    user-select: none;
}

// Explicit width so centring does not drift while the lines animate from zero width.
.code-block {
    position: relative;
    width: calc(var(--max-chars) * 1ch);
}

// VS Code's current-line band: full editor width, background only, no transition.
// left cancels .code-backdrop's padding. The negative z-index keeps it under the text and
// stays inside .code-backdrop, which is its own stacking context (position: fixed).
.line-highlight {
    position: absolute;
    top: calc(var(--active) * #{$line-height} * 1em);
    left: -5vw;
    width: 100vw;
    height: #{$line-height}em;
    z-index: -1;
    background-color: rgba(255, 255, 255, 0.05);
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
