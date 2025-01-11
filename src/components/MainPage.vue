<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, reactive } from 'vue';
import NavBar from '@components/NavBar.vue';
import AboutMe from './AboutMe.vue';
import TechStack from './TechStack.vue';
import Projects from './Projects.vue';
import Contact from './Contact.vue';

const sections = ref([
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'keep-calm', label: 'Keep Calm' },
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
    if (newSection == 'keep-calm' && !typeKeepCalm.isAlreadyTyped) {
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

// Spotlight effect
window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    let spotlightSize: string = 'transparent 50px, #0c0c0c 200px)';

    window.addEventListener('mousemove', (e: MouseEvent) => updateSpotlight(e));

    function updateSpotlight(e: MouseEvent): void {
        if (spotlight) {
            spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
        }
    }
});
</script>

<template>
    <div class="spotlight"></div>
    <div class="my-container">
        <NavBar :active-section="activeSection"/>
        <h5 class="logo animate-on-hover">
            <img src="../../public/letter-j.png" alt="DevJhom Logo" class="logo-img" height="35" width="35">
            <a href="#home"> DevJhom </a>
        </h5>
        <div class="my-resume">
            Download Resume
        </div>
        <!-- HOME -->
        <div id="home">
            <section>
                <h1 class="introduction-text animate-on-hover">
                    Hello! I'm Jhom.
                </h1>
                <div :class="{typewriter: isTyping}" class="introduction-text animate-on-hover">
                    <h2>I'm a Software Developer.</h2>
                </div>
                <Transition name="fade">
                    <small v-if="hideScrollToExplore" class="scroll-to-explore animate-on-hover">
                        <a href="#about-me"> Scroll to Explore </a>
                    </small>
                </Transition>
                <div class="cursor-area-1"></div>
                <div class="cursor-area-2"></div>
            </section>
        </div>
        <!-- ABOUT ME -->
        <div id="about-me">
            <section>
                <AboutMe/>
            </section>
        </div>
        <!-- TECH STACK -->
        <div id="keep-calm">
            <div v-if="typeKeepCalm.isTyping || typeKeepCalm.isAlreadyTyped" :class="{typewriter: typeKeepCalm.isTyping}" class="animate-on-hover">
                <h2>Keep Calm and Code On.</h2>
            </div>
        </div>
        <div id="tech-stack">
            <section>
                <TechStack/>
            </section>
        </div>
        <!-- PROJECTS -->
        <div id="projects">
            <section>
                <Projects/>
            </section>
        </div>
        <!-- CONTACT -->
        <div id="contact">
            <section>
                <Contact/>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
.my-container {
    position: relative;
}

section {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

// HOME section
.logo {
    position: fixed;
    margin-left: 2rem;
    margin-top: 2rem;
    z-index: $top-layer;
    cursor: pointer;
}

.logo-img {
    border-radius: 10px;
}

.my-resume {
    position: fixed;
    right: 2rem;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: $black;
    border: 1px solid $blue;
    border-radius: 24px;
    z-index: $top-layer;
    cursor: pointer;
}

.my-resume:hover {
    background-color: $blue;
    color: $white;
}

.introduction-text {
    background-color: $black;
    border-radius: 6px;
    padding: 0 1rem;
}

.scroll-to-explore {
    position: absolute;
    bottom: 5%;
    right: 5%;
    z-index: $top-layer;
    cursor: pointer;
}

.scroll-to-explore a:hover {
    color: $blue;
}

//Spotlight Effect
#home {
    background: url('./../images/sourcecodes.png') no-repeat center;
    background-size: contain;
    height: 100vh;
    z-index: $bottom-layer;
    cursor: none;
}

#contact {
    background: url('./../images/world.svg') no-repeat center;
    z-index: $bottom-layer;
}

#home section {
    z-index: $middle-layer;
}

.spotlight {
    z-index: $bottom-layer;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: radial-gradient(
        circle at 15% 5%,
        transparent 50px,
        #0c0c0c 200px
    );
}

.cursor-area-1 {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 30%;
    cursor: initial;
}

.cursor-area-2 {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 20%;
    width: 70%;
    cursor: initial;
}

// Typing animation
.typewriter h2 {
    overflow: hidden;
    border-right: .15em solid $blue;
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
    50% { border-color: $blue; }
    to { border-color: transparent }
}

#keep-calm {
    min-height: 150vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
