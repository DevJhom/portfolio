<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, defineAsyncComponent } from 'vue';
import { useIsMobile, CAREER_START_YEAR } from '@/helpers/helpers';
import { useTranslation } from '@/i18n';
import type { JobId } from '@/constellation/jobs';
import FigmaLogo from '@/assets/Logos/FigmaLogo.vue';
import VueLogo from '@/assets/Logos/VueLogo.vue';
import ReactLogo from '@/assets/Logos/ReactLogo.vue';
import TypescriptLogo from '@/assets/Logos/TypescriptLogo.vue';
import ScssLogo from '@/assets/Logos/ScssLogo.vue';
import ViteLogo from '@/assets/Logos/ViteLogo.vue';
import MongodbLogo from '@/assets/Logos/MongodbLogo.vue';
import CsharpLogo from '@/assets/Logos/CsharpLogo.vue';
import CplusplusLogo from '@/assets/Logos/CplusplusLogo.vue';
import NodejsLogo from '@/assets/Logos/NodejsLogo.vue';
import FirebaseLogo from '@/assets/Logos/FirebaseLogo.vue';
import SqlLogo from '@/assets/Logos/SqlLogo.vue';
import RedisLogo from '@/assets/Logos/RedisLogo.vue';
import LinuxLogo from '@/assets/Logos/LinuxLogo.vue';
import GitLogo from '@/assets/Logos/GitLogo.vue';
import DockerLogo from '@/assets/Logos/DockerLogo.vue';
import GoogleCloudLogo from '@/assets/Logos/GoogleCloudLogo.vue';
import NeovimLogo from '@/assets/Logos/NeovimLogo.vue';
import ClaudeLogo from '@/assets/Logos/ClaudeLogo.vue';

// Lazy: three.js is ~500 kB, so it loads in its own chunk instead of delaying first paint.
const TechConstellation = defineAsyncComponent(() => import('@components/TechConstellation.vue'));

defineProps<{
    activeSection: string
}>();

const isMobile = useIsMobile();
const isDesktop = computed(() => !isMobile.value);
const { t } = useTranslation();

enum Experience {
    internship,
    omnistar,
    clicknext,
    reset
}

const isHover = reactive<{ [key: string]: boolean }>({
    vue: false,
    react: false,
    typescript: false,
    scss: false,
    csharp: false,
    cplusplus: false,
    nodejs: false,
    firebase: false,
    sql: false,
    git: false,
    docker: false,
    googlecloud: false,
    neovim: false,
    figma: false,
    vite: false,
    mongodb: false,
    redis: false,
    linux: false,
    claude: false,
});

const mouseEnterOnLogo = (key: string) => {
    isHover[key] = true;
}

const mouseLeaveOnLogo = (key: string) => {
    isHover[key] = false;
}

const hoverOnExp = reactive<{ [key: string]: boolean }>({
    hoverStart: false,
    internship: false,
    omnistar: false,
    clicknext: false,
});

// The 3D constellation follows the same timeline hover state as the 2D grid.
const activeJob = computed<JobId | null>(() => {
    if (hoverOnExp.internship) return 'internship';
    if (hoverOnExp.omnistar) return 'omnistar';
    if (hoverOnExp.clicknext) return 'clicknext';
    return null;
});

// 3D by default; "Grid view" plays the constellation's collapse animation, then swaps in the grid.
const view = ref<'3d' | '2d'>('3d');
const constellation = ref<{ collapse(): Promise<void> } | null>(null);
const isSwitching = ref(false);

const toggleView = async () => {
    if (isSwitching.value) return;
    if (view.value === '2d') {
        view.value = '3d';
        return;
    }
    isSwitching.value = true;
    await constellation.value?.collapse();
    view.value = '2d';
    isSwitching.value = false;
}

const hasUsed = reactive<{ [key: string]: boolean }>({
    vue: false,
    react: false,
    typescript: false,
    scss: false,
    csharp: false,
    cplusplus: false,
    nodejs: false,
    firebase: false,
    sql: false,
    git: false,
    docker: false,
    googlecloud: false,
    neovim: false,
    figma: false,
    vite: false,
    mongodb: false,
    redis: false,
    linux: false,
    claude: false,
});

