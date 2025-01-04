<script setup lang="ts">
import { ref } from 'vue';

const displayLoading = ref(true);

setTimeout(() => {
    displayLoading.value = false;
}, 1000);

</script>

<template>
    <div v-if="displayLoading" class="loading-container">
        <span class="loading"></span>
        <span class="mt-2">
            DevJhom
        </span>
    </div>
</template>

<style scoped>
.loading-container {
    z-index: 100;
    background-color: #242424;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.loading {
    align-items: center;
    width: 80px;
    aspect-ratio: 1;
    border: 10px solid #0000;
    padding: 5px;
    box-sizing: border-box;
    background:
        radial-gradient(farthest-side, #fff 98%, #0000) 0 0/20px 20px no-repeat,
        conic-gradient(from 90deg at 10px 10px, #0000 90deg, #fff 0) content-box,
        conic-gradient(from -90deg at 40px 40px, #0000 90deg, #fff 0) content-box,
        #000;
    filter: blur(4px) contrast(10);
    animation: loading-animation 2s infinite;
}

@keyframes loading-animation {
    0% {
        background-position: 0 0
    }

    25% {
        background-position: 100% 0
    }

    50% {
        background-position: 100% 100%
    }

    75% {
        background-position: 0% 100%
    }

    100% {
        background-position: 0% 0
    }
}
</style>
