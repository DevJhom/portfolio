<script setup lang="ts">
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
</script>

<template>
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
    </div>
</template>

<style scoped lang="scss">
.contact {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center ;
    height: 100%;
    width: 100%;
}

.copyright {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
}
</style>
