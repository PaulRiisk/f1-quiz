<template>
  <div class="question-grid-container">
    <!-- Progress Bar -->
    <ProgressBar @completed-click="showCompletionPopup = true" />

    <div class="question-grid">
      <div
        v-for="question in questions"
        :key="question.id"
        @click="selectQuestion(question.id)"
        class="question-card"
        :class="{ answered: isAnswered(question.id) }"
      >
        <img 
          :src="question.image" 
          :alt="question.question"
          class="question-image"
        />
        <div v-if="isAnswered(question.id)" class="answered-indicator">
          <span class="material-icons">check</span>
        </div>
      </div>
    </div>

    <!-- Reset Confirmation Popup -->
    <BasePopup 
      v-if="popups?.reset.show.value"
      title="Achtung!"
      message="Willst du deinen Fortschritt<br>zurücksetzen?"
      variant="warning"
      confirm-text="Ja"
      cancel-text="Nein"
      :show-cancel-button="true"
      @confirm="handleResetConfirm"
      @cancel="popups.reset.show.value = false"
    />

    <!-- Completion Popup -->
    <BasePopup 
      v-if="showCompletionPopup"
      title="Geschafft!"
      message="Willst du Neustarten?"
      variant="success"
      confirm-text="Ja"
      cancel-text="Nein"
      :show-cancel-button="true"
      @confirm="handleRestartConfirm"
      @cancel="showCompletionPopup = false"
    />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { storeToRefs } from 'pinia'
import BasePopup from './BasePopup.vue'
import ProgressBar from './ProgressBar.vue'

const router = useRouter()
const quizStore = useQuizStore()
const popups = inject('popups')

const { questions } = storeToRefs(quizStore)
const showCompletionPopup = ref(false)

function isAnswered(questionId) {
  return quizStore.isAnswered(questionId)
}

function selectQuestion(questionId) {
  router.push({ name: 'question', params: { id: questionId } })
}

function handleResetConfirm() {
  quizStore.reset()
  popups.reset.show.value = false
}

function handleRestartConfirm() {
  quizStore.reset()
  showCompletionPopup.value = false
}
</script>

<style scoped>
.question-grid-container {
  min-height: 100vh;
  padding: 1.25rem;
  background-color: var(--dark-bg);
}

.question-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 37.5rem;
  margin: 0 auto;
}

.question-card {
  position: relative;
  aspect-ratio: 1;
  background-color: var(--image-bg);
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.question-card:hover {
  transform: scale(1.02);
}

.question-card:active {
  transform: scale(0.98);
}

.question-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Answered indicator */
.answered-indicator {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--primary-red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
}

.answered-indicator .material-icons {
  color: var(--text-white);
  font-size: 1.5rem;
}

/* Answered question dimming */
.question-card.answered {
  opacity: 0.8;
}
</style>