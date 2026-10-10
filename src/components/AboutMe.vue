<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from 'vue';
import { useIsMobile, yearsOfExperience } from '@/helpers/helpers';
import { useTranslation } from '@/i18n';

const isMobile = useIsMobile();
const { t } = useTranslation();
import FacebookIcon from '@/assets/Icons/FacebookIcon.vue';
import GithubIcon from '@/assets/Icons/GithubIcon.vue';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Autoplay, EffectFlip, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-flip';
import 'swiper/css/a11y';

const props = defineProps<{
    activeSection: string
}>();

const sectionIsActive = computed(() => {
    return props.activeSection == "about-me";
});

const isDesktop = computed(() => !isMobile.value);

const mapSlides = [
    { id: 'myanmar', command: 'cd ~', src: '/asean-myanmar.svg', alt: 'Map of Southeast Asia with Myanmar highlighted', coords: '21.914°N, 95.956°E' },
    { id: 'thailand', command: 'locate', src: '/asean-thailand.svg', alt: 'Map of Southeast Asia with Thailand highlighted', coords: '13.756°N, 100.502°E' },
];

const businessCard = ref<typeof Swiper | null>(null);
// A11y makes the arrows focusable and Enter-operable; it changes nothing visually.
const modules_location = [Navigation, Pagination, Autoplay, A11y];
const modules_business_card = [EffectFlip];

const onSwiper = (swiper: any) => {
    businessCard.value = swiper
}

const onHoverBusinessCard = () => {
    businessCard.value?.slidePrev();
}

// updatePlaybackRate keeps each box's current position; swapping animation-duration in CSS would make them jump
const passionCard = ref<HTMLElement | null>(null);

const setPassionBoxSpeed = (rate: number) => {
    passionCard.value?.querySelectorAll('.animate-box').forEach(box => {
        box.getAnimations().forEach(animation => animation.updatePlaybackRate(rate));
    });
}

// Logo hover: lines run to the other cards and round their borders. Seconds, bound into the CSS with v-bind().
const WIRE_FEED = 0.15; // from the logo to a neighbouring card
const WIRE_FEED_FAR = 0.45; // the longer run to the experience card
const WIRE_DRAW = 0.6; // round a card's border
const FRAME_RADIUS = 13; // the cards' $radius-md plus half the 2px line

type Box = { x: number, y: number, w: number, h: number };
type Side = 'top' | 'right' | 'bottom' | 'left';
type Wire = { id: string, feed: string, frame: string, delay: number };

const grid = ref<HTMLElement | null>(null);
const wires = ref<Wire[]>([]);
const wired = ref(false);
const lit = ref(false);
let logoHovered = false;
let litTimer: ReturnType<typeof setTimeout> | undefined;

// starts where the line arrives, so the CSS can grow the stroke from that point in both directions
const framePath = ({ x, y, w, h }: Box, side: Side, at: number) => {
    const r = FRAME_RADIUS;
    const right = x + w;
    const bottom = y + h;
    const corner = (toX: number, toY: number) => `A${r} ${r} 0 0 1 ${toX} ${toY}`;
    const start: Record<Side, string> = {
        top: `M${at} ${y}`,
        right: `M${right} ${at}`,
        bottom: `M${at} ${bottom}`,
        left: `M${x} ${at}`,
    };
    const sides: Record<Side, string> = {
        top: `H${right - r}${corner(right, y + r)}`,
        right: `V${bottom - r}${corner(right - r, bottom)}`,
        bottom: `H${x + r}${corner(x, bottom - r)}`,
        left: `V${y + r}${corner(x + r, y)}`,
    };
    const order: Side[] = ['top', 'right', 'bottom', 'left'];
    const from = order.indexOf(side);
    const loop = [...order.slice(from), ...order.slice(0, from)];

    return start[side] + loop.map(name => sides[name]).join('') + 'Z';
}

