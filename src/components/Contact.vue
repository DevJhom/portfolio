<script setup lang="ts">
import FacebookIcon from '@/assets/Icons/FacebookIcon.vue';
import GithubIcon from '@/assets/Icons/GithubIcon.vue';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon.vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const copySuccess = ref<boolean>(false);
const currentYear = new Date().getFullYear();

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

// Contact form (sent through Web3Forms)
const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    botcheck: false, // honeypot, bots tick it
});
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle');
let statusTimer: ReturnType<typeof setTimeout> | undefined;

const submitForm = async () => {
    if (status.value === 'sending') return;
    status.value = 'sending';
    clearTimeout(statusTimer);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                subject: 'New message from devjhom.site',
                from_name: `${form.firstName} ${form.lastName}`,
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                message: form.message,
                botcheck: form.botcheck,
            }),
        });
        const result = await response.json();

        if (!result.success) throw new Error(result.message);

        status.value = 'sent';
        form.firstName = '';
        form.lastName = '';
        form.email = '';
        form.message = '';
    } catch (err) {
        console.error('Failed to send message: ', err);
        status.value = 'error';
    }

    statusTimer = setTimeout(() => {
        status.value = 'idle';
    }, 4000);
};

// Spotlight effect
const spotlightSize = 'transparent 150px, #0c0c0c 250px)';
const scrolledViewHeight = 700; //adjust according to number of sections

function updateSpotlight(e: MouseEvent): void {
    const spotlight = document.querySelector('.contact-spotlight') as HTMLElement;
    if (spotlight) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${(e.pageY / window.innerHeight * 100) - scrolledViewHeight}%, ${spotlightSize}`;
    }
}

onMounted(() => {
    window.addEventListener('mousemove', updateSpotlight);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', updateSpotlight);
    clearTimeout(statusTimer);
});
</script>

<template>
    <div class="contact-spotlight"></div>
    <div class="contact">
        <div class="contact-content row g-5">
            <div class="contact-left col-md-6">
                <h2>"Let's Get In Touch!"</h2>
                <p class="text-secondary mt-3">Reach out to me directly via email, or drop me a message using the form.</p>
                <div class="input-group mt-3">
                    <input type="text" class="form-control" placeholder="jhomwan238@gmail.com" aria-label="jhomwan238@gmail.com" readonly>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary copy-btn" type="button" @click="copyToClipboard('jhomwan238@gmail.com')">
                            <div v-if="copySuccess">Copied!</div>
                            <div v-else>Copy</div>
                        </button>
                    </div>
                </div>
            </div>

            <div class="contact-right col-md-6">
                <form @submit.prevent="submitForm">
                    <div class="row g-3 mb-3">
                        <div class="col-sm-6">
                            <input v-model="form.firstName" type="text" class="form-control" placeholder="First Name" aria-label="First name" required>
                        </div>
                        <div class="col-sm-6">
                            <input v-model="form.lastName" type="text" class="form-control" placeholder="Last Name" aria-label="Last name" required>
                        </div>
                    </div>
                    <input v-model="form.email" type="email" class="form-control mb-3" placeholder="Your Email" aria-label="Your Email" required>
                    <textarea v-model="form.message" class="form-control mb-3" rows="5" placeholder="Message" aria-label="Message" required></textarea>
                    <input v-model="form.botcheck" type="checkbox" name="botcheck" class="d-none" tabindex="-1" autocomplete="off">

                    <div class="d-flex align-items-center justify-content-end gap-3">
                        <small v-if="status === 'sent'" class="text-secondary">Thanks! I'll get back to you soon.</small>
                        <small v-if="status === 'error'" class="text-danger">Something went wrong. Please try again or copy my email.</small>
                        <button class="btn btn-outline-light send-btn" type="submit" :disabled="status === 'sending'">
                            <span v-if="status === 'sending'">Sending...</span>
                            <span v-else-if="status === 'sent'">Sent!</span>
                            <span v-else-if="status === 'error'">Try again</span>
                            <span v-else>Send</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <small class="copyright">Copyright &copy; {{ currentYear }} DevJhom</small>
        <div class="social-media">
            <a href="https://www.facebook.com/sai.jhom.wan/" target="_blank">
                <FacebookIcon/>
            </a>
            <a href="https://www.linkedin.com/in/sai-swan-wan-744945205/" target="_blank">
                <LinkedInIcon/>
            </a>
            <a href="https://github.com/DevJhom" target="_blank">
                <GithubIcon/>
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
    height: 100vh;
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

.contact-content {
    width: min(1100px, 90%);
    align-items: center;
}

// Glass card, same style as the .logo card in MainPage.vue
.contact-right form {
    padding: 1.5rem;
    border-radius: $radius-md;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

    .form-control {
        background-color: $light-black;
        border-color: $gray;
        color: $white;
        transition: border-color $transition-fast;

        &::placeholder {
            color: $light-gray;
        }

        &:focus {
            border-color: $blue;
            box-shadow: none;
        }
    }

    textarea {
        resize: none;
    }
}

.send-btn {
    border-radius: $radius-sm;
    min-width: 110px;
    transition: $transition-fast;
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

.copy-btn {
    border-radius: 0 $radius-sm $radius-sm 0;
    min-width: 90px;
}

@media (max-width: 768px) {
    .contact {
        height: auto;
        min-height: 100vh;
        padding: 4rem 0 6rem;
    }
}
</style>
