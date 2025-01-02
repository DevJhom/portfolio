<script setup lang="ts">
import { ref } from 'vue';

const activeSection = ref('home');

const setActive = (sectionId: string) => {
    activeSection.value = sectionId;
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
                <a href="#about-me" class="nav-link" :class="{ active: activeSection == 'about-me' }"
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
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
}
</style>
