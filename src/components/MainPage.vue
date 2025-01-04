<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, reactive } from 'vue';
import NavBar from '@components/NavBar.vue';

const sections = ref([
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]);

const activeSection = ref('home');
const hideScrollToExplore = computed(() => activeSection.value == 'home');

// Typing "I'm a Software Developer."
const isTyping = ref(false);

setTimeout(() => {
    isTyping.value = true;
}, 1000)

setTimeout(() => {
    isTyping.value = false;
}, 3000)

// Typing "Keep Calm and Code On."
const typeKeepCalm = reactive({
    isTyping: false,
    isAlreadyTyped: false
});

watch(activeSection, (newSection) => {
    if (newSection == 'projects' && !typeKeepCalm.isAlreadyTyped) {
        typeKeepCalm.isTyping = true;
        setTimeout(() => {
            typeKeepCalm.isTyping = false;
            typeKeepCalm.isAlreadyTyped = true;
        }, 2000)
    }
});

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
        <h5 class="logo animate-on-hover">
            <a href="#home"> DevJhom </a>
        </h5>
        <!-- HOME -->
        <div id="home">
            <section>
                <h1 class="animate-on-hover">
                    Hello! I'm Jhom.
                </h1>
                <div :class="{typewriter: isTyping}" class="animate-on-hover">
                    <h2>I'm a Software Developer.</h2>
                </div>
                <Transition name="fade">
                    <small v-if="hideScrollToExplore" class="scroll-to-explore animate-on-hover">
                        <a href="#about-me"> Scroll to Explore </a>
                    </small>
                </Transition>
            </section>
        </div>
        <!-- ABOUT ME -->
        <div id="about-me">
            <section>
                <div class="grid-container">
                    <div class="grid-item my-location">
                        <span>
                            I'm Yangon, Myanmar (Burma)
                        </span>
                        <span>
                            Based in Bangkok, Thailand
                        </span>
                    </div>
                    <div class="grid-item">
                    </div>
                    <div class="grid-item">
                        I have 3 years of hands-on experience in web application development.
                    </div>
                    <div class="grid-item">
                    </div>
                    <div class="grid-item">
                        I'm a software developer passionate about coding and problem-solving. I approach each project with a creative mindset, a strong dedication and an emphasis on writing clean and maintainable codes.
                    </div>
                    <div class="grid-item">
                    </div>
                </div>
            </section>
        </div>
        <!-- TECH STACK -->
        <div id="tech-stack">
            <section>
                Tech Stack
            </section>
        </div>
        <!-- PROJECTS -->
        <div id="projects">
            <section>
                <div class="keep-calm">
                    <div v-if="typeKeepCalm.isTyping || typeKeepCalm.isAlreadyTyped" :class="{typewriter: typeKeepCalm.isTyping}" class="animate-on-hover">
                        <h2>Keep Calm and Code On.</h2>
                    </div>
                </div>
                Projects
            </section>
        </div>
        <!-- CONTACT -->
        <div id="contact">
            <section>
                Contact
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
section {
    position: relative;
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
    z-index: 99;
    cursor: pointer;
}

.scroll-to-explore {
    position: absolute;
    bottom: 5%;
    left: 2rem;
    cursor: pointer;
}

.keep-calm {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.my-location {
    display: flex;
    flex-direction: column;
}

// Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Typing animation
.typewriter h2 {
    overflow: hidden;
    border-right: .15em solid blue;
    white-space: nowrap;
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

// About Me 
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto;
    gap: 2rem;
    width: 75%;
    height: 100%;
}

.grid-item {
    border: 1px solid gray;
    border-radius: 12px;
    padding: 2rem;
    transition: transform 0.3s ease;
}

.grid-item:hover {
    border: 1px solid blue;
    transform: scale(1.04);
}

.grid-item:nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
}

.grid-item:nth-child(2) {
    grid-column: 2 / span 2;
    grid-row: 1 / span 1;
}

.grid-item:nth-child(3) {
    grid-column: 4 / span 1;
    grid-row: 1 / span 1;
}

.grid-item:nth-child(4) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
}

.grid-item:nth-child(5) {
    grid-column: 3 / span 2;
    grid-row: 2 / span 2;
}

.grid-item:nth-child(6) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
    .grid-item {
        grid-column: 1 / span 1 !important;
        grid-row: auto !important;
    }
}

</style>