const mouseOnExp = (experience: Experience, value: boolean) => {
    hoverOnExp.hoverStart = value;

    if (experience == Experience.internship) {
        hoverOnExp.internship = value;

        hasUsed.figma = value;
        hasUsed.react = value;
        hasUsed.scss = value;
        hasUsed.git = value;
        hasUsed.googlecloud = value;
    }

    else if (experience == Experience.omnistar) {
        hoverOnExp.omnistar = value;

        hasUsed.nodejs = value;
        hasUsed.firebase = value;
        hasUsed.sql = value;
        hasUsed.mongodb = value;
        hasUsed.linux = value;
        hasUsed.git = value;
        hasUsed.docker = value;
        hasUsed.googlecloud = value;
    }

    else if (experience == Experience.clicknext) {
        hoverOnExp.clicknext = value;

        hasUsed.vue = value;
        hasUsed.typescript = value;
        hasUsed.vite = value;
        hasUsed.csharp = value;
        hasUsed.sql = value;
        hasUsed.mongodb = value;
        hasUsed.redis = value;
        hasUsed.linux = value;
        hasUsed.git = value;
        hasUsed.docker = value;
        hasUsed.neovim = value;
        hasUsed.claude = value;
    }
}

const triggerHover = (experience: Experience) => {
    const listItems = document.querySelectorAll('.history-tl-container ul.tl li');
    const firstItem = listItems[0];
    const secondItem = listItems[1];
    const thirdItem = listItems[2];
    
    if (experience == Experience.internship) {
        mouseOnExp(Experience.omnistar, false);
        mouseOnExp(Experience.clicknext, false);
        mouseOnExp(Experience.internship, true);

        firstItem.classList.add('my-hover');
        secondItem.classList.remove('my-hover');
        thirdItem.classList.remove('my-hover');
    }

    else if (experience == Experience.omnistar) {
        mouseOnExp(Experience.internship, false);
        mouseOnExp(Experience.clicknext, false);
        mouseOnExp(Experience.omnistar, true);

        firstItem.classList.remove('my-hover');
        secondItem.classList.add('my-hover');
        thirdItem.classList.remove('my-hover');
    }
    
    else if (experience == Experience.clicknext) {
        mouseOnExp(Experience.internship, false);
        mouseOnExp(Experience.omnistar, false);
        mouseOnExp(Experience.clicknext, true);

        firstItem.classList.remove('my-hover');
        secondItem.classList.remove('my-hover');
        thirdItem.classList.add('my-hover');
    }

    else {
        mouseOnExp(Experience.internship, false);
        mouseOnExp(Experience.omnistar, false);
        mouseOnExp(Experience.clicknext, false);

        firstItem.classList.remove('my-hover');
        secondItem.classList.remove('my-hover');
        thirdItem.classList.remove('my-hover');
    }
}

// Scrollspy: rootMargin shrinks the viewport to a 1px line, so a target intersects only while that
// line crosses it. Desktop watches the .mini-nav segments at POINTER_VH: 40vh = 50vh - (.mini-nav
// height 30vh) / 3, the middle of the first segment when the section is flush with the viewport.
// Phones watch the timeline <li>s just below the sticky tech panel.
const POINTER_VH = 40;
const MOBILE_PANEL_VH = 55;
const MOBILE_POINTER_VH = MOBILE_PANEL_VH + 5;

const miniNav = ref<HTMLElement | null>(null);
const timeline = ref<HTMLElement | null>(null);
let currentArea: Element | null = null;
let scrollSpy: IntersectionObserver | null = null;

const onScrollSpy = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentArea = entry.target;
            triggerHover(Experience[(entry.target as HTMLElement).dataset.exp as keyof typeof Experience]);
        }
        // Targets are adjacent, so "leave 1" can arrive after "enter 2" in the same batch.
        else if (entry.target === currentArea) {
            currentArea = null;
            triggerHover(Experience.reset);
        }
    });
}

// Re-targets on remount (the section's v-if) and when the viewport crosses the mobile breakpoint;
// clears the job left lit from the last visit.
watch(() => isMobile.value ? timeline.value : miniNav.value, (el) => {
    scrollSpy?.disconnect();
    currentArea = null;
    if (!el) return;
    triggerHover(Experience.reset);
    const line = isMobile.value ? MOBILE_POINTER_VH : POINTER_VH;
    const spy = new IntersectionObserver(onScrollSpy, { root: null, rootMargin: `-${line}% 0px -${100 - line}% 0px`, threshold: 0 });
    Array.from(el.children).forEach(target => spy.observe(target));
    scrollSpy = spy;
}, { flush: 'post' });

