<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { LOCALES, setLocale, useTranslation, type Locale } from '@/i18n';
import Flag from '@/assets/Icons/Flag.vue';

const { t, locale } = useTranslation();

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);

const activeLabel = computed(() => LOCALES.find(({ code }) => code == locale.value)?.label);

const toggle = () => {
    isOpen.value = !isOpen.value;
}

const choose = (code: Locale) => {
    setLocale(code);
    isOpen.value = false;
    trigger.value?.focus();
}

// Close on a click anywhere else, or when keyboard focus leaves the switcher.
function onPointerDown(e: PointerEvent): void {
    if (isOpen.value && !root.value?.contains(e.target as Node)) isOpen.value = false;
}

function onFocusOut(e: FocusEvent): void {
    if (!root.value?.contains(e.relatedTarget as Node | null)) isOpen.value = false;
}

async function onEscape(): Promise<void> {
    if (!isOpen.value) return;
    isOpen.value = false;
    await nextTick();
    trigger.value?.focus();
}

onMounted(() => {
    document.addEventListener('pointerdown', onPointerDown);
});

onUnmounted(() => {
    document.removeEventListener('pointerdown', onPointerDown);
});
</script>

<template>
    <div ref="root" class="language-switcher" @focusout="onFocusOut" @keydown.esc="onEscape">
        <button
            ref="trigger"
            type="button"
            class="language-trigger"
            :aria-label="`${t('header.language')}: ${activeLabel}`"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            @click="toggle"
        >
            <Flag :code="locale"/>
            <svg class="language-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <Transition name="fade">
            <ul v-if="isOpen" class="language-menu" role="group" :aria-label="t('header.language')">
                <li v-for="{ code, label } in LOCALES" :key="code">
                    <!-- lang per button so each label gets the right font and pronunciation whatever the page language is -->
                    <button
                        type="button"
                        class="language-option"
                        :class="{ active: locale == code }"
                        :lang="code"
                        :aria-pressed="locale == code"
                        @click="choose(code)"
                    >
                        <Flag :code="code"/>
                        <span>{{ label }}</span>
                    </button>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.language-switcher {
    position: relative;
}

// Glass pill, same style as the .logo card in MainPage.vue
.language-trigger, .language-menu {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.language-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.5rem 0.7rem;
    border-radius: $radius-md; // same as the .logo card in MainPage.vue
    color: $light-gray;
    cursor: pointer;
    transition: background-color $transition-fast, border-color $transition-fast;
}

.language-trigger:hover,
.language-trigger[aria-expanded="true"] {
    background-color: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.25);
    color: $white;
}

.language-chevron {
    transition: transform $transition-fast;
}

.language-trigger[aria-expanded="true"] .language-chevron {
    transform: rotate(180deg);
}

.language-trigger :deep(svg:not(.language-chevron)),
.language-option :deep(svg) {
    flex-shrink: 0;
    border-radius: 2px;
}

.language-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin: 0;
    padding: 0.3rem;
    list-style: none;
    border-radius: $radius-md;
    // The glass background is mostly see-through; this keeps the labels readable over the page.
    background-color: rgba(25, 26, 27, 0.9);
}

.language-option {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.3rem 0.7rem;
    border: 0;
    border-radius: $radius-sm;
    background-color: transparent;
    color: $light-gray;
    font-size: 0.8rem;
    // Fixed so every row is the same height whichever script it is in.
    line-height: 1.7;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;
}

.language-option:hover {
    color: $white;
    background-color: rgba(255, 255, 255, 0.08);
}

.language-option.active {
    background-color: $blue;
    color: $white;
}

.language-option:focus-visible {
    outline: 2px solid $white;
    outline-offset: 1px;
}
</style>
