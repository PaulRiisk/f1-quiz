<template>
  <div class="start-screen">
    <!-- Logo & title -->
    <div class="logo-section">
      <div class="logo">
        <div class="f1-logo-container">
          <img 
            src="/src/assets/images/F1_Main_Graph.webp" 
            alt="F1 Logo Background"
            class="f1-background-image"
          />
          <span class="f1-text">F1</span>
        </div>
      </div>
      <h1 class="subtitle">DAS INOFFIZIELLE QUIZ</h1>
    </div>

    <!-- Start button -->
    <button 
      @click="startQuiz" 
      class="start-button"
    >
      <span class="play-icon material-icons">play_arrow</span>
      <span>Start</span>
    </button>

    <!-- Progress section -->
    <div class="progress-section">
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
      <div class="progress-info">
        <span class="progress-count">{{ answeredCount }} / {{ totalQuestions }}</span>
        <span class="progress-percentage">{{ progressPercentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { storeToRefs } from 'pinia'

const router = useRouter()
const quizStore = useQuizStore()

const { answeredCount, totalQuestions, progressPercentage } = storeToRefs(quizStore)

function startQuiz() {
  router.push({ name: 'questions' })
}
</script>

<style scoped>
.start-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.25rem;
  background-color: var(--dark-bg);
}

/* Logo section */
.logo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.75rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.f1-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.f1-background-image {
  width: 25rem;
  height: auto;
  object-fit: contain;
}

.f1-text {
  position: absolute;
  font-size: 7.8125rem;
  font-weight: 900;
  color: var(--text-white);
  letter-spacing: -0.3125rem;
  -webkit-text-stroke: 0.375rem var(--dark-bg);
  z-index: 2;
}

.subtitle {
  position: relative;
  top: -8.125rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-white);
  letter-spacing: 0.125rem;
}

/* Start button */
.start-button {
  width: calc(100% - 2.5rem);
  max-width: 25rem;
  padding: 1.125rem;
  background-color: var(--primary-red);
  border: none;
  border-radius: 0.75rem;
  color: var(--text-white);
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  transition: transform 0.2s, opacity 0.2s;
}

.start-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.start-button:active {
  transform: scale(0.98);
}

.play-icon {
  font-size: 1.75rem;
}

/* Progress section */
.progress-section {
  width: calc(100% - 2.5rem);
  max-width: 25rem;
  background-color: var(--darker-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.progress-bar-container {
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: var(--card-bg);
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--text-white);
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-white);
}
</style>