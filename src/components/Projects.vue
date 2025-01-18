<script setup lang="ts">
const props = defineProps<{
    activeSection: string
}>();
</script>

<template>
    <Transition name="slide-fade">
      <div v-if="props.activeSection == 'projects'" class="projects">
          <div class="projects-left">
              <h2>
                  My Personal Projects
              </h2>
              <div class="text-light-gray">These are some of my favorite personal projects.</div>
          </div>
          <div class="projects-right">
              <div class="card">
                  <h3 class="title">FretWizard</h3>
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
  padding: 0 10%;
  display: flex;
  justify-content: space-around;
}

// Stacked Card
.card {
  display: flex;
  height: 100%;
  width: 50%;
  min-height: 420px; 
  min-width: 300px;
  background-color: $light-black;
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