onUnmounted(() => {
    scrollSpy?.disconnect();
});

</script>

<template>
    <Transition :name="isDesktop ? 'fade' : ''">
        <div v-if="activeSection == 'tech-stack' || isMobile" class="tech-stack">
            <div class="tech-stack-left">
                <h2>
                    {{ t('techStack.title') }}
                </h2>

                <div class="history-tl-container">
                    <ul ref="timeline" class="tl">
                        <li class="tl-item" data-exp="internship" @mouseenter="isDesktop && triggerHover(Experience.internship)" @mouseleave="isDesktop && triggerHover(Experience.reset)">
                            <div class="item-title">Frontend Developer <span :class="{'text-light-gray': !hoverOnExp.internship}">{{ t('techStack.internship') }}</span></div>
                            <div class="item-detail">@ Innovative Village Co., Ltd.</div>
                            <small v-show="hoverOnExp.internship || isMobile" class="item-detail">
                                {{ t('techStack.internshipDetail') }}
                            </small>
                        </li>
                        <li class="tl-item" data-exp="omnistar" @mouseenter="isDesktop && triggerHover(Experience.omnistar)" @mouseleave="isDesktop && triggerHover(Experience.reset)">
                            <div class="item-title">System Analyst <span :class="{'text-light-gray': !hoverOnExp.omnistar}"> (2021-2022)</span></div>
                            <div class="item-detail">@ Omni Star Co., Ltd.</div>
                            <small v-show="hoverOnExp.omnistar || isMobile" class="item-detail">
                                {{ t('techStack.omnistarDetail') }}
                            </small>
                        </li>
                        <li class="tl-item" data-exp="clicknext" @mouseenter="isDesktop && triggerHover(Experience.clicknext)" @mouseleave="isDesktop && triggerHover(Experience.reset)">
                            <div class="item-title">Full Stack Developer <span :class="{'text-light-gray': !hoverOnExp.clicknext}"> ({{ CAREER_START_YEAR }}-{{ t('techStack.present') }})</span></div>
                            <div class="item-detail">@ ClickNext Co., Ltd.</div>
                            <small v-show="hoverOnExp.clicknext || isMobile" class="item-detail">
                                {{ t('techStack.clicknextDetail') }}
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tech-stack-right">
                <Transition name="fade" mode="out-in">
                <div v-if="view === '3d'" class="constellation-wrap">
                    <TechConstellation ref="constellation" :active-job="activeJob"/>
                </div>
                <div v-else class="tech-stack-grid">
                    <!-- Row 1: frontend -->
                    <div class="tech-stack-grid-item grid-18" :class="{'used-figma': hasUsed.figma, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.figma }" @mouseenter="mouseEnterOnLogo('figma')" @mouseleave="mouseLeaveOnLogo('figma')">
                        <span v-if="isHover.figma">Figma</span>
                        <FigmaLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-2" :class="{'used-vue': hasUsed.vue, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.vue }" @mouseenter="mouseEnterOnLogo('vue')" @mouseleave="mouseLeaveOnLogo('vue')">
                        <span v-if="isHover.vue">Vue</span>
                        <VueLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-3" :class="{'used-react': hasUsed.react, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.react }" @mouseenter="mouseEnterOnLogo('react')" @mouseleave="mouseLeaveOnLogo('react')">
                        <span v-if="isHover.react">React</span>
                        <ReactLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-4" :class="{'used-typescript': hasUsed.typescript, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.typescript }" @mouseenter="mouseEnterOnLogo('typescript')" @mouseleave="mouseLeaveOnLogo('typescript')">
                        <span v-if="isHover.typescript" class="text-center text-break">Type<wbr>script</span>
                        <TypescriptLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-15" :class="{'used-vite': hasUsed.vite, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.vite }" @mouseenter="mouseEnterOnLogo('vite')" @mouseleave="mouseLeaveOnLogo('vite')">
                        <span v-if="isHover.vite">Vite</span>
                        <ViteLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-5" :class="{'used-scss': hasUsed.scss, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.scss }" @mouseenter="mouseEnterOnLogo('scss')" @mouseleave="mouseLeaveOnLogo('scss')">
                        <span v-if="isHover.scss">SCSS</span>
                        <ScssLogo v-else />
                    </div>
                    <!-- Row 2: backend -->
                    <div class="tech-stack-grid-item grid-6" :class="{'used-csharp': hasUsed.csharp, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.csharp }" @mouseenter="mouseEnterOnLogo('csharp')" @mouseleave="mouseLeaveOnLogo('csharp')">
                        <span v-if="isHover.csharp">C#</span>
                        <CsharpLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-7" :class="{'used-cplusplus': hasUsed.cplusplus, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.cplusplus }" @mouseenter="mouseEnterOnLogo('cplusplus')" @mouseleave="mouseLeaveOnLogo('cplusplus')">
                        <span v-if="isHover.cplusplus">C++</span>
                        <CplusplusLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-8" :class="{'used-nodejs': hasUsed.nodejs, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.nodejs }" @mouseenter="mouseEnterOnLogo('nodejs')" @mouseleave="mouseLeaveOnLogo('nodejs')">
                        <span v-if="isHover.nodejs">Node.js</span>
                        <NodejsLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-9" :class="{'used-firebase': hasUsed.firebase, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.firebase }" @mouseenter="mouseEnterOnLogo('firebase')" @mouseleave="mouseLeaveOnLogo('firebase')">
                        <span v-if="isHover.firebase">Firebase</span>
                        <FirebaseLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-19" :class="{'used-mongodb': hasUsed.mongodb, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.mongodb }" @mouseenter="mouseEnterOnLogo('mongodb')" @mouseleave="mouseLeaveOnLogo('mongodb')">
                        <span v-if="isHover.mongodb" class="text-center text-break">Mongo<wbr>DB</span>
                        <MongodbLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-10" :class="{'used-sql': hasUsed.sql, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.sql }" @mouseenter="mouseEnterOnLogo('sql')" @mouseleave="mouseLeaveOnLogo('sql')">
                        <span v-if="isHover.sql">SQL</span>
                        <SqlLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-16" :class="{'used-redis': hasUsed.redis, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.redis }" @mouseenter="mouseEnterOnLogo('redis')" @mouseleave="mouseLeaveOnLogo('redis')">
                        <span v-if="isHover.redis">Redis</span>
                        <RedisLogo v-else />
                    </div>
                    <!-- Row 3: infra / OS / cloud / AI -->
                    <div class="tech-stack-grid-item grid-20" :class="{'used-linux': hasUsed.linux, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.linux }" @mouseenter="mouseEnterOnLogo('linux')" @mouseleave="mouseLeaveOnLogo('linux')">
                        <span v-if="isHover.linux">Linux</span>
                        <LinuxLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-11" :class="{'used-git': hasUsed.git, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.git }" @mouseenter="mouseEnterOnLogo('git')" @mouseleave="mouseLeaveOnLogo('git')">
                        <span v-if="isHover.git">Git</span>
                        <GitLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-12" :class="{'used-docker': hasUsed.docker, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.docker }" @mouseenter="mouseEnterOnLogo('docker')" @mouseleave="mouseLeaveOnLogo('docker')">
                        <span v-if="isHover.docker">Docker</span>
                        <DockerLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-13" :class="{'used-googlecloud': hasUsed.googlecloud, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.googlecloud }" @mouseenter="mouseEnterOnLogo('googlecloud')" @mouseleave="mouseLeaveOnLogo('googlecloud')">
                        <span v-if="isHover.googlecloud" class="text-center">Google Cloud</span>
                        <GoogleCloudLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-14" :class="{'used-neovim': hasUsed.neovim, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.neovim }" @mouseenter="mouseEnterOnLogo('neovim')" @mouseleave="mouseLeaveOnLogo('neovim')">
                        <span v-if="isHover.neovim">NeoVim</span>
                        <NeovimLogo v-else />
                    </div>
                    <div class="tech-stack-grid-item grid-17" :class="{'used-claude': hasUsed.claude, 'reduced-opacity': hoverOnExp.hoverStart && !hasUsed.claude }" @mouseenter="mouseEnterOnLogo('claude')" @mouseleave="mouseLeaveOnLogo('claude')">
                        <span v-if="isHover.claude">Claude</span>
                        <ClaudeLogo v-else />
                    </div>
                </div>
                </Transition>
                <div class="tech-caption d-flex animate-on-hover">
                    <template v-if="hoverOnExp.hoverStart">
                        <template v-if="hoverOnExp.clicknext">
                            {{ t('techStack.currentlyUsing') }}
                        </template>
                        <template v-else>
                            {{ t('techStack.usedAndFamiliar') }}
                        </template>
                    </template>
                    <template v-else>
                        {{ t('techStack.familiar') }}
                    </template>
                </div>
                <div class="view-toggle">
                    <button type="button" class="view-toggle-button" :disabled="isSwitching" @click="toggleView()">
                        {{ view === '3d' ? t('techStack.gridView') : t('techStack.view3d') }}
                    </button>
                </div>
            </div>
            <div v-if="isDesktop" ref="miniNav" class="mini-nav">
                <div :class="{active: hoverOnExp.internship}" data-exp="internship"></div>
                <div :class="{active: hoverOnExp.omnistar}" data-exp="omnistar"></div>
                <div :class="{active: hoverOnExp.clicknext}" data-exp="clicknext"></div>
            </div>
            <div v-if="isDesktop" class="scroll-pointer" :class="{ engaged: hoverOnExp.hoverStart }" :style="{ top: `${POINTER_VH}vh` }" aria-hidden="true">
                <span class="scroll-pointer-caret"></span>
                <span class="scroll-pointer-tail">
                    <span v-if="activeJob" :key="activeJob" class="scroll-pointer-spark"></span>
                </span>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
