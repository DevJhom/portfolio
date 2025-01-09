<script setup lang="ts">
</script>

<template>
    <div class="grid-container">
        <div class="grid-item my-location">
            <span class="text-light-gray">
                I'm from 
                <br>
                Yangon, Myanmar (Burma)
            </span>
            <span class="text-light-gray">
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
        <div class="grid-item social-media-card">
            <div class="social-media">
                <!-- Facebook -->
                <svg viewBox="0 0 128 128" width="150" height="150">
                    <rect fill="#3d5a98" x="4.83" y="4.83" width="118.35" height="118.35" rx="6.53" ry="6.53"></rect><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"></path>
                </svg>
            </div>
            <div class="add-social-media">
                Add Friend
            </div>
            <!-- LinkedIn -->
            <!-- <svg viewBox="0 0 128 128">
                <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"></path><path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"></path>
            </svg> -->
        </div>
        <div class="grid-item">
            <h5>Coding with Passion</h5>
            <span class="text-light-gray">
                I'm passionate about coding and problem-solving, approaching each project with a creative mindset, a strong dedication and a commitment to writing clean, maintainable codes.
            </span>
        </div>
        <div class="grid-item"></div>
    </div>
</template>

<style scoped lang="scss">
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
    border: 1px solid $blue;
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
    background-image: url("../images/sourcecodes-css.PNG");
    background-size: cover;
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

.my-location {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.social-media-card {
    padding: 0;
}

.social-media {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
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

</style>
