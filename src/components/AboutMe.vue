<script setup lang="ts">
import { computed, ref } from 'vue';
import { isMobile } from '@/helpers/helpers';
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
                                I'm Sai Swan Wan, a software developer from Myanmar (Burma).
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="location-card-bottom">
                            <h4> Currently, </h4>
                            <small class="text-light-gray mt-4">
                                I'm based in Bangkok, Thailand. <br><br>
                                I mainly specialize in Web Application Development.
                            </small>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="location-card-next">
                            <h4> Career Path </h4>
                            <small class="text-light-gray mt-4">
                                I'm comfortable working both remotely and on-site. <br><br>
                                I'm flexible, adventurous and always ready to embrace new career challenges.
                            </small>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Transition>

        <Transition :name="isDesktop ? 'slide-fade-top' : ''">
            <div v-show="sectionIsActive || !isDesktop" class="grid-item description-card">
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
            <img src="/letter-j.png" alt="DevJhom Logo">
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
                            <h3 class="text-vs-dark-blue">
                                &lt;&#47;&#62;
                            </h3>
                            <span>
                                Sai Swan Wan
                            </span>
                            <span>
                                Software Developer
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="business-card-back">
                            <small class="text-vs-purple file-name">
                                business-card.css
                            </small>
                            <small><span class="text-vs-yellow">.contact-info </span><span class="text-vs-yellow">&#123;</span></small>
                            <small class="ms-4"><span class="text-vs-blue">name:</span><span class="text-vs-orange"> Sai Swan Wan</span></small>
                            <small class="ms-4"><span class="text-vs-blue">title:</span><span class="text-vs-orange"> Software Developer</span></small>
                            <small class="ms-4"><span class="text-vs-blue">phone:</span><span class="text-vs-green"> +66 98 931 8198</span></small>
                            <small class="ms-4"><span class="text-vs-blue">email:</span><span class="text-vs-green"> jhomwan238@gmail.com</span></small>
                            <small class="ms-4"><span class="text-vs-blue">website:</span><span class="text-vs-green"> https://www.devjhom.com</span> </small>
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
    border-radius: 12px;
    padding: 2rem;
    transition: transform 0.3s ease;
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

.location-card-top {
    background: url('/myanmar.svg') no-repeat center;
    background-size: contain;
}

.location-card-bottom {
    background: url('/thailand.svg') no-repeat center;
    background-size: contain;
    background-color: $light-black;
}

.location-card-next {
    background: url('/street-map.svg') no-repeat center;
    background-size: cover;
}

// 2. description-card
.description-card {
    background-image: url("/my-picture.jpg");
    background-size: auto 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
}

.description-card:hover {
    background-color: $blue;
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

@keyframes background-gradient {
    0% { background-position: 0; }
    100% { background-position: -200%; }
}

// 4. social-media-card
.social-media-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0;
}

.social-media-card:hover {
    border: 0;
}

.social-media-card img {
    height: 70%;
    aspect-ratio: 1;
}

// 5. passion-card
@keyframes animate {
    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }
    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
}

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
    animation: animate 20s linear infinite;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.business-card-back {
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

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
    .grid-item {
        grid-column: 1 / span 1 !important;
        grid-row: auto !important;
        min-height: 340px;
    }

    .description-card {
        background-position: -100px 0;
    }
}
</style>
