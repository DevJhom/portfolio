<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
</script>

<template>
    <div class="my-container">
        <NavBar />
        <div id="home">
            <section>
                Hello! I'm Jhom.
                <br>
                I'm a software developer. (typing animation)
            </section>
        </div>
        <div id="about-me">
            <section>
                About Me
            </section>
        </div>
        <div id="tech-stack">
            <section>
                Tech Stack
            </section>
        </div>
        <div class="keep-calm">
            Keep Calm and Code On.
        </div>
        <div id="projects">
            <section>
                Projects
            </section>
        </div>
        <div id="contact">
            <section>
                Contact
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
section {
    border: 1px solid blue;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.my-container {
    position: relative;
}

.keep-calm {
    height: 50vh;
}
</style>
