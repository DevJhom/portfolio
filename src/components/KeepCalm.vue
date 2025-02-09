<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
    activeSection: string
}>();

// Typing "Keep Calm and Code On."
const typeKeepCalm = reactive({
    isTyping: false,
    isAlreadyTyped: false
});

const dynamicBackgroundColor = ref('#0c0c0c');

watch(() => props.activeSection, (newSection) => {
    if (newSection == 'keep-calm-2' && !typeKeepCalm.isAlreadyTyped) {
        typeKeepCalm.isTyping = true;
        setTimeout(() => {
            typeKeepCalm.isTyping = false;
            typeKeepCalm.isAlreadyTyped = true;
        }, 2000)
    }

    if (newSection == 'keep-calm-3') {
        dynamicBackgroundColor.value = '#1F51FF';
    } else {
        dynamicBackgroundColor.value = '#0c0c0c';
    }
});

function isMobile() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

// Matrix Effect
const randomText1 = ref("n8laig5ym1gemy1m1et2i6uld5wbjsw59cdoukul1jvzmfg3vmg1z6r7nd29xblm0sfyqxxr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsdr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsderu24jxpdpmvne24hd3rd4rs");
const randomText2 = ref("18d1aki40j4qmnum1csyq6kun2erxpxwfo1o5hkdaibg0v8ukxn69yzf6pffyaldroi14sufpi2iswtwxo6qiz5zgwgfzkf1833pyzyzy0ti9psnr0wyi2vns97gifhonivjno5ysdhsq3mrym7e169du86y5sj2bvphrfm3rtpw1w9ja30ary1je5gckho4bv0qmbdjgys8ysd88mtyjxphde6cw4bze03r45s");
const randomText3 = ref("3q5774z41cl2sdga6p80zdpshooxaqaouspo5qnljsbg0w5hk9nv5yzcjm1uy1rvi9kxgoso6g7ikp4zxo1q4zt7gpvfqa32d1pciq38ynvgb0j7rqqt6cemyb67k0xsn9iq0yxekdw4v3mnkiz1aqjbr9tzb1jxpmuhmi53zjp318uj9fgqceqlhtgcrsm2h9tmshgai2o453d69edbj3c006cd1bz8odeoq5b");
const randomText4  = ref("x83oepul5l1k4bhs17kjvt1dh5qinagu4choqpo1lovvtj83hiqgez3rr17jid81d777ekt9u319wtk9e9twjmhfda1edxogs1vtwa5s6wcv73tugk0gy5aajcia2739fedtufoj6jzsswpv1vjg1nx7ls975t866u1l42t0podmt02p02mpgwofm53mkc6mg1ea73mnabayzqiyjtg6qt94hfrgzv5t2ea1uwr");
const randomText5  = ref("n8oaiumym1gjqnuly7q2v6vy35hbis479c9ookmh1p0zp1uhdm21m67eni29nb26d5fgqih4278b3bpg9ofs4lm7esvi5w1hdgeswoclvqruf8sq5u03wvxeww4cqdq0jti27hbgtndyt4tve4oreofnl1278sbn1bgba0v9gj8a7w063e4ycui8dpxfcc2vvye1jfdccy2eisd8fi2hjxcd9mvne2i5z3xdh2s");
const randomText6  = ref("n8oakuayo1yj2nulyoqgv6vyg5h9at4d9fxookmu1w0931utdo23b6xeei29zbe9d5fgui829w81yb1g8ovs4lmw2ssi5w1jdol5wo4lyq6u18gl53snezhkqw49qa42j1i28hbgtnsrt4t26j3reofsl1a3u9bd1bgi70vtw6f07tnn3e4ycdi8dtgecc2vvue1p4dcxy2mi1lowadhjqci9ev3e2i5zcx7h4s");
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

let intervalId = setInterval(updateRandomTexts, 500);

const mouseEnter = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(updateRandomTexts, 150);
}

const mouseLeave = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(updateRandomTexts, 500);
}

// Scroll Text Reveal Effect
const paragraph: Ref<string> = ref("I am a passionate developer who thrives on blending creativity with technology to craft innovative solutions. Whether it’s writing clean, efficient code or tackling complex problems, I enjoy transforming ideas into impactful digital experiences. With a strong foundation in full-stack development, I aim to deliver work that is both functional and engaging.");
const characters: Ref<string[]> = ref([]);

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

onMounted(() => {
    characters.value = paragraph.value.split('');
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

<template>
    <div class="keep-calm">
        <div id="keep-calm-1" class="parallax-1"></div>
        <div id="keep-calm-2" class="parallax-2" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
            <div v-if="isMobile() || typeKeepCalm.isTyping || typeKeepCalm.isAlreadyTyped" :class="{typewriter: typeKeepCalm.isTyping && !isMobile()}" class="keep-calm-text"> 
                <h2>Programming is learned by writing programs.</h2>
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
                    <span v-for="(char, index) in characters" :key="index" class="scroll-reveal">
                        {{ char }}<br v-if="char == '.'"><br v-if="char == '.'">
                    </span>
                </p>
            </div>
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

.parallax-3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background-color 1s ease;
}

.parallax-3 .description-text {
    width: 35%;
    font-size: 1.25rem;
    text-align: center;
}

.description-text p {
    color: $light-black;
}

.description-text p span {
    font-size: clamp(0.8rem, 1vw + 0.2rem, 1.2rem); 
}

@media (max-width: 768px) { 
    .parallax-3 .description-text {
        width: 90%;
    }
}
</style>