<script setup lang="ts">
import OpenWindow from '@/assets/Icons/OpenWindow.vue';

const props = defineProps<{
  activeSection: string
}>();
</script>

<template>
  <Transition name="fade">
    <div v-if="props.activeSection == 'projects'" class="projects">
      <div class="projects-left">
        <h2>
          My Personal Projects
        </h2>
        <div class="text-light-gray">These are some of my favorite personal projects.</div>
      </div>
      <div class="projects-right">
        <div class="card">
          <img src="/fretwizard.png" alt="FretWizard">
          <div class="d-flex mt-3">
            <small class="card-badge">Tools</small>
            <small class="card-badge">Guitar</small>
          </div>
          <h4 class="title mt-3">FretWizard</h4>
          <small class="description">FretWizard is an interactive fretboard for visualizing different scales, chords, and patterns across the guitar neck.</small>
          <OpenWindow class="open-window"/>
        </div>
        <!-- <div class="card">
          <h3 class="title">Working On</h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>
        </div> -->
      </div>
    </div>
  </Transition>
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
  padding: 0 5%;
  display: flex;
  justify-content: space-around;
}

// Stacked Card
.card {
  position: relative;
  display: flex;
  left: 0px;
  height: 100%;
  width: 50%;
  min-height: 420px;
  min-width: 300px;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
}

.card:not(:first-child) {
  margin-left: -25px;
}

.card:hover {
  width: 100%;
}

// .card:hover~.card {
//   display: none;
//   position: relative;
//   left: 50px;
//   transition: 0.4s ease-out;
// }

.card img {
  border-radius: 6px;
  cursor: pointer;
}

.card .title {
  font-weight: bold;
}

.card .description {
  color: $light-gray;
}

.card .card-badge {
  color: $white;
  background-color: $fretwizard-yellow;
  border-radius: 6px;
  padding: 0 0.25rem;
  margin-right: 0.25rem;
}

.card .open-window {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
}

.bar {
  position: absolute;
  top: 70px;
  height: 5px;
  width: 100%;
  margin-left: -1px;
}

.emptybar {
  background-color: $gray;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  width: 0px;
  height: 100%;
  background-color: $light-gray;
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 100%;
  transition: 0.4s ease-out;
}
</style>