// Tech Stack
.tech-stack {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75%;
    margin: auto;
}

.tech-stack-left {
    width: 50%;
    height: 100%;
    z-index: $top-layer;
}

// Between the global h3 and h2 sizes: the full h2 is too large beside the timeline.
.tech-stack-left h2 {
    font-size: clamp(1.1rem, 1.5vw + 0.5rem, 1.6rem);
}

.tech-stack-right {
    width: 50%;
    height: 100%;
    padding: 0 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // .tech-stack (width 75%) leaves 12.5vw empty beside the hive's right edge.
    // Shift right by half of it so the gap to the timeline matches the gap to the screen edge.
    position: relative;
    left: 6.25vw;
}

// 3D / 2D toggle, styled like the glass logo pill in MainPage.vue
.view-toggle {
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
    z-index: $top-layer;
}

.view-toggle-button {
    padding: 0.3rem 0.9rem;
    border-radius: $radius-md;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: $white;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    cursor: pointer;
    transition: border-color $transition-fast, box-shadow $transition-fast;
}

.view-toggle-button:hover:not(:disabled) {
    border-color: $blue;
    box-shadow: 0 0 12px rgba(31, 81, 255, 0.5);
}

.tech-caption {
    justify-content: center;
    margin-top: 1.5rem;
}