// offsetLeft and friends ignore transforms, so a card mid-hover is measured at its resting size
const measureWires = (): Wire[] => {
    const cards = Array.from(grid.value?.querySelectorAll<HTMLElement>(':scope > .grid-item') ?? []);
    const [location, social, experience, logo, passion, business] = cards.map((card): Box => ({
        x: card.offsetLeft,
        y: card.offsetTop,
        w: card.offsetWidth,
        h: card.offsetHeight,
    }));

    if (!location || !social || !experience || !logo || !passion || !business) return [];
    // the cards are display: none until the section is on screen
    if (!location.w || !social.w || !experience.w || !passion.w || !business.w) return [];

    const frame = ({ x, y, w, h }: Box): Box => ({ x: x - 1, y: y - 1, w: w + 2, h: h + 2 });
    const [left, top, far, right, below] = [location, social, experience, passion, business].map(frame) as [Box, Box, Box, Box, Box];

    const tile = grid.value?.querySelector<HTMLElement>('.my-logo');
    if (!tile) return [];

    const half = Math.min(tile.offsetWidth, tile.offsetHeight) / 2;
    const cx = tile.offsetLeft + tile.offsetWidth / 2;
    const cy = tile.offsetTop + tile.offsetHeight / 2;
    const hub = { x: cx - half, y: cy - half };
    const hubRight = cx + half;
    const hubBottom = cy + half;

    // the experience card is diagonal to the logo, so its line runs along the gap under the social card
    const gapY = (social.y + social.h + logo.y) / 2;
    const farX = experience.x + experience.w / 2;

    return [
        { id: 'location', delay: WIRE_FEED, feed: `M${hub.x} ${cy}H${left.x + left.w}`, frame: framePath(left, 'right', cy) },
        { id: 'social', delay: WIRE_FEED, feed: `M${cx} ${hub.y}V${top.y + top.h}`, frame: framePath(top, 'bottom', cx) },
        { id: 'experience', delay: WIRE_FEED_FAR, feed: `M${cx} ${hub.y}V${gapY}H${farX}V${far.y + far.h}`, frame: framePath(far, 'bottom', farX) },
        { id: 'passion', delay: WIRE_FEED, feed: `M${hubRight} ${cy}H${right.x}`, frame: framePath(right, 'left', cy) },
        { id: 'business', delay: WIRE_FEED, feed: `M${cx} ${hubBottom}V${below.y}`, frame: framePath(below, 'top', cx) },
    ];
}

const onLogoEnter = () => {
    // the lines only make sense on the 4-column grid
    if (!sectionIsActive.value || !window.matchMedia('(min-width: 1025px)').matches) return;

    wires.value = measureWires();
    if (!wires.value.length) return;

    logoHovered = true;
    nextTick(() => {
        if (!logoHovered) return;

        // newly added paths have to be rendered once in their hidden state, or they appear without drawing
        grid.value?.getBoundingClientRect();
        wired.value = true;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        litTimer = setTimeout(() => {
            lit.value = true;
            setPassionBoxSpeed(6);
            onHoverBusinessCard();
        }, reducedMotion ? 0 : (WIRE_FEED + WIRE_DRAW) * 1000);
    });
}

const onLogoLeave = () => {
    logoHovered = false;
    clearTimeout(litTimer);
    if (lit.value) setPassionBoxSpeed(1);
    wired.value = false;
    lit.value = false;
}

onUnmounted(() => clearTimeout(litTimer));

</script>

