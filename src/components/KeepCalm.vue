<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useIsMobile, useBangkokClock } from '@/helpers/helpers';
import { messages, useTranslation } from '@/i18n';

const isMobile = useIsMobile();
const isDesktop = computed(() => !isMobile.value);
const bangkokTime = useBangkokClock();
const { t, locale } = useTranslation();
import Play from '@/assets/Icons/Play.vue';
import Stop from '@/assets/Icons/Stop.vue';

const props = defineProps<{
    activeSection: string
}>();

const typingMessage = reactive({
    isTyping: false,
    isAlreadyTyped: false
});

const cssBlack = getComputedStyle(document.documentElement).getPropertyValue('--color-black').trim();
const cssBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-blue').trim();
const dynamicBackgroundColor = ref(cssBlack);

watch(() => props.activeSection, (newSection) => {
    if (newSection == 'keep-calm-2' && !typingMessage.isAlreadyTyped) {
        typingMessage.isTyping = true;
        setTimeout(() => {
            typingMessage.isTyping = false;
            typingMessage.isAlreadyTyped = true;
        }, 2000)
    }

    if (newSection == 'keep-calm-3') {
        dynamicBackgroundColor.value = cssBlue;
    } else {
        dynamicBackgroundColor.value = cssBlack;
    }
});

// Matrix Effect
const randomText1 = ref("n8laig5ym1gemy1m1et2i6uld5wbjsw59cdoukul1jvzmfg3vmg1z6r7nd29xblm0sfyqxxr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsdr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsderu24jxpdpmvne24hd3rd4rs");
const randomText2 = ref("18d1aki40j4qmnum1csyq6kun2erxpxwfo1o5hkdaibg0v8ukxn69yzf6pffyaldroi14sufpi2iswtwxo6qiz5zgwgfzkf1833pyzyzy0ti9psnr0wyi2vns97gifhonivjno5ysdhsq3mrym7e169du86y5sj2bvphrfm3rtpw1w9ja30ary1je5gckho4bv0qmbdjgys8ysd88mtyjxphde6cw4bze03r45s");
const randomText3 = ref("3q5774z41cl2sdga6p80zdpshooxaqaouspo5qnljsbg0w5hk9nv5yzcjm1uy1rvi9kxgoso6g7ikp4zxo1q4zt7gpvfqa32d1pciq38ynvgb0j7rqqt6cemyb67k0xsn9iq0yxekdw4v3mnkiz1aqjbr9tzb1jxpmuhmi53zjp318uj9fgqceqlhtgcrsm2h9tmshgai2o453d69edbj3c006cd1bz8odeoq5b");
const randomText4 = ref("x83oepul5l1k4bhs17kjvt1dh5qinagu4choqpo1lovvtj83hiqgez3rr17jid81d777ekt9u319wtk9e9twjmhfda1edxogs1vtwa5s6wcv73tugk0gy5aajcia2739fedtufoj6jzsswpv1vjg1nx7ls975t866u1l42t0podmt02p02mpgwofm53mkc6mg1ea73mnabayzqiyjtg6qt94hfrgzv5t2ea1uwr");
const randomText5 = ref("n8oaiumym1gjqnuly7q2v6vy35hbis479c9ookmh1p0zp1uhdm21m67eni29nb26d5fgqih4278b3bpg9ofs4lm7esvi5w1hdgeswoclvqruf8sq5u03wvxeww4cqdq0jti27hbgtndyt4tve4oreofnl1278sbn1bgba0v9gj8a7w063e4ycui8dpxfcc2vvye1jfdccy2eisd8fi2hjxcd9mvne2i5z3xdh2s");
const randomText6 = ref("n8oakuayo1yj2nulyoqgv6vyg5h9at4d9fxookmu1w0931utdo23b6xeei29zbe9d5fgui829w81yb1g8ovs4lmw2ssi5w1jdol5wo4lyq6u18gl53snezhkqw49qa42j1i28hbgtnsrt4t26j3reofsl1a3u9bd1bgi70vtw6f07tnn3e4ycdi8dtgecc2vvue1p4dcxy2mi1lowadhjqci9ev3e2i5zcx7h4s");
const randomText7 = ref("s8pi2t0ul5ghofg6jogtw2hypa2tatxdzlc1gkkujwssvpeu7f2tpnncbo3i7smcvbddu0wk9w9fn14asjkb990u2r1iuwawdzywu6a85voy0i0q14ssg1f4qwr9iz42yc8ue4979lwvt1t29j65lxtgv4yvuwbmw6egc3vh94wmby2xrf4dcdxmvt8e00ccg3igp4duzmgxi1yawfdm9fc8re60e0qjhoxw4i1");

const getRandomLetter = () => {
    var random = "abcdefghijklmnopqrstuvwxyz0123456789";
    return random.charAt(Math.floor(Math.random() * random.length));
}

