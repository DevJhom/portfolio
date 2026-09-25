<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/i18n';

const { t } = useTranslation();

const props = defineProps({
  activeSection: String
});

const activeSection = computed(() => props.activeSection);

const setActive = (sectionId: string) => {
    // activeSection.value = sectionId;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
};
</script>

<template>
    <div class="nav-bar">
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a href="#home" class="nav-link" :class="{ active: activeSection == 'home' }"
                    @click.prevent="setActive('home')">{{ t('nav.home') }}</a>
            </li>
            <li class="nav-item">
                <a href="#about-me" class="nav-link" :class="{ active: activeSection == 'about-me' || activeSection?.includes('keep-calm') }"
                    @click.prevent="setActive('about-me')">{{ t('nav.aboutMe') }}</a>
            </li>
            <li class="nav-item">
                <a href="#tech-stack" class="nav-link" :class="{ active: activeSection == 'tech-stack' }"
                    @click.prevent="setActive('tech-stack')">{{ t('nav.techStack') }}</a>
            </li>
            <li class="nav-item">
                <a href="#projects" class="nav-link" :class="{ active: activeSection == 'projects' }"
                    @click.prevent="setActive('projects')">{{ t('nav.projects') }}</a>
            </li>
            <li class="nav-item">
                <a href="#contact" class="nav-link" :class="{ active: activeSection == 'contact' }"
                    @click.prevent="setActive('contact')">{{ t('nav.contact') }}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.nav-bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: $top-layer;
    background-color: $black;
    transform: translateX(-50%);
    border-radius: $radius-sm $radius-sm 0 0;
    // left: 50% caps a shrink-to-fit fixed box at half the viewport, which made the longer
    // Burmese labels wrap onto a second line; size to the content instead.
    width: max-content;
}

.nav {
    flex-wrap: nowrap;
}

.nav-item a {
    white-space: nowrap;
    font-weight: bold;
    color: $light-gray;
    border-radius: $radius-sm $radius-sm 0 0;
}

.nav-item a:hover {
    color: $white;
}

.nav-item a.active {
    background-color: $gray;
    border-radius: $radius-sm $radius-sm 0 0;
}

.nav-item a.active:hover {
    color: $black;
}

@media (max-width: 768px) { 
  .nav-bar {
    display: none; 
  }
}
</style>
