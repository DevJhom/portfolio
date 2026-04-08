<script setup lang="ts">
import { computed, ref } from 'vue';
import { isMobile } from '@/helpers/helpers';
import FacebookIcon from '@/assets/Icons/FacebookIcon.vue';
import GithubIcon from '@/assets/Icons/GithubIcon.vue';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFlip, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-flip';

const props = defineProps<{
    activeSection: string
}>();

const sectionIsActive = computed(() => {
    return props.activeSection == "about-me";
});

const isDesktop = computed(() => !isMobile());
const businessCard = ref<typeof Swiper | null>(null);
const modules_location = [Navigation, Pagination, Autoplay];
const modules_business_card = [EffectFlip];

const onSwiper = (swiper: any) => {
    businessCard.value = swiper
}

const onHoverBusinessCard = () => {
    businessCard.value?.slidePrev();
}

</script>

<template>
    <div class="grid-container">
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
                        <div class="location-card-top">
                            <h4> About Me </h4>
                            <small class="text-light-gray mt-4">
                                Hi there! 👋 <br><br>
                                I'm <span class="text-white">DevJhom</span>, a Software Developer from <span class="text-white">Myanmar</span> (Burma).
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="location-card-bottom">
                            <h4> Currently, </h4>
                            <small class="text-light-gray mt-4">
                                I'm based in <span class="text-white">Bangkok</span>, Thailand. <br><br>
                                I mainly specialize in <span class="text-white">Web Application Development.</span>
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="location-card-next">
                            <h4> Career Path </h4>
                            <small class="text-light-gray mt-4">
                                I'm comfortable working both <span class="text-white">remotely and on-site</span>. <br><br>
                                I'm flexible, adventurous and always ready to embrace <span class="text-white">new career challenges</span>.
                            </small>
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
                <span>
                    <h3> 3+ </h3> years experience <br> in Web Application Development.
                </span>
            </div>
        </Transition>

        <div class="grid-item social-media-card">
            <div class="my-logo"></div>
        </div>

        <Transition :name="isDesktop ? 'slide-fade-right' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item passion-card">
                <div class="animate-box" id="animate-box-1"></div>
                <div class="animate-box" id="animate-box-2"></div>
                <div class="animate-box" id="animate-box-3"></div>
                <div class="animate-box" id="animate-box-4"></div>
                <div class="animate-box" id="animate-box-5"></div>

                <h4>Coding with Passion</h4>
                <span class="text-light-gray">
                    I'm passionate about coding and problem-solving, approaching each project with a creative mindset, a strong dedication and a commitment to writing clean, maintainable codes.
                </span>
            </div>
        </Transition>

        <Transition :name="isDesktop ? 'slide-fade-left' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item style-card">
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
                                <b>Software Developer</b>
                            </small>
                            <small class="swipe">
                                <i>Swipe >>></i>
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="business-card-back">
                            <small class="text-vs-purple file-name">
                                business-card.info
                            </small>
                            <small><span class="text-vs-yellow">.contact </span><span class="text-vs-yellow">&#123;</span></small>
                            <small class="ms-4"><span class="text-vs-blue">name:</span><span class="text-vs-orange"> Mr. Sai Swan Wan</span></small>
                            <small class="ms-4"><span class="text-vs-blue">position:</span><span class="text-vs-orange"> Software Developer</span></small>
                            <small class="ms-4"><span class="text-vs-blue">mobile:</span><span class="text-vs-green"> +66 98 931 8198</span></small>
                            <small class="ms-4"><span class="text-vs-blue">email:</span><span class="text-vs-green"> jhomwan238@gmail.com</span></small>
                            <small class="ms-4"><span class="text-vs-blue">website:</span><span class="text-vs-green"> https://devjhom.site</span> </small>
                            <small class="text-vs-yellow">&#125;</small>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1.5rem;
    width: 75%;
    max-height: 100%;
    padding: 1rem 0;
}

.grid-item {
    max-width: 100%;
    max-height: 100%;
    border: 1px solid $gray;
    border-radius: $radius-md;
    padding: 2rem;
    transition: transform $transition-fast;
    min-height: 200px;
}

.grid-item:hover {
    border: 2px solid $blue;
    transform: scale(1.04);
}

.grid-item:nth-child(1):hover { //adding border causes svg to shake
    border: 1px solid $gray;
    outline: 2px solid $blue;
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
}

.location-card-top, .location-card-bottom, .location-card-next {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 1rem;
    color: $white;
}

.location-card-top, .location-card-bottom {
    background-image: none;
    background-color: transparent;
    background-size: 80%;
    background-position: 50% 50%;
    background-repeat: no-repeat; 

    transition:
        background-color $transition-fast,
        background-position $transition-fast,
        background-size $transition-fast;
}

// .location-card-top:hover 
.grid-item:nth-child(1):hover .location-card-top { 
    background-image: url('/myanmar.svg');
    background-size: 50%;
    background-position: 75% 25%;
}

// .location-card-bottom:hover {
.grid-item:nth-child(1):hover .location-card-bottom { 
    background-image: url('/thailand.svg'); 
    background-size: 50%;
    background-position: 75% 25%;
    background-color: $light-black;
}

.location-card-next {
    background: url('/street-map.svg') no-repeat center;
    background-size: cover;
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

.description-card:hover {
    background-color: $blue;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-right: 0.5rem;
    opacity: 0;
    transform: translateX(10px);
    transition: opacity $transition-fast, transform $transition-fast;
}

.description-card:hover .social-links {
    opacity: 1;
    transform: translateX(0);
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
    // background-color: $light-black;

    background: linear-gradient(to right, $light-gray 0, white 10%, $light-gray 20%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    animation-fill-mode: forwards;
    animation: background-gradient 4s infinite linear;
}

// 4. social-media-card
.social-media-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0;
}

.social-media-card .my-logo {
    position: relative;
    width: 75%;
    height: 75%;
    overflow: hidden;
    cursor: pointer;
}

.social-media-card .my-logo::before,
.social-media-card .my-logo::after {
    content: "";
    position: absolute;
    inset: 0;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.6s ease, opacity 0.6s ease;
}

// Logo (default)
.social-media-card .my-logo::before {
    background-image: url("/letter-j.png");
    z-index: 1;
}

// Photo (revealed on hover)
.social-media-card .my-logo::after {
    background-image: url("/my-picture.jpg");
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 0.6s ease;
    z-index: 2;
}

.social-media-card .my-logo:hover::before {
    transform: scale(0.8);
    opacity: 0;
}

.social-media-card .my-logo:hover::after {
    clip-path: circle(75% at 50% 50%);
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

.passion-card:hover .animate-box {
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
    color: $gray;
}

.business-card-back {
    background-image: $pattern-1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 1rem;
    width: 100%;
    height: 100%;
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

    .grid-item:nth-child(3) {
        min-height: 180px;
    }

    .grid-item:nth-child(4) {
        min-height: 180px;
    }

    .description-card {
        background-position: -100px 0;
    }

    .social-links {
        display: none;
    }
}
</style>
