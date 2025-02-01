<script setup lang="ts">
import FacebookIcon from '@/assets/Icons/FacebookIcon.vue';
import GithubIcon from '@/assets/Icons/GithubIcon.vue';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon.vue';
import { ref } from 'vue';

const copySuccess = ref<boolean>(false);

const copyToClipboard = async (text: string) => {
    try {

    await navigator.clipboard.writeText(text);
    copySuccess.value = true;

    setTimeout(() => {
        copySuccess.value = false;
    }, 1000);

    } catch (err) {
        console.error('Failed to copy email: ', err);
    }
};

// Spotlight effect
window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.contact-spotlight') as HTMLElement;
    let spotlightSize: string = 'transparent 150px, #0c0c0c 250px)';
    const scrolledViewHeight = 700; //adjust according to number of sections

    window.addEventListener('mousemove', (e: MouseEvent) => updateSpotlight(e));

    function updateSpotlight(e: MouseEvent): void {
        if (spotlight) {
            spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${(e.pageY / window.innerHeight * 100) - scrolledViewHeight}%, ${spotlightSize}`;
        }
    }
});
</script>

<template>
    <div class="contact-spotlight"></div>
    <div class="contact">
        <h2>"Let's Get In Touch!"</h2>
        <div class="mt-3">
            <div class="input-group">
            <input type="text" class="form-control" placeholder="jhomwan238@gmail.com" aria-label="jhomwan238@gmail.com" readonly>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="copyToClipboard('jhomwan238@gmail.com')">
                    <div v-if="copySuccess">Copied!</div>
                    <div v-else>Copy</div>
                </button>
            </div>
            </div>
        </div>
        <small class="copyright">Copyright &copy; 2025 DevJhom</small>
        <div class="social-media">
            <a href="https://www.facebook.com" target="_blank">
                <FacebookIcon/>
            </a>
            <a href="https://www.linkedin.com/in/sai-swan-wan-744945205/" target="_blank">
                <LinkedInIcon/>
            </a>
            <a href="https://github.com/DevJhom" target="_blank">
                <GithubIcon :width="24" :height="24"/>
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contact {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: $middle-layer;
}

.contact-spotlight {
    z-index: $bottom-layer;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: radial-gradient($black, $black, $black);
}

.copyright {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
}

.social-media {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
}

button {
    border-radius: 0 6px 6px 0;
    min-width: 90px;
}
</style>
