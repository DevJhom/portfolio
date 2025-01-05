<script setup lang="ts">
</script>

<template>
    <div class="grid-container">
        <div class="grid-item my-location">
            <span>
                I'm from 
                <br>
                Yangon, Myanmar (Burma)
            </span>
            <span>
                I'm currently based in
                <br>
                Bangkok, Thailand
            </span>
        </div>
        <div class="grid-item">
        </div>
        <div class="grid-item">
            I have 3 years of hands-on experience in web application development.
        </div>
        <div class="grid-item">
            Social Media
            < > 
            <!-- 
                Click left/right to alternate between
                1. Facebook
                2. Instagram
                3. LINKEDIN
             -->
        </div>
        <div class="grid-item">
            <h5>Coding with Passion</h5>
            I'm passionate about coding and problem-solving, approaching each project with a creative mindset, a strong dedication and a commitment to writing clean, maintainable codes.
        </div>
        <div class="grid-item">
        </div>
    </div>
</template>

<style scoped lang="scss">
.my-location {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto;
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
    border: 1px solid blue;
    transform: scale(1.04);
}

.grid-item:nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
}

.grid-item:nth-child(2) {
    grid-column: 2 / span 2;
    grid-row: 1 / span 1;
    background-color: $gray;
}

.grid-item:nth-child(3) {
    grid-column: 4 / span 1;
    grid-row: 1 / span 1;
}

.grid-item:nth-child(4) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
}

.grid-item:nth-child(5) {
    grid-column: 3 / span 2;
    grid-row: 2 / span 3;
}

.grid-item:nth-child(6) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 2;
    background-color: $gray;
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
</style>
