<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar from '@components/NavBar.vue';

const sections = ref([
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]);
const activeSection = ref('home');
let observer: IntersectionObserver;

onMounted(() => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id;
            }
        });
    }, options);

    sections.value.forEach(section => {
        const element = document.getElementById(section.id);
        if(element) observer.observe(element);
    });
});

onUnmounted(() => {
    if (observer) {
        sections.value.forEach(section => {
            const element = document.getElementById(section.id);
            if(element) observer.unobserve(element);
        });
    }
})
</script>

<template>
    <div class="my-container">
        <NavBar :active-section="activeSection"/>
        <div id="home">
            <section>
                Hello! I'm Jhom.
                <br>
                I'm a software developer. (typing animation)
            </section>
        </div>
        <div id="about-me">
            <section>
                About Me
            </section>
        </div>
        <div id="tech-stack">
            <section>
                Tech Stack
            </section>
        </div>
        <div class="keep-calm">
            Keep Calm and Code On.
        </div>
        <div id="projects">
            <section>
                Projects
            </section>
        </div>
        <div id="contact">
            <section>
                Contact
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
section {
    border: 1px solid blue;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.my-container {
    position: relative;
}

.keep-calm {
    height: 50vh;
}
</style>
