<script setup lang="ts">
import { LOCALES, setLocale, useTranslation } from '@/i18n';

const { t, locale } = useTranslation();
</script>

<template>
    <div class="language-switcher" role="group" :aria-label="t('header.language')">
        <!-- lang per button so each label gets the right font and pronunciation whatever the page language is -->
        <button
            v-for="{ code, label } in LOCALES"
            :key="code"
            type="button"
            class="language-option"
            :class="{ active: locale == code }"
            :lang="code"
            :aria-pressed="locale == code"
            @click="setLocale(code)"
        >
            {{ label }}
        </button>
    </div>
</template>

<style scoped lang="scss">
// Glass pill, same style as the .logo card in MainPage.vue
.language-switcher {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.25rem;
    border-radius: calc($radius-md * 2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.language-option {
    padding: 0.2rem 0.7rem;
    border: 0;
    border-radius: calc($radius-md * 2);
    background-color: transparent;
    color: $light-gray;
    font-size: 0.8rem;
    // Fixed so the pill is the same height whichever script is active.
    line-height: 1.7;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color $transition-fast, color $transition-fast;
}

.language-option:hover {
    color: $white;
}

.language-option.active {
    background-color: $blue;
    color: $white;
}

.language-option:focus-visible {
    outline: 2px solid $white;
    outline-offset: 1px;
}

@media (max-width: 768px) {
    .language-option {
        padding: 0.15rem 0.45rem;
        font-size: 0.75rem;
    }
}
</style>
