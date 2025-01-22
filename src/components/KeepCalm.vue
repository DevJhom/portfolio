<script setup lang="ts">
import { watch, reactive, ref } from 'vue';

const props = defineProps<{
    activeSection: string
}>();

// Typing "Keep Calm and Code On."
const typeKeepCalm = reactive({
    isTyping: false,
    isAlreadyTyped: false
});

watch(() => props.activeSection, (newSection) => {
    if (newSection == 'keep-calm-2' && !typeKeepCalm.isAlreadyTyped) {
        typeKeepCalm.isTyping = true;
        setTimeout(() => {
            typeKeepCalm.isTyping = false;
            typeKeepCalm.isAlreadyTyped = true;
        }, 2000)
    }
});

// Matrix Effect
const randomParagraph = ref("n8laig5ym1gemy1m1et2i6uld5wbjsw59cdoukul1jvzmfg3vmg1z6r7nd29xblm0sfyqxxr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsdr24uvj4ugkofnic578si5685h8ggu5ocl7wns3esq7u0ujpxewc2oqyejjtd17b2xtsderu24jxpdpmvne24hd3rd4rs");

const getRandomLetter = () => {
    var random = "abcdefghijklmnopqrstuvwxyz0123456789";
    return random.charAt(Math.floor(Math.random() * random.length));
}

const matrixEffect = () => {
    var rand = Math.floor(Math.random() * 100) + 50;
    var location = new Array(rand);

    for (var i = 0; i < rand; i++) {
        location[i] = Math.floor(Math.random() * randomParagraph.value.length);
    }

    let newText = ""; 
    for (var i = 0; i < randomParagraph.value.length; i++) {
        if (location.includes(i)) {
            newText += getRandomLetter();
        } else {
            newText += randomParagraph.value[i];
        }
    }

    randomParagraph.value = newText;
}

let intervalId = setInterval(matrixEffect, 500);

const mouseEnter = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(matrixEffect, 100);
}

const mouseLeave = () => {
    clearInterval(intervalId); 
    intervalId = setInterval(matrixEffect, 500);
}
</script>

<template>
    <div>
        <div id="keep-calm-1" class="parallax-1"></div>
        <div id="keep-calm-2" class="parallax-2" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
            <div class="matrix-effect">
                {{ randomParagraph }}
            </div>
            <div v-if="typeKeepCalm.isTyping || typeKeepCalm.isAlreadyTyped" :class="{typewriter: typeKeepCalm.isTyping}" class="animate-on-hover">
                <h2>Keep Calm and Code On.</h2>
            </div>
        </div>
        <div id="keep-calm-3" class="parallax-3"></div>
    </div>
</template>

<style scoped lang="scss">
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
    background-color: $light-black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.parallax-3 {
    background-color: $gray;
}

.parallax-2 .matrix-effect {
    text-wrap: wrap;
    word-break: break-all;
    color: $gray;
}
</style>