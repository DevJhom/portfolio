<script setup lang="ts">
import { ref, computed } from 'vue';
import { isMobile } from '@/helpers/helpers';
import GithubIcon from '@/assets/Icons/GithubIcon.vue';
import OpenWindow from '@/assets/Icons/OpenWindow.vue';

const props = defineProps<{
  activeSection: string
}>();

const isDesktop = computed(() => !isMobile());

const fretwizardUrl = "https://devjhom.github.io/fret-wizard/";
const githubUrl = "https://github.com/DevJhom";

const isHover = ref(false);

const onMouseEnter = () => {
  isHover.value = true;
}

const onMouseLeave = () => {
  isHover.value = false;
}
</script>

<template>
  <Transition :name="isDesktop ? 'fade' : ''">
    <div v-if="props.activeSection == 'projects' || isMobile()" class="projects">
      <div class="projects-left">
        <h2>
          My Personal Projects
        </h2>
        <div class="text-light-gray">These are some of my favorite personal projects.</div>
      </div>
      <div class="projects-right">
        <!-- FRETWIZARD -->
        <div class="card card-fretwizard" :class="{expand: isHover}">
          <div class="card-content" @mouseenter="onMouseEnter()" @mouseleave="onMouseLeave()">
            <a :href="fretwizardUrl" target="_blank">
              <img src="/fretwizard.png" alt="FretWizard" width="100%" height="100%">
            </a>
            <div class="d-flex mt-3">
              <small class="card-badge">Tools</small>
              <small class="card-badge">Guitar</small>
            </div>
            <h4 class="title text-black">FretWizard</h4>
            <small class="text-light-gray">
              FretWizard is an interactive fretboard for visualizing different scales, chords, and patterns across the guitar neck.
            </small>
            <a v-if="isHover" :href="fretwizardUrl" target="_blank">
              <OpenWindow class="open-window"/>
            </a>
          </div>
          <a v-if="!isHover" :href="fretwizardUrl" target="_blank">
            <OpenWindow class="open-window"/>
          </a>
        </div>
        <!-- GITHUB -->
        <div class="card card-github" :class="{shrink: isHover}">
          <div v-if="!isHover" class="card-content">
            <a :href="githubUrl" target="_blank">
              <GithubIcon :width="100" :height="100"/>
            </a>
            <a :href="githubUrl" target="_blank">
              <h4 class="title text-white">DevJhom</h4>
            </a>
            <small class="text-light-gray text-center w-75">
              Please visit my GitHub for more projects.
            </small>
            <a :href="githubUrl" target="_blank">
              <OpenWindow class="open-window" color="#7e7e7e"/>
            </a>
          </div>
        </div>
        <!-- <div class="card">
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
  height: 100%;
  margin: auto;
  padding: 2rem 0;
}

.projects-left {
  width: 30%;
  height: 100%;
}

.projects-right {
  display: flex;
  justify-content: space-around;
  width: 70%;
  height: 100%;
  padding: 0 5%;
}

.card {
  position: relative;
  display: flex;
  left: 0px;
  height: 100%;
  width: 50%;
  min-height: 30rem;
  min-width: 18rem;
  padding: 1rem;
  border-radius: 12px;
  transition: 0.4s ease-out;
}

.card.expand {
  width: 100%;
}

.card.shrink {
  width: 5%;
  min-width: 0;
}

.card-github {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $light-black;
  margin-left: 2rem;
}

.card-github:hover {
  border: 2px solid $blue;
  transform: scale(1.04);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 90%;
}

.card-github .card-content {
  justify-content: center;
  align-items: center;
}

.card img {
  border-radius: 6px;
  cursor: pointer;
}

.card .title {
  font-weight: bold;
  margin-top: 1.5rem;
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

@media (max-width: 768px) { 
  .projects {
    flex-direction: column;
  }

  .projects-left {
    width: 100%;
  }

  .projects-right {
    width: 100%;
    flex-direction: column;
    padding: 0;
  }

  .card {
    min-width: 100%;
    min-height: 15rem;
    margin-top: 2rem;
  }

  .card-github {
    margin-left: 0;
  }
}
</style>
