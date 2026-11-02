<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useTranslation, type MessageKey } from '@/i18n';
import Download from '@/assets/Icons/Download.vue';

const { t } = useTranslation();

// Files live in public/ and are served from the site root.
const DOCUMENTS: { file: string; label: MessageKey }[] = [
    { file: 'Resume_Sai_Swan_Wan.pdf', label: 'header.resume' },
    { file: 'CV_Sai_Swan_Wan.pdf', label: 'header.cv' },
];

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);

const toggle = () => {
    isOpen.value = !isOpen.value;
}

const close = () => {
    isOpen.value = false;
}

// Close on a click anywhere else, or when keyboard focus leaves the menu.
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
    <div ref="root" class="resume-menu" @focusout="onFocusOut" @keydown.esc="onEscape">
        <button
            ref="trigger"
            type="button"
            class="my-resume"
            :aria-label="t('header.download')"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            @click="toggle"
        >
            <Download/>
            <h4>{{ t('header.resume') }}</h4>
            <svg class="resume-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <Transition name="fade">
            <ul v-if="isOpen" class="resume-options" role="group" :aria-label="t('header.download')">
                <li v-for="{ file, label } in DOCUMENTS" :key="file">
                    <a class="resume-option" :href="`/${file}`" :download="file" @click="close">
                        <span>{{ t(label) }}</span>
                        <span class="resume-option-type">PDF</span>
                    </a>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.resume-menu {
    position: relative;
}

.my-resume {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.9rem 0.5rem 1rem;
    gap: 0.5rem;
    border: 1px solid $blue;
    border-radius: calc($radius-md * 2);
    background-size: 300% 100%;
    background-image: linear-gradient(to right, hsl(217, 100%, 62%), hsl(260, 100%, 62%), $blue);
    box-shadow: 0 1px 15px 0 $blue;
    color: $white;
    transition: all $transition-medium;
    cursor: pointer;
}

.my-resume h4 {
    margin: 0;
    font-size: clamp(0.75rem, 0.4vw + 0.55rem, 0.9rem);
    white-space: nowrap;
}

.my-resume:hover,
.my-resume[aria-expanded="true"] {
    background-position: 100% 0;
}

.my-resume:focus-visible {
    outline: 2px solid $white;
    outline-offset: 2px;
}

.resume-chevron {
    flex-shrink: 0;
    transition: transform $transition-fast;
}

.my-resume[aria-expanded="true"] .resume-chevron {
    transform: rotate(180deg);
}

// Same dark glass panel as the language menu in LanguageSwitcher.vue
.resume-options {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin: 0;
    padding: 0.3rem;
    list-style: none;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: $radius-md;
    background-color: rgba(25, 26, 27, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

// Same row style as .language-option in LanguageSwitcher.vue
.resume-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.3rem 0.7rem;
    border-radius: $radius-sm;
    color: $light-gray;
    font-size: 0.8rem;
    line-height: 1.7;
    text-decoration: none;
    white-space: nowrap;
    transition: background-color $transition-fast, color $transition-fast;
}

.resume-option-type {
    padding: 0 0.35rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: $radius-sm;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    line-height: 1.6;
    letter-spacing: 0.05em;
    transition: border-color $transition-fast;
}

.resume-option:hover {
    color: $white;
    background-color: rgba(255, 255, 255, 0.08);
}

.resume-option:hover .resume-option-type {
    border-color: $blue;
}

.resume-option:focus-visible {
    outline: 2px solid $white;
    outline-offset: 1px;
}

@media (max-width: 768px) {
    .my-resume {
        padding: 0.5rem 0.7rem 0.5rem 0.8rem;
    }
}
</style>