const matrixEffect = (randomText: string) => {
    var rand = Math.floor(Math.random() * 100) + 50;
    var location = new Array(rand);

    for (var i = 0; i < rand; i++) {
        location[i] = Math.floor(Math.random() * randomText.length);
    }
    
    let newText = ""; 
    for (var i = 0; i < randomText.length; i++) {
        if (location.includes(i)) {
            newText += getRandomLetter();
        } else {
            newText += randomText[i];
        }
    }

    return newText;
}

const updateRandomTexts = () => {
    randomText1.value = matrixEffect(randomText1.value);
    randomText2.value = matrixEffect(randomText2.value);
    randomText3.value = matrixEffect(randomText3.value);
    randomText4.value = matrixEffect(randomText4.value);
    randomText5.value = matrixEffect(randomText5.value);
    randomText6.value = matrixEffect(randomText6.value);
    randomText7.value = matrixEffect(randomText7.value);
}

const getNextMessage = () => {
    currentMessage = loopMessages[loopIndex];
    //loopIndex = (loopIndex + 1) % loopMessages.length; //for infinite loop
    loopIndex++;

    if (loopIndex <= loopMessages.length) {
        displayedText.value = currentMessage;
    } else {
        endProgram();
    }
}

let loopIntervalId = 0;
let intervalId = 0;
const isRunning = ref(false);

const defaultMessage = "Programming is learned by writing programs.";
const displayedText = ref(defaultMessage);
const loopMessages = ["Plan...", "Code...", "Build...", "Test...", "Deploy...", "Repeat."];
let currentMessage = null;
let loopIndex = 0;

const startProgram = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(updateRandomTexts, 150);
    loopIntervalId = setInterval(getNextMessage, 1000);

    isRunning.value = true;
}

const endProgram = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(updateRandomTexts, 3000);

    clearInterval(loopIntervalId); 
    loopIntervalId = 0;

    displayedText.value = defaultMessage;
    loopIndex = 0;
    currentMessage = null;

    isRunning.value = false;
}

// Scroll Text Reveal Effect
// English splits by grapheme (letter by letter). 
// Thai and Burmese split by word: a per-character split would put vowel/tone marks 
// and stacked consonants in their own spans, away from the letter they attach to, and they render broken.
const storySegments = computed(() => {
    const segmenter = new Intl.Segmenter(locale.value, {
        granularity: locale.value == 'en' ? 'grapheme' : 'word',
    });

    return messages[locale.value].keepCalm.story.map(sentence =>
        Array.from(segmenter.segment(sentence), ({ segment }) => segment)
    );
});

const handleScroll = () => {
    const spanElements = document.querySelectorAll<HTMLSpanElement>('span.scroll-reveal');

    spanElements.forEach((spanElement, index) => {
        const rect = spanElement.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const wordThreshold = (index + 1) / spanElements.length;

            if (scrollProgress >= wordThreshold) {
                spanElement.style.color = 'white';
            } else {
                spanElement.style.color = '';
            }
        } else {
            spanElement.style.color = '';
        }
    })
}

// A language switch re-renders the spans; recolour them for the current scroll position.
watch(locale, () => nextTick(handleScroll));

onMounted(() => {
    intervalId = window.setInterval(updateRandomTexts, 3000);
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    clearInterval(intervalId);
    clearInterval(loopIntervalId);
    window.removeEventListener('scroll', handleScroll);
})
</script>

<template>
    <div class="keep-calm">
        <div id="keep-calm-1" class="parallax-1">
            <Transition :name="isDesktop ? 'fade' : ''">
                <div v-if="activeSection == 'keep-calm-1' || isMobile" class="map-label">
                    <span class="map-label-line"></span>
                    <div class="map-label-text">
                        <span class="map-label-time">{{ bangkokTime }}</span>
                        <span class="map-label-status">
                            <span class="map-label-dot"></span>{{ t('keepCalm.online') }}
                        </span>
                    </div>
                </div>
            </Transition>
        </div>
        <div id="keep-calm-2" class="parallax-2">
            <div v-if="isMobile || typingMessage.isTyping || typingMessage.isAlreadyTyped" :class="{typewriter: typingMessage.isTyping && !isMobile}" class="keep-calm-text">
                <h2>{{ displayedText }}</h2>
                <div class="text-end mt-2 start-stop">
                    <div v-if="!isRunning" @click="startProgram()">Start <Play/></div>
                    <div v-else @click="endProgram()">Stop <Stop/></div>
                </div>
            </div>
            <div class="matrix-effect">
                {{ randomText1 }}
                {{ randomText2 }}
                {{ randomText3 }}
                {{ randomText4 }}
                {{ randomText5 }}
                {{ randomText6 }}
                {{ randomText1 }}
                {{ randomText4 }}
                {{ randomText2 }}
                {{ randomText6 }}
                {{ randomText3 }}
                {{ randomText1 }}
                {{ randomText5 }}
            </div>
        </div>
        <div id="keep-calm-3" class="parallax-3" :style="{ backgroundColor: dynamicBackgroundColor }">
            <div class="description-text">
                <p>
                    <template v-for="(sentence, i) in storySegments" :key="`${locale}-${i}`">
                        <span v-for="(segment, j) in sentence" :key="j" class="scroll-reveal">{{ segment }}</span>
                        <br><br>
                    </template>
                </p>
            </div>
            <div class="animate-box" id="animate-box-1"></div>
            <div class="animate-box" id="animate-box-2"></div>
            <div class="animate-box" id="animate-box-3"></div>
            <div class="animate-box" id="animate-box-4"></div>
            <div class="animate-box" id="animate-box-5"></div>
            <div class="animate-box" id="animate-box-6"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.keep-calm {
    width: 100%;
}