<template>
    <div ref="grid" class="grid-container" :class="{ 'is-wired': wired && sectionIsActive, 'is-lit': lit }">
        <Transition :name="isDesktop ? 'slide-fade-left' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item location-card">
                <Swiper 
                    :navigation="true"
                    :pagination="true"
                    :loop="true"
                    :modules="modules_location" 
                    :autoplay="{
                        delay: 5000,
                        disableOnInteraction: true,
                    }"
                >
                    <SwiperSlide>
                        <div class="profile-slide">
                            <div class="profile-photo">
                                <img src="/my-picture.jpg" alt="DevJhom wearing headphones">
                            </div>
                            <div class="terminal-header terminal-header--glass">
                                <span class="terminal-dot dot-red"></span>
                                <span class="terminal-dot dot-yellow"></span>
                                <span class="terminal-dot dot-green"></span>
                            </div>
                            <div class="profile-body">
                                <div class="terminal-line">
                                    <span class="terminal-prompt">$</span>
                                    <span>whoami</span>
                                </div>
                                <div class="profile-name">
                                    <h3>DevJhom</h3>
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#28c840" aria-hidden="true">
                                        <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                                    </svg>
                                </div>
                                <i18n-t keypath="about.intro" tag="div" class="terminal-output">
                                    <template #role>Full Stack Developer</template>
                                </i18n-t>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide v-for="slide in mapSlides" :key="slide.id">
                        <div class="map-slide">
                            <div class="terminal-header">
                                <span class="terminal-dot dot-red"></span>
                                <span class="terminal-dot dot-yellow"></span>
                                <span class="terminal-dot dot-green"></span>
                            </div>
                            <div class="location-map">
                                <img :src="slide.src" :alt="slide.alt">
                                <div class="map-coords">
                                    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    <span>{{ slide.coords }}</span>
                                </div>
                            </div>
                            <div class="terminal-body">
                                <div class="terminal-line">
                                    <span class="terminal-prompt">$</span>
                                    <span>{{ slide.command }}</span>
                                </div>
                                <i18n-t v-if="slide.id === 'myanmar'" keypath="about.from" tag="div" class="terminal-output">
                                    <template #country><span class="t-white">{{ t('about.country') }}</span></template>
                                </i18n-t>
                                <i18n-t v-else keypath="about.based" tag="div" class="terminal-output">
                                    <template #city><span class="t-white">{{ t('about.city') }}</span></template>
                                </i18n-t>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Transition>

        <Transition :name="isDesktop ? 'slide-fade-top' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item description-card">
                <div class="social-links">
                    <a href="https://github.com/DevJhom" target="_blank" class="social-link social-link--github">
                        <GithubIcon :width="22" :height="22"/>
                    </a>
                    <a href="https://www.linkedin.com/in/sai-swan-wan-744945205/" target="_blank" class="social-link social-link--linkedin">
                        <LinkedInIcon :width="22" :height="22"/>
                    </a>
                    <a href="https://www.facebook.com/sai.jhom.wan/" target="_blank" class="social-link social-link--facebook">
                        <FacebookIcon :width="22" :height="22"/>
                    </a>
                </div>
            </div>
        </Transition>

        <Transition :name="isDesktop ? 'slide-fade-right' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item experience-card">
                <i18n-t keypath="about.experience" tag="span">
                    <template #years><h3> {{ yearsOfExperience }}+ </h3></template>
                    <template #br><br></template>
                </i18n-t>
            </div>
        </Transition>

        <div class="grid-item social-media-card">
            <div class="my-logo" @mouseenter="onLogoEnter" @mouseleave="onLogoLeave"></div>
        </div>

        <Transition :name="isDesktop ? 'slide-fade-right' : ''">
            <div
                v-show="sectionIsActive || !isDesktop"
                ref="passionCard"
                class="grid-item passion-card"
                @mouseenter="setPassionBoxSpeed(6)"
                @mouseleave="setPassionBoxSpeed(1)"
            >
                <div class="animate-box" id="animate-box-1"></div>
                <div class="animate-box" id="animate-box-2"></div>
                <div class="animate-box" id="animate-box-3"></div>
                <div class="animate-box" id="animate-box-4"></div>
                <div class="animate-box" id="animate-box-5"></div>

                <h4 class="mb-3">{{ t('about.passionTitle') }}</h4>
                <span class="text-light-gray">
                    {{ t('about.passionText') }}
                </span>
            </div>
        </Transition>

        <Transition :name="isDesktop ? 'slide-fade-left' : ''">
            <div
                v-show="sectionIsActive || !isDesktop"
                class="grid-item style-card"
                tabindex="0"
                role="button"
                :aria-label="t('about.flipCard')"
                @keydown.enter.prevent="onHoverBusinessCard"
                @keydown.space.prevent="onHoverBusinessCard"
            >
                <Swiper 
                    @swiper="onSwiper"
                    :effect="'flip'"
                    :flip-effect="{ slideShadows: true }"
                    :speed="500"
                    :loop="true"
                    :navigation="false"
                    :pagination="false"
                    :modules="modules_business_card" 
                    @mouseenter="onHoverBusinessCard"
                >
                    <SwiperSlide>
                        <div class="business-card-front">
                            <h3 class="text-vs-green">
                                &lt;&#47;&#62;
                            </h3>
                            <span>
                                DevJhom
                            </span>
                            <small class="text-vs-dark-blue">
                                <b>Full Stack Developer</b>
                            </small>
                            <small class="swipe">
                                <i>{{ t('about.swipe') }}</i>
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="business-card-back">
                            <small class="text-vs-purple file-name">
                                business-card.info
                            </small>
                            <small><span class="text-vs-yellow">.contact </span><span class="text-vs-yellow">&#123;</span></small>
                            <small class="ms-4"><span class="text-vs-blue">name:</span><span class="text-vs-orange"> DevJhom</span></small>
                            <small class="ms-4"><span class="text-vs-blue">role:</span><span class="text-vs-orange"> Full Stack Developer</span></small>
                            <small class="ms-4"><span class="text-vs-blue">mobile:</span><span class="text-vs-green"> +66 98 931 8198</span></small>
                            <small class="ms-4"><span class="text-vs-blue">email:</span><span class="text-vs-green"> jhomwan238@gmail.com</span></small>
                            <small class="ms-4"><span class="text-vs-blue">website:</span><span class="text-vs-green"> https://devjhom.site</span> </small>
                            <small class="text-vs-yellow">&#125;</small>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Transition>

        <!-- Must stay the last child: the cards are placed with :nth-child. -->
        <svg class="wires" aria-hidden="true">
            <g v-for="wire in wires" :key="wire.id" :style="{ '--wire-delay': `${wire.delay}s` }">
                <path class="wire-feed" :d="wire.feed" pathLength="1" />
                <path class="wire-frame" :d="wire.frame" pathLength="1" />
            </g>
        </svg>
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    --grid-h: clamp(600px, 80vh, 900px);
    --grid-ratio: 1.6; // 16:10

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1.5rem;
    height: var(--grid-h);
    width: min(92%, calc(var(--grid-h) * var(--grid-ratio)));
    padding: 1rem 0;
    position: relative;
}

