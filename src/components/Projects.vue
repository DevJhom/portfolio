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
            <div class="card">
                <h3 class="title">Project 1</h3>
                <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
                </div>
            </div>
            <div class="card">
                <h3 class="title">Project 2</h3>
                <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
                </div>
            </div>
            <div class="card">
                <h3 class="title">Project 3</h3>
                <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
                </div>
            </div>
            <div class="card">
                <h3 class="title">Github</h3>
                <div class="bar">
                <div class="emptybar"></div>
                <div class="filledbar"></div>
                </div>
            </div>
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
    border: 1px solid red;
}

.projects-right {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    border: 1px solid red;
}

// Stacked Card
.card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
    margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  width: 0px;
  height: 100%;
  background: $blue;
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 100%;
  transition: 0.4s ease-out;
}

</style>
