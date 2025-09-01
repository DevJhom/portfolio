<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import NavBar from '@components/NavBar.vue';
import AboutMe from '@components/AboutMe.vue';
import TechStack from '@components/TechStack.vue';
import Projects from '@components/Projects.vue';
import Contact from '@components/Contact.vue';
import KeepCalm from '@components/KeepCalm.vue';

import DownArrow from '@/assets/Icons/DownArrow.vue';
import Download from '@/assets/Icons/Download.vue';

const sections = ref([
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'keep-calm', label: 'Keep Calm' },
    { id: 'keep-calm-1', label: 'Keep Calm 1' },
    { id: 'keep-calm-2', label: 'Keep Calm 2' },
    { id: 'keep-calm-3', label: 'Keep Calm 3' },
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

// Spotlight effect
window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    let spotlightSize: string = 'transparent 50px, #0c0c0cE5 120px)';

    window.addEventListener('mousemove', (e: MouseEvent) => updateSpotlight(e));

    function updateSpotlight(e: MouseEvent): void {
        if (spotlight) {
            spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
        }
    }
});

const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "./Resume_Sai_Swan_Wan.pdf"; 
    link.download = "Resume_Sai_Swan_Wan.pdf";
    link.click();
}

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
    <div class="spotlight"></div>
    <div class="my-container">
        <NavBar :active-section="activeSection"/>
        <div class="logo animate-on-hover">
            <img src="/letter-j.png" alt="DevJhom Logo" class="logo-img" height="35" width="35">
            <h4 class="ms-1"><a href="#home">DevJhom</a></h4>
        </div>
        <div class="my-resume" @click="downloadResume()">
            <Download/>
            Download Resume
        </div>
        <!-- HOME -->
        <div id="home">
            <section>
                <h1 class="introduction-text">
                    Hello, I'm Jhom
                </h1>
                <div :class="{typewriter: isTyping}" class="introduction-text">
                    <h2>I'm a <span class="text-animation">Software Developer</span></h2>
                </div>
                <Transition name="fade">
                    <small v-if="hideScrollToExplore" class="scroll-to-explore animate-on-hover">
                        <a href="#about-me"> Scroll to Explore <DownArrow/></a>
                    </small>
                </Transition>
                <div class="cursor-area-1"></div>
                <div class="cursor-area-2"></div>
            </section>
        </div>
        <!-- ABOUT ME -->
        <div id="about-me">
            <section>
                <AboutMe :active-section="activeSection"/>
            </section>
        </div>
        <!-- KEEP CALM -->
        <div id="keep-calm">
            <section>
                <KeepCalm :active-section="activeSection"/>
            </section>
        </div>
        <!-- TECH STACK -->
        <div id="tech-stack">
            <section>
                <TechStack :active-section="activeSection"/>
            </section>
        </div>
        <!-- PROJECTS -->
        <div id="projects">
            <section>
                <Projects :active-section="activeSection"/>
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
    min-height: 100vh;
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
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logo-img {
    border-radius: 10px;
}

.logo h4 {
    margin: 0;
}

.my-resume {
    position: fixed;
    right: 2rem;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border: 1px solid $blue;
    border-radius: 24px;
    z-index: $top-layer;
	background-size: 300% 100%;
	background-image: linear-gradient(to right, hsl(217, 100%, 62%), hsl(260, 100%, 62%), $blue);
	box-shadow: 0 1px 15px 0 $blue;
	-moz-transition: all .5s ease-in-out;
	-o-transition: all .5s ease-in-out;
	-webkit-transition: all .5s ease-in-out;
	transition: all .5s ease-in-out;
    cursor: pointer;
}

.my-resume:hover {
    color: $white;
    background-position: 100% 0;
}

.introduction-text {
    padding: 0 2rem;
    transition: transform 0.3s ease;
}

.introduction-text, .introduction-text h2 {
    font-weight: bold;
}

.introduction-text:hover {
    transform: scale(1.1);
}

.text-animation {
    font-size: clamp(1.25rem, 2vw + 0.5rem, 2rem);
    background: linear-gradient(to right, $light-gray 0, white 10%, $light-gray 20%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    animation-fill-mode: forwards;
    animation: background-gradient 4s infinite linear;
}

@keyframes background-gradient {
    0% { background-position: 0; }
    100% { background-position: -200%; }
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
    background: url('/sourcecodes.png') no-repeat center;
    background-size: contain;
    height: 100vh;
    z-index: $bottom-layer;
    background-attachment: fixed;
    cursor: crosshair;
}

#contact {
    background: url('/world.svg') no-repeat center;
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
        #0c0c0c 120px
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

#keep-calm {
    min-height: 300vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    position: relative;
}
</style>