// pathLength="1" on the paths makes every dash length below a fraction of the whole line
.wires {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;

    path {
        fill: none;
        stroke: $blue;
        stroke-width: 2;
    }
}

.wire-feed {
    stroke-dasharray: 1 2;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 0.15s linear calc(v-bind(WIRE_DRAW) * 0.5s);
}

// two dashes, one growing from each end of the closed path, meet on the far side of the card
.wire-frame {
    stroke-dasharray: 0 1 0 1;
    transition: stroke-dasharray calc(v-bind(WIRE_DRAW) * 0.5s) ease-in;
}

.is-wired {
    .wire-feed {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset var(--wire-delay) linear;
    }

    .wire-frame {
        stroke-dasharray: 0.5 0 0.5 1;
        transition: stroke-dasharray calc(v-bind(WIRE_DRAW) * 1s) ease-in-out var(--wire-delay);
    }
}

@media (prefers-reduced-motion: reduce) {
    .wires path {
        transition: none !important;
    }
}

.grid-item {
    max-width: 100%;
    max-height: 100%;
    border: 1px solid $gray;
    border-radius: $radius-md;
    padding: 2rem;
    transition: transform $transition-fast;
    min-height: 0;
    min-width: 0;
}

// outline, not a thicker border: a border change resizes the card and shakes its content
.grid-item:hover {
    outline: 2px solid $blue;
    transform: scale(1.04);
}

.grid-item:nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 4;
}

.grid-item:nth-child(2) {
    grid-column: 2 / span 2;
    grid-row: 1 / span 2;
}

.grid-item:nth-child(3) {
    grid-column: 4 / span 1;
    grid-row: 1 / span 2;
}

