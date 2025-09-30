<template>
  <div class="start-screen">
    <!-- Logo & title -->
    <div class="logo-section">
      <div class="logo">
        <div class="f1-logo-container">
          <img 
            src="/src/assets/images/F1_Main_Graph.png" 
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
  padding: 40px 20px;
  background-color: var(--dark-bg);
}

/* Logo section */
.logo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.f1-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.f1-background-image {
  width: 400px;
  height: auto;
  object-fit: contain;
}

.f1-text {
  position: absolute;
  font-size: 125px;
  font-weight: 900;
  color: var(--text-white);
  letter-spacing: -5px;
  -webkit-text-stroke: 8px var(--dark-bg);
  z-index: 2;
}

.subtitle {
  position: relative;
  top: -130px;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-white);
  letter-spacing: 2px;
}

/* Start button */
.start-button {
  width: calc(100% - 40px);
  max-width: 400px;
  padding: 18px;
  background-color: var(--primary-red);
  border: none;
  border-radius: 12px;
  color: var(--text-white);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
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
  font-size: 28px;
}

/* Progress section */
.progress-section {
  width: calc(100% - 40px);
  max-width: 400px;
  background-color: var(--darker-bg);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
}

.progress-bar-container {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--card-bg);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--text-white);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-white);
}
</style>