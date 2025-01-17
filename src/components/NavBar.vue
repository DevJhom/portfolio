<script setup lang="ts">
import { computed } from 'vue';

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
                    @click.prevent="setActive('home')">Home</a>
            </li>
            <li class="nav-item">
                <a href="#about-me" class="nav-link" :class="{ active: activeSection == 'about-me' || activeSection == 'keep-calm' }"
                    @click.prevent="setActive('about-me')">About Me</a>
            </li>
            <li class="nav-item">
                <a href="#tech-stack" class="nav-link" :class="{ active: activeSection == 'tech-stack' }"
                    @click.prevent="setActive('tech-stack')">Tech Stack</a>
            </li>
            <li class="nav-item">
                <a href="#projects" class="nav-link" :class="{ active: activeSection == 'projects' }"
                    @click.prevent="setActive('projects')">Projects</a>
            </li>
            <li class="nav-item">
                <a href="#contact" class="nav-link" :class="{ active: activeSection == 'contact' }"
                    @click.prevent="setActive('contact')">Contact</a>
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
    border-radius: 6px 6px 0 0;
}

.nav-item a {
    font-weight: bold;
    color: $light-gray;
    border-radius: 6px 6px 0 0;
}

.nav-item a:hover {
    color: $white;
}

.nav-item a.active {
    background-color: $gray2;
    border-radius: 6px 6px 0 0;
}

.nav-item a.active:hover {
    color: $black;
}
</style>
