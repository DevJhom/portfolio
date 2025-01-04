<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar from '@components/NavBar.vue';

const isTyping = ref(false);

setTimeout(() => {
    isTyping.value = true;
}, 1000)

setTimeout(() => {
    isTyping.value = false;
}, 3000)

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
        <div class="logo animate-on-hover">
            DevJhom
        </div>
        <div id="home">
            <section>
                <h1 class="animate-on-hover">
                    Hello! I'm Jhom.
                </h1>
                <div :class="{typewriter: isTyping}" class="animate-on-hover">
                    <h2>I'm a Software Developer.</h2>
                </div>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.my-container {
    position: relative;
}

.animate-on-hover {
    transition: transform 0.3s ease;
}

.animate-on-hover:hover {
    color: blue;
    transform: scale(1.1);
}

.logo {
    position: fixed;
    margin-left: 2rem;
    margin-top: 2rem;
    cursor: pointer;
}

.keep-calm {
    height: 50vh;
}

// Typing animation
.typewriter h2 {
    overflow: hidden;
    border-right: .15em solid blue;
    white-space: nowrap;
    margin: 0 auto;
    animation: 
        typing 2s steps(20, end),
        blink-caret .5s step-end infinite;
}

@keyframes typing {
    from { width: 0 }
    to { width: 100% }
}

@keyframes blink-caret {
    from { border-color: transparent }
    50% { border-color: blue; }
    to { border-color: transparent }
}

</style>
