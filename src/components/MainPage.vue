<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
</script>

<template>
    <div class="border border-danger my-container">
        <NavBar />
        <div>
            <section>
                Welcome! I'm Jhom.
                <br>
                I'm a software developer. (typing)
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
    border: 1px solid yellow;
    width: 100vw;
    height: 100vh;
}

.my-container {
    position: relative;
}

.keep-calm {
    height: 50vh;
}
</style>