.view-toggle-button:disabled {
    cursor: wait;
    opacity: 0.6;
}

// z-index keeps the canvas below the fixed logo, language switcher and Resume button ($top-layer)
// in MainPage.vue.
.constellation-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    max-height: 70vh;
    z-index: $middle-layer;
}

.mini-nav {
    position: absolute;
    left: 0;
    height: 30%;
    width: 0.5%;
    display: flex;
    flex-direction: column;
}

.mini-nav div {
    flex: 1;
    background-color: $black;
    border: 1px solid $gray2;
}

.mini-nav div.active {
    background-color: $blue;
}

.mini-nav div:first-child {
    border-radius: 0 12px 0 0;
}

.mini-nav div:last-child {
    border-radius: 0 0 12px 0;
}

// Tech Stack Left
.history-tl-container {
    padding-top: 2rem;
}

.history-tl-container ul.tl li {
    position: relative;
    list-style: none;
    margin: auto;
    min-height: 150px;
    border-left: 1px dashed $gray2;
    padding-left: 30px;
}

.history-tl-container ul.tl li:last-child { 
    border-left: 0; 
}

.history-tl-container ul.tl li::before {
    position: absolute;
    content: " ";
    left: -18px;
    top: -5px;
    border: 8px solid rgba(36, 36, 36, 0.7);
    border-radius: 100%;
    background: $light-gray;
    height: 35px;
    width: 35px;
    transition: all $transition-fast;
}