.grid-item:nth-child(4) {
    grid-column: 2 / span 1;
    grid-row: 3 / span 2;
}

.grid-item:nth-child(5) {
    grid-column: 3 / span 2;
    grid-row: 3 / span 4;
}

.grid-item:nth-child(6) {
    grid-column: 1 / span 2;
    grid-row: 5 / span 2;
    box-shadow: 1px 1px 12px 0px rgba(199,199,199,0.75);
    -webkit-box-shadow: 1px 1px 12px 0px rgba(199,199,199,0.75);
    -moz-box-shadow: 1px 1px 12px 0px rgba(199,199,199,0.75);
}

/* 
CARDS

1. location-card
2. description-card
3. experience-card
4. social-media-card
5. passion-card
6. style-card

*/

.location-card, .description-card, .experience-card, .social-media-card, .style-card {
    padding: 0;
}

// 1. location-card
.location-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background-color: $light-black;
}

.profile-slide, .map-slide {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: $white;
    font-family: "Courier Prime", var(--font-mono);
}

.location-card :deep(.swiper-button-prev) {
    display: none;
}

// The fade is a mask on the photo itself: a gradient or blur layered on top leaves a
// one-pixel line of unfaded photo at the card edge once the card scales up on hover.
$photo-height: 60%;

.profile-photo {
    $fade: linear-gradient(to bottom, #000 50%, rgba(0, 0, 0, 0.15) 76%, transparent 90%);

    position: absolute;
    inset: 0 0 auto;
    height: $photo-height;
    -webkit-mask-image: $fade;
    mask-image: $fade;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 46% 0; // keeps the head centred
    }
}

// otherwise the grey border shows as a line between the photo and the blue hover outline
.location-card:hover, .is-lit .location-card {
    border-color: $blue;
}

// bottom padding clears the Swiper bullets
.profile-body {
    position: relative;
    margin-top: auto;
    padding: 1rem 1rem 2.1rem;
}

.profile-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    h3 {
        font-size: 1rem;
        font-weight: bold;
    }

    svg {
        flex-shrink: 0;
    }
}

.profile-body .terminal-output {
    padding-left: 0;
}

.location-map {
    position: relative;
    flex: 0 1 auto;
    min-height: 0;
    width: calc(100% - 1.5rem);
    aspect-ratio: 1;
    margin: 0 0.75rem;
    overflow: hidden;
    border-radius: $radius-sm;
    background-color: #000;
    container-type: inline-size; // .map-coords sizes itself in cqw

    img {
        // the land is the middle 56% of the SVG, so the image overhangs the panel to fill it
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 155%;
        max-width: none;
        height: auto;
        transform: translate(-50%, -50%);
    }
}

.map-coords {
    position: absolute;
    bottom: 4%;
    left: 4%;
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: $light-gray;
    font-size: clamp(8px, 4cqw, 0.8rem);
    line-height: 1.3;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}

// Terminal styles
.terminal-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0.5rem 0.75rem;
    flex-shrink: 0;
}

