<template>
  <div 
    class="progress-bar-container"
    :class="{ 'completed': isCompleted, 'clickable': isCompleted }"
    @click="handleClick"
  >
    <div class="progress-bar">
      <div 
        class="progress-fill"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <div class="progress-text">
      <span v-if="!isCompleted">{{ progressPercentage }} %</span>
      <span v-else class="completed-text">Gewonnen</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'

const quizStore = useQuizStore()

const emit = defineEmits(['completed-click'])

const progressPercentage = computed(() => quizStore.progressPercentage)
const isCompleted = computed(() => progressPercentage.value === 100)

function handleClick() {
  if (isCompleted.value) {
    emit('completed-click')
  }
}
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
  max-width: 37.5rem;
  margin: 0 auto 1.25rem;
  position: relative;
  transition: transform 0.2s;
}

.progress-bar-container.clickable {
  cursor: pointer;
}

.progress-bar-container.clickable:hover {
  transform: scale(1.02);
}

.progress-bar-container.clickable:active {
  transform: scale(0.98);
}

.progress-bar {
  width: 100%;
  height: 2.5rem;
  background-color: var(--image-bg);
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: var(--text-white);
  transition: width 0.5s ease, background-color 0.3s ease;
  border-radius: 1.25rem;
}

.progress-bar-container.completed .progress-fill {
  background-color: var(--primary-red);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 700;
  color: var(--dark-bg);
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar-container.completed .progress-text {
  color: var(--text-white);
}

.completed-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