.history-tl-container ul.tl li.my-hover::before {
    border-color: $light-black;
    background-color: $blue;
    transition: all $transition-fast;
}

ul.tl li .item-detail {
    color: $light-gray;
}

// Tech Stack Right
.tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1rem;
    z-index: $top-layer;
}

.tech-stack-grid-item {
    border: 1px solid $gray2;
    border-radius: $radius-md;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform $transition-fast;
    aspect-ratio: 1 / 1.1;
    font-size: 0.8em;
}

.tech-stack-grid-item:hover {
    transform: scale(1.04);
}
    
.grid-18 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 3;
    grid-row-start: 1;
}

.grid-19 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 5;
    grid-row-start: 1;
}

.grid-20 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 7;
    grid-row-start: 1;
}


.grid-18 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 1;
}

.grid-2 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 4;
    grid-row-start: 1;
}

.grid-3 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 6;
    grid-row-start: 1;
}

.grid-4 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 8;
    grid-row-start: 1;
}

.grid-15 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 10;
    grid-row-start: 1;
}

.grid-5 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 12;
    grid-row-start: 1;
}

.grid-6 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 1;
    grid-row-start: 3;
}

.grid-7 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 3;
    grid-row-start: 3;
}

.grid-8 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 5;
    grid-row-start: 3;
}

.grid-9 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 7;
    grid-row-start: 3;
}

.grid-19 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 9;
    grid-row-start: 3;
}

.grid-10 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 11;
    grid-row-start: 3;
}

.grid-16 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 13;
    grid-row-start: 3;
}

.grid-20 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 5;
}

.grid-11 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 4;
    grid-row-start: 5;
}

.grid-12 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 6;
    grid-row-start: 5;
}

.grid-13 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 8;
    grid-row-start: 5;
}

.grid-14 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 10;
    grid-row-start: 5;
}

.grid-17 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 12;
    grid-row-start: 5;
}

.grid-2:hover, .used-vue {
    color: $vue-green;
    border: 2px solid $vue-green;
}

.grid-3:hover, .used-react {
    color: $react-blue;
    border: 2px solid $react-blue;
}

.grid-4:hover, .used-typescript {
    color: $typescript-blue;
    border: 2px solid $typescript-blue;
}

.grid-5:hover, .used-scss {
    color: $scss-pink;
    border: 2px solid $scss-pink;
}

.grid-6:hover, .used-csharp {
    color: $csharp-pink;
    border: 2px solid $csharp-pink;
}

.grid-7:hover, .used-cplusplus {
    color: $cplusplus-blue;
    border: 2px solid $cplusplus-blue;
}

.grid-8:hover, .used-nodejs {
    color: $nodejs-green;
    border: 2px solid $nodejs-green;
}

.grid-9:hover, .used-firebase {
    color: $firebase-yellow;
    border: 2px solid $firebase-yellow;
}

.grid-10:hover, .used-sql {
    color: $sql-gray;
    border: 2px solid $sql-gray;
}

.grid-11:hover, .used-git {
    color: $git-orange;
    border: 2px solid $git-orange;
}

.grid-12:hover, .used-docker {
    color: $docker-blue;
    border: 2px solid $docker-blue;
}

