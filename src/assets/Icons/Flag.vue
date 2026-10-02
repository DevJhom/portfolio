<script setup lang="ts">
import { useId } from 'vue';
import type { Locale } from '@/i18n';

// Inline SVG, not emoji: Windows renders flag emoji as plain letters ("TH").
// slice keeps every flag the same box size, whatever its real proportions.
withDefaults(defineProps<{
    code: Locale
    width?: number
    height?: number
}>(), {
    width: 21,
    height: 14,
});

// The Union Jack needs clip paths; ids must be unique when two flags render at once.
const id = useId();
</script>

<template>
    <svg v-if="code == 'en'" :width="width" :height="height" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <clipPath :id="`${id}-s`"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath :id="`${id}-t`"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
        <g :clip-path="`url(#${id}-s)`">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" :clip-path="`url(#${id}-t)`" stroke="#C8102E" stroke-width="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
        </g>
    </svg>
    <svg v-else-if="code == 'th'" :width="width" :height="height" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="9" height="6" fill="#A51931"/>
        <rect y="1" width="9" height="4" fill="#F4F5F8"/>
        <rect y="2" width="9" height="2" fill="#2D2A4A"/>
    </svg>
    <svg v-else :width="width" :height="height" viewBox="0 0 18 12" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="18" height="4" fill="#FECB00"/>
        <rect y="4" width="18" height="4" fill="#34B233"/>
        <rect y="8" width="18" height="4" fill="#EA2839"/>
        <polygon fill="#fff" points="9,1.8 10.06,5.12 13.57,5.12 10.73,7.19 11.82,10.53 9,8.47 6.18,10.53 7.27,7.19 4.43,5.12 7.94,5.12"/>
    </svg>
</template>
