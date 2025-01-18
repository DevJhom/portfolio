<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    activeSection: string
}>();

const sectionIsActive = computed(() => {
    return props.activeSection == "about-me";
});
</script>

<template>
    <div class="grid-container">
        <Transition name="slide-fade-left">
            <div v-show="sectionIsActive" class="grid-item location-card">
                <div class="location-card-top">
                    <small>
                        I'm from  {{ props.activeSection }}
                        <br>
                        Yangon, Myanmar (Burma)
                    </small>
                    <br>
                    <small class="text-light-gray location-description-top">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </small>
                </div>
                <div class="location-card-bottom">
                    <small class="location-card-bottom-title">
                        I'm currently based in
                        <br>
                        Bangkok, Thailand
                    </small>
                    <small class="text-light-gray location-description-bottom">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </small>
                </div>
            </div>
        </Transition>

        <Transition name="slide-fade-top">
            <div v-show="sectionIsActive" class="grid-item description-card">
            </div>
        </Transition>

        <Transition name="slide-fade-right">
            <div v-show="sectionIsActive" class="grid-item experience-card">
                <span>
                    <h3> 3+ </h3> years experience <br> in Web Application Development.
                </span>
            </div>
        </Transition>

        <div class="grid-item social-media-card">
            <!-- <div class="social-media"> -->
                <!-- Facebook -->
                <!-- <svg viewBox="0 0 128 128">
                    <rect fill="#3d5a98" x="4.83" y="4.83" width="118.35" height="118.35" rx="6.53" ry="6.53"></rect><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"></path>
                </svg> -->
            <!-- </div> -->
            <!-- <div class="add-social-media">
                Add Friend
            </div> -->
            <!-- LinkedIn -->
            <!-- <svg viewBox="0 0 128 128">
                <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"></path><path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"></path>
            </svg> -->
        </div>

        <Transition name="slide-fade-right">
            <div v-show="sectionIsActive" class="grid-item passion-card">
                <div class="animate-box" id="animate-box-1"></div>
                <div class="animate-box" id="animate-box-2"></div>
                <div class="animate-box" id="animate-box-3"></div>
                <div class="animate-box" id="animate-box-4"></div>
                <div class="animate-box" id="animate-box-5"></div>

                <h5>Coding with Passion</h5>
                <span class="text-light-gray">
                    I'm passionate about coding and problem-solving, approaching each project with a creative mindset, a strong dedication and a commitment to writing clean, maintainable codes.
                </span>
            </div>
        </Transition>

        <Transition name="slide-fade-left">
            <div class="grid-item style-card"></div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 2rem;
    width: 75%;
    height: 90%;
}

.grid-item {
    border: 1px solid $gray;
    border-radius: 12px;
    padding: 2rem;
    transition: transform 0.3s ease;
}

.grid-item:hover {
    border: 2px solid $blue;
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
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
    .grid-item {
        grid-column: 1 / span 1 !important;
        grid-row: auto !important;
    }
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

.location-card-top {
    position: relative;
    height: 30%;
    padding: 1rem;
    transition: all 0.5s ease;
    background-color: $light-black;
}

.location-card-bottom {
    position: relative;
    height: 70%;
    padding: 1rem;
    transition: all 0.5s ease;
    background-color: $gray2;
    z-index: $top-layer;
}

// 1. location-card - on hover
.location-card-top:hover {
    background: url('/myanmar.svg') no-repeat center;
    background-size: contain;
    height: 100%;
}

.location-card-bottom:hover {
    height: 100%;
}

.location-card-bottom::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0%;
    height: 0%;
    background: url('/thailand.svg') no-repeat center;
    background-size: contain;
    transition: all 0.5s ease; 
    z-index: $middle-layer;
}

.location-card-bottom:hover::after {
    width: 100%;
    height: 100%;
}

.location-card:has(.location-card-top:hover) .location-card-bottom {
    height: 0;
    opacity: 0;
    padding: 0;
}

.location-card:has(.location-card-bottom:hover) .location-card-top {
    padding: 0;
    height: 0;
    opacity: 0;
}

// 1. location-card - description
.location-description-top, .location-description-bottom {
    position: relative;
    display: none;
    margin-top: 10%;
    z-index: $top-layer;
}

.location-card-bottom-title {
    position: relative;
    display: flex;
    align-items: end;
    height: 100%;
    z-index: $top-layer;
}

.location-card:has(.location-card-top:hover) .location-description-top {
    display: block;
}

.location-card:has(.location-card-bottom:hover) .location-description-bottom {
    display: block;
}

.location-card:has(.location-card-bottom:hover) .location-card-bottom-title {
    align-items: start;
    height: auto;
}

// 2. description-card
.description-card {
    background-color: $light-black;
}

// 3. experience-card
.experience-card {
    padding: 1rem;
    background-color: $gray2;
}

// 4. social-media-card
.social-media-card {
    background: url('/letter-j.png') no-repeat center;
    background-size: calc(100% + 10px);
    border: 0;
}

.social-media {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.add-social-media {
    display : flex;
    justify-content: center;
    align-items : center;
    height: 20%;
    width: 100%;
    border-radius: 0 0 12px 12px;
    font-size: 1.2rem;
    background-color: $facebook-blue;
    cursor: pointer;
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
    background-color: $black;
    background-image: url("/sourcecodes-css.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
}
</style>