.grid-13:hover, .used-googlecloud {
    color: $white;
    background: linear-gradient($black, $black) padding-box,
                linear-gradient(45deg, $white, #4285F4, #0F9D58) border-box;
    border-radius: $radius-md;
    border: 2px solid transparent;
}

.grid-14:hover, .used-neovim {
    color: $neovim-green;
    border: 2px solid $neovim-green;
}

.grid-18:hover, .used-figma {
    color: $figma-purple;
    background: linear-gradient($black, $black) padding-box,
                linear-gradient(45deg, #f24e1e, #ff7262, $figma-purple, #1abcfe, #0acf83) border-box;
    border-radius: $radius-md;
    border: 2px solid transparent;
}

.grid-15:hover, .used-vite {
    color: $vite-purple;
    background: linear-gradient($black, $black) padding-box,
                linear-gradient(45deg, $vite-purple, #41d1ff, #ffa800) border-box;
    border-radius: $radius-md;
    border: 2px solid transparent;
}

.grid-19:hover, .used-mongodb {
    color: $mongodb-green;
    border: 2px solid $mongodb-green;
}

.grid-16:hover, .used-redis {
    color: $redis-red;
    border: 2px solid $redis-red;
}

.grid-20:hover, .used-linux {
    color: $linux-gray;
    border: 2px solid $linux-gray;
}

.grid-17:hover, .used-claude {
    color: $claude-orange;
    border: 2px solid $claude-orange;
}

.reduced-opacity {
    opacity: 0.2;
}

// Marks the scrollspy trigger line; whichever .mini-nav segment sits under it is the active job.
.scroll-pointer {
    position: fixed;
    left: calc(0.5vw + 4px); // just right of .mini-nav; top is bound inline from POINTER_VH
    transform: translateY(-50%); // keeps the tail on the trigger line
    height: 8px;
    display: flex;
    align-items: center;
    filter: drop-shadow(0 0 0 rgba(31, 81, 255, 0));
    transition: filter $transition-fast;
    pointer-events: none;
    z-index: $top-layer;
}

.scroll-pointer-caret {
    width: 5px;
    height: 8px;
    background-color: $gray2;
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
    transition: background-color $transition-fast, transform $transition-fast;
}

.scroll-pointer-tail {
    position: relative;
    width: 24px;
    height: 2px;
    overflow: hidden;
    background-color: $gray2;
    -webkit-mask-image: linear-gradient(to right, #000 30%, transparent);
    mask-image: linear-gradient(to right, #000 30%, transparent);
    transform: scaleX(0.34);
    transform-origin: left center;
    transition: background-color $transition-fast, transform $transition-fast;
}

.scroll-pointer.engaged {
    filter: drop-shadow(0 0 4px rgba(31, 81, 255, 0.8));
}

.scroll-pointer.engaged .scroll-pointer-caret {
    background-color: $blue;
    transform: translateX(-3px);
}

.scroll-pointer.engaged .scroll-pointer-tail {
    background-color: $blue;
    transform: translateX(-3px) scaleX(1);
}

.scroll-pointer-spark {
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background-color: $white;
    opacity: 0;
    animation: pointer-spark 0.5s ease-out;
}

@keyframes pointer-spark {
    from {
        transform: translateX(-6px);
        opacity: 1;
    }
    to {
        transform: translateX(24px);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .scroll-pointer,
    .scroll-pointer-caret,
    .scroll-pointer-tail {
        transition: none;
    }

    .scroll-pointer-spark {
        display: none;
    }
}

.tech-stack-left,
.tech-stack-right {
  font-size: clamp(0.8rem, 1vw + 0.2rem, 1.2rem);
}

@media (max-width: 1024px) {
    .tech-stack {
        width: 90%;
    }

    .tech-stack-right {
        padding: 0 1rem;
        left: 2.5vw; // half of the 5vw side margin at width 90%
    }
}

@media (max-width: 768px) {
    .tech-stack {
        flex-direction: column;
        padding: 2rem 0;
    }

    // Heading, then the tech panel pinned under the fixed header, then the timeline scrolling
    // beneath it; display: contents makes the heading and timeline siblings of the panel for order.
    .tech-stack-left {
        display: contents;
    }

    .history-tl-container {
        order: 2;
        width: 100%;
    }

    .tech-stack-right {
        order: 1;
        position: sticky;
        top: 0;
        left: 0;
        width: 100vw; // full-bleed past the 5vw gutters so the timeline never shows beside it
        height: calc(v-bind(MOBILE_PANEL_VH) * 1vh);
        @supports (height: 1dvh) {
            height: calc(v-bind(MOBILE_PANEL_VH) * 1dvh); // tracks the URL bar, as the scrollspy's line does
        }
        padding: 5rem 5vw 0.75rem; // 5rem clears the fixed logo / Resume header
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: minmax(0, 1fr) auto;
        align-items: center;
        column-gap: 1rem;
        background-color: $black;
        z-index: $middle-layer;
    }

    .constellation-wrap,
    .tech-stack-grid {
        grid-column: 1 / -1;
    }

    .constellation-wrap {
        height: 100%;
        aspect-ratio: auto;
        max-height: none;
    }

    .tech-caption {
        justify-content: flex-start;
        margin-top: 0.5rem;
    }

    .view-toggle {
        margin-top: 0.5rem;
    }
}
</style>
