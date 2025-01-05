<script setup lang="ts">
</script>

<template>
    <div class="projects">
        <div class="projects-left">
            <h2>
                My Personal Projects
            </h2>
            <div>These are some of my favorite personal projects.</div>
        </div>
        <div class="projects-right">

        </div>
    </div>
</template>

<style scoped lang="scss">
// Tech Stack
.projects {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75%;
    margin: auto;
    padding: 2rem 0;
}

.projects-left {
    width: 30%;
    height: 100%;
}

.projects-right {
    width: 70%;
    height: 100%;
}
</style>