.terminal-header--glass {
    position: absolute;
    inset: 0 0 auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background-color: rgba($light-black, 0.6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
}

.dot-red    { background-color: #ff5f57; }
.dot-yellow { background-color: #ffbd2e; }
.dot-green  { background-color: #28c840; }

.terminal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 1rem;
}

.map-slide .terminal-body {
    flex: 1 0 auto;
    padding-bottom: 1.75rem;
}

.terminal-line {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
}

.terminal-prompt {
    color: $blue;
    font-weight: bold;
}

.terminal-output {
    font-size: 0.78rem;
    color: $light-gray;
    line-height: 1.6;
    padding-left: 0.25rem;

    .t-white {
        color: $white;
    }
}

// 2. description-card
.description-card {
    background-image: url("/demo-picture.jpg");
    background-size: auto 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;
}

// a grey border would show as a line between the blue background and the blue outline
.description-card:hover, .is-lit .description-card {
    border-color: $blue;
    background-color: $blue;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-right: 0.5rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $transition-fast;
}

.social-link :deep(svg) {
    margin: 0 !important;
}

.social-link:hover {
    transform: scale(1.15);
}

// 3. experience-card
.experience-card {
    padding: 1rem;
    background: linear-gradient(to right, $light-gray 0, white 10%, $light-gray 20%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    animation-fill-mode: forwards;
    animation: background-gradient 4s infinite linear;
}

// Bootstrap headings are weight 500
.experience-card h3 {
    font-weight: bold;
}

// 4. social-media-card
.social-media-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0;
}

// the logo, not the cell around it, is the hover target
.social-media-card:hover {
    outline: none;
    transform: none;
}

.social-media-card .my-logo {
    height: 75%;
    max-width: 75%;
    aspect-ratio: 1;
    // sized and placed so the 180px tile inside the 184x187 image fills this box exactly
    border-radius: 7.8%;
    background: url("/letter-j.png") 50% 57.14% / 102.22% 103.89% no-repeat;
    cursor: pointer;
}

.social-media-card .my-logo:hover {
    outline: 4px solid $blue;
}

// 5. passion-card
.passion-card {
    position: relative;
    width: 100%;
    height: 100%;
    background: $light-black;
    overflow: hidden;
}

.passion-card .animate-box {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: floating-boxes 20s linear infinite;
}

.passion-card:hover .animate-box, .is-lit .passion-card .animate-box {
    background-color: $blue;
}

#animate-box-1 {
    left: 80%;
    width: 100px;
    height: 100px;
    bottom: -100px;
    animation-delay: 0s;
}

#animate-box-2 {
    left: 40%;
    width: 130px;
    height: 130px;
    bottom: -130px;
    animation-delay: 3s;
}

#animate-box-3 {
    left: 20%;
    width: 60px;
    height: 60px;
    bottom: -60px;
    animation-delay: 8s;
}

#animate-box-4 {
    left: 60%;
    width: 80px;
    height: 80px;
    bottom: -80px;
    animation-delay: 14s;
}

#animate-box-5 {
    left: 15%;
    width: 20px;
    height: 20px;
    bottom: -20px;
    animation-delay: 16s;
}

// 6. style-card
.style-card {
    overflow: hidden;
}

.business-card-front {
    background: url('/street-map.svg') no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.business-card-front .swipe {
    position: absolute;
    bottom: 0.5rem;
    right: 1rem;
    color: $light-gray;
}

.business-card-back {
    background-image: $pattern-1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1rem 1rem 2.5rem; // left side holds the line-number gutter
    width: 100%;
    height: 100%;
    counter-reset: line;
}

// VS Code-style line numbers. Absolute with only `left` set, so each number keeps its line's
// vertical position but ignores the line's ms-4 indent.
.business-card-back small:not(.file-name)::before {
    counter-increment: line;
    content: counter(line);
    position: absolute;
    left: 0.5rem;
    width: 1.25rem;
    text-align: right;
    color: $light-gray;
    user-select: none;
}

.business-card-back .file-name {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
}

@media (max-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        width: 90%;
        height: auto; // the stacked layout grows with its content
    }

    .wires {
        display: none;
    }

    .grid-item {
        grid-column: auto !important;
        grid-row: auto !important;
        min-height: 300px;
    }

    .grid-item:nth-child(3) {
        min-height: 180px;
    }

    .grid-item:nth-child(4) {
        min-height: 180px;
    }
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }

    .grid-item {
        grid-column: 1 / span 1 !important;
        grid-row: auto !important;
        min-height: 380px;
    }

    // the desktop cell's ratio
    .location-card {
        height: auto;
        aspect-ratio: 3 / 5;
    }

    .terminal-line, .terminal-output {
        font-size: 1rem;
    }

    .description-card, .experience-card, .social-media-card, .style-card {
        height: auto;
        min-height: 180px;
        aspect-ratio: 8 / 5;
    }

    // the global h3 clamp bottoms out at body-text size on phones
    .experience-card h3 {
        font-size: 1.5rem;
    }
}
</style>
