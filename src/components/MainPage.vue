<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import NavBar from '@components/NavBar.vue';
import AboutMe from '@components/AboutMe.vue';
import TechStack from '@components/TechStack.vue';
import Projects from '@components/Projects.vue';
import Contact from '@components/Contact.vue';
import KeepCalm from '@components/KeepCalm.vue';
import SourceCodeBackdrop from '@components/SourceCodeBackdrop.vue';
import LanguageSwitcher from '@components/LanguageSwitcher.vue';
import { useTranslation } from '@/i18n';

import DownArrow from '@/assets/Icons/DownArrow.vue';
import Download from '@/assets/Icons/Download.vue';

const { t } = useTranslation();

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
const showScrollToExplore = computed(() => activeSection.value == 'home');

// Typing "I'm a Software Developer."
const isTyping = ref(false);
let typingTimeout1: number;
let typingTimeout2: number;

// Spotlight effect
const spotlightSize = 'transparent 50px, #0c0c0cE5 120px)';

function updateSpotlight(e: MouseEvent): void {
    const spotlight = document.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
    }
}

const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "./Resume_Sai_Swan_Wan.pdf";
    link.download = "Resume_Sai_Swan_Wan.pdf";
    link.click();
}

let observer: IntersectionObserver;

onMounted(() => {
    // Typewriter timers
    typingTimeout1 = window.setTimeout(() => {
        isTyping.value = true;
    }, 1000);

    typingTimeout2 = window.setTimeout(() => {
        isTyping.value = false;
    }, 3000);

    // Spotlight listener
    window.addEventListener('mousemove', updateSpotlight);

    // Intersection observer
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
    clearTimeout(typingTimeout1);
    clearTimeout(typingTimeout2);
    window.removeEventListener('mousemove', updateSpotlight);

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
            <a href="#home" class="logo-link">
                <span class="logo-flip">
                    <span class="logo-flip-inner">
                        <img src="/letter-j.png" alt="DevJhom Logo" class="logo-face logo-img" height="35" width="35">
                        <span class="logo-face logo-photo" aria-hidden="true"></span>
                    </span>
                </span>
                <h4 class="logo-text">DevJhom</h4>
            </a>
            <span class="logo-dot"></span>
        </div>
        <div class="top-actions">
            <LanguageSwitcher/>
            <div class="my-resume" @click="downloadResume()">
                <Download/>
                <h4>{{ t('header.resume') }}</h4>
            </div>
        </div>
        <!-- HOME -->
        <div id="home">
            <SourceCodeBackdrop/>
            <section>
                <div class="hero-content">
                    <div class="hero-status">
                        <span class="hero-status-dot"></span>
                        <span class="hero-status-text">{{ t('hero.status') }}</span>
                        <span class="hero-status-line"></span>
                    </div>
                    <h1 class="introduction-text">
                        {{ t('hero.greeting') }}
                    </h1>
                    <div :class="{typewriter: isTyping}" class="introduction-text">
                        <i18n-t keypath="hero.role" tag="h2">
                            <template #role><span class="text-animation">Software Developer</span></template>
                        </i18n-t>
                    </div>
                </div>
                <Transition name="fade">
                    <small v-if="showScrollToExplore" class="scroll-to-explore animate-on-hover">
                        <a href="#about-me"><DownArrow/></a>
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
    padding: 0.4rem 0.6rem;
    border-radius: $radius-md;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: background-color $transition-fast, border-color $transition-fast, box-shadow $transition-fast;
}

.logo:hover {
    background-color: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.25);
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
}

// Flip between the J and the my-picture.jpg on hover
.logo-flip {
    display: block;
    width: 35px;
    height: 35px;
    perspective: 400px;
}

.logo-flip-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-face {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: $radius-md;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.logo-photo {
    overflow: hidden;
    transform: rotateY(180deg);
    background: url('/my-picture.jpg') 46% 34% / auto 170% no-repeat;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 12px $blue;
}

// Light glint that sweeps across the photo once it has turned face-up.
.logo-photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.6) 50%, transparent 65%) 150% 0 / 250% 100% no-repeat;
}

.logo:hover .logo-flip-inner {
    transform: rotateY(180deg);
}

.logo:hover .logo-photo::after {
    background-position: -50% 0;
    transition: background-position 0.6s ease 0.35s;
}

@media (prefers-reduced-motion: reduce) {
    .logo-flip-inner,
    .logo:hover .logo-flip-inner {
        transform: none;
        transition: none;
    }

    .logo-face {
        backface-visibility: visible;
        -webkit-backface-visibility: visible;
        transition: opacity $transition-fast;
    }

    .logo-photo {
        transform: none;
        opacity: 0;
    }

    .logo:hover .logo-photo {
        opacity: 1;
    }

    .logo:hover .logo-photo::after {
        transition: none;
    }
}

.logo-text {
    margin: 0 0 0 0.6rem;
    background-color: transparent;
}

.logo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
    margin-left: 0.6rem;
    animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
}

// Language switcher + Resume, pinned top-right
.top-actions {
    position: fixed;
    right: 2rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: $top-layer;
}

.my-resume {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    // Locked to the expanded content's width so hiding the label on hover doesn't resize
    // the button; retune if the label text or its font-size changes. The Thai label fits
    // this width; Burmese gets its own below.
    width: 7.25rem;
    gap: 0.5rem;
    border: 1px solid $blue;
    border-radius: calc($radius-md * 2);
	background-size: 300% 100%;
	background-image: linear-gradient(to right, hsl(217, 100%, 62%), hsl(260, 100%, 62%), $blue);
	box-shadow: 0 1px 15px 0 $blue;
	transition: all $transition-medium;
    cursor: pointer;
}

// Estimated from Noto Sans Myanmar metrics — check it in the browser and retune if the
// label clips or has too much slack.
.my-resume:lang(my) {
    width: 9.5rem;
}

.my-resume h4 {
    font-size: clamp(0.75rem, 0.4vw + 0.55rem, 0.9rem);
    max-width: 12rem;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width $transition-medium, opacity $transition-fast;
}

.my-resume:hover {
    color: $white;
    background-position: 100% 0;
    gap: 0;
}

.my-resume:hover h4 {
    max-width: 0;
    opacity: 0;
}

.hero-content {
    padding: 0 2rem;
}

.hero-status {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1rem;
}

.hero-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
    flex-shrink: 0;
}

.hero-status-text {
    color: $light-gray;
    font-size: 0.8rem;
    white-space: nowrap;
    font-family: var(--font-mono);
}

.hero-status-line {
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.15);
}

.introduction-text {
    transition: transform $transition-fast;
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
// No z-index: it would lift SourceCodeBackdrop above .spotlight.
#home {
    position: relative;
    height: 100vh;
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
    width: 40%;
    cursor: initial;
}

.cursor-area-2 {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 20%;
    width: 60%;
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

// Phones: tighter gutters, and an icon-only Resume pinned bottom-left.
@media (max-width: 768px) {
    .logo {
        margin-left: 1rem;
    }

    .top-actions {
        right: 1rem;
        height: calc(35px + 0.8rem + 2px);
    }

    .scroll-to-explore {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        height: calc(20px + 1rem + 2px);
        display: flex;
        align-items: center;
    }

    .scroll-to-explore a {
        display: flex;
    }

    .my-resume,
    .my-resume:lang(my) {
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        width: auto;
        padding: 0.5rem 0.6rem;
        gap: 0;
    }

    .my-resume h4 {
        display: none;
    }
}
</style>
