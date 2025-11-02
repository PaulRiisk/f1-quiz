<template>
  <div class="start-screen">
    <!-- Logo & title -->
    <div class="logo-section">
      <div class="logo">
        <div class="f1-logo-container">
          <img 
            src="/images/F1_Main_Graph.webp" 
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
      <span class="play-icon">▶</span>
      <span>Start</span>
    </button>

    <!-- Progress section -->
    <div class="progress-section">
      <ProgressBar @completed-click="showCompletionPopup = true" />
    </div>

    <!-- Completion Popup -->
    <BasePopup 
      v-if="showCompletionPopup"
      title="Geschafft!"
      message="Willst du Neustarten?"
      variant="warning"
      confirm-text="Ja"
      cancel-text="Nein"
      :show-cancel-button="true"
      @confirm="handleRestartConfirm"
      @cancel="showCompletionPopup = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import ProgressBar from './ProgressBar.vue'
import BasePopup from './BasePopup.vue'

// Setup router and store
const router = useRouter()
const quizStore = useQuizStore()
const showCompletionPopup = ref(false)

// Start quiz and navigate to questions view
function startQuiz() {
  router.push({ name: 'questions' })
}

// Handle restart confirmation
function handleRestartConfirm() {
  quizStore.reset()
  showCompletionPopup.value = false
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
  font-size: 1.5rem;
}

/* Progress section */
.progress-section {
  width: calc(100% - 2.5rem);
  max-width: 25rem;
  margin-bottom: 2.5rem;
}
</style>