.parallax-1, .parallax-2, .parallax-3 {
    height: 100vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.parallax-1 {
    background-image: url('/world.svg');
    background-size: cover;
    position: relative;

    // On-screen size of one world.svg user unit (the file has no viewBox, so user space
    // is its intrinsic 1009.6727 x 665.96301 box).
    --u: max(calc(100vw / 1009.6727), calc(100vh / 665.96301));
    // Vertical nudge off the computed anchor; tune this, not the 89.618 below.
    --nudge-y: 2%;
}

// Pinned to the Bangkok dot in world.svg (<circle cx="757" cy="422.6">). The map is
// centred, so the dot's offset is constant in user units:
// 757 - 1009.6727/2 = 252.164 across, 422.6 - 665.96301/2 = 89.618 down.
.map-label {
    position: fixed;
    left: calc(50% + 252.164 * var(--u));
    top: calc(50% + 89.618 * var(--u) - var(--nudge-y));
    display: flex;
    align-items: center;
    gap: 0.5rem;
    // Clear the r=8 glow so the leader line starts just outside it.
    margin-left: calc(14 * var(--u));
    z-index: $top-layer;
    pointer-events: none;
}

.map-label-line {
    width: clamp(2rem, calc(70 * var(--u)), 7rem);
    height: 1px;
    background-color: rgba(255, 255, 255, 0.15);
}

.map-label-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: $light-gray;
    white-space: nowrap;
}

.map-label-status {
    display: flex;
    align-items: center;
}

.map-label-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
    margin-right: 0.4rem;
    flex-shrink: 0;
    animation: map-label-blink 2s ease-in-out infinite;
}

@keyframes map-label-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
}

.parallax-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light-black;
}

.parallax-2 .keep-calm-text {
    position: relative;
    z-index: $top-layer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    min-width: 60%;
}

.parallax-2 .keep-calm-text {
    margin: 0;
}

.parallax-2 .matrix-effect {
    position: absolute;
    overflow: hidden;
    width: 100vw;
    z-index: $middle-layer;
    color: $gray;
}

.parallax-2 .start-stop {
    cursor: pointer;
}

.parallax-3 {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background-color $transition-slow;
    overflow: hidden;
}

.parallax-3 .description-text {
    width: 35%;
    text-align: center;
}

.description-text p {
    color: $light-black;
}

.description-text p span {
    font-size: clamp(1rem, 1vw + 0.3rem, 1.2rem); 
}

.parallax-3 .animate-box {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: floating-boxes 20s linear infinite;
}

#animate-box-1 {
    left: 80%;
    width: 100px;
    height: 100px;
    bottom: -100px;
    animation-delay: 0s;
}

#animate-box-2 {
    left: 60%;
    width: 80px;
    height: 80px;
    bottom: -80px;
    animation-delay: 3s;
}

#animate-box-3 {
    left: 15%;
    width: 30px;
    height: 30px;
    bottom: -30px;
    animation-delay: 6s;
}

#animate-box-4 {
    left: 40%;
    width: 130px;
    height: 130px;
    bottom: -130px;
    animation-delay: 10s;
}

#animate-box-5 {
    left: 20%;
    width: 60px;
    height: 60px;
    bottom: -60px;
    animation-delay: 12s;
}

#animate-box-6 {
    left: 30%;
    width: 50px;
    height: 50px;
    bottom: -50px;
    animation-delay: 16s;
}

@media (max-width: 1024px) {
    .parallax-3 .description-text {
        width: 60%;
    }
}

@media (max-width: 768px) {
    .parallax-1 {
        background-size: 150%;
        --u: calc(150vw / 1009.6727);
    }

    // iOS Safari ignores background-attachment: fixed and paints the map into this panel,
    // so the anchor resolves against .parallax-1 (itself 100vw x 100vh). Absolute also
    // stops the always-rendered mobile label from floating over every other section.
    .map-label {
        position: absolute;
    }

    .parallax-2 .keep-calm-text {
        min-width: 100%;
    }

    .parallax-3 .description-text {
        width: 90%;
    }
}
</style>