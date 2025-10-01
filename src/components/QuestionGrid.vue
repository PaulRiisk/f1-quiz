<template>
  <div class="question-grid-container">
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { storeToRefs } from 'pinia'

const router = useRouter()
const quizStore = useQuizStore()

const { questions } = storeToRefs(quizStore)

function isAnswered(questionId) {
  return quizStore.isAnswered(questionId)
}

function selectQuestion(questionId) {
  router.push({ name: 'question', params: { id: questionId } })
}
</script>

<style scoped>
.question-grid-container {
  min-height: 100vh;
  padding: 20px;
  background-color: var(--dark-bg);
}

.question-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.question-card {
  position: relative;
  aspect-ratio: 1;
  background-color: var(--image-bg);
  border-radius: 20px;
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
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: var(--primary-red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.answered-indicator .material-icons {
  color: var(--text-white);
  font-size: 24px;
}

/* Answered question dimming */
.question-card.answered {
  opacity: 0.8;
}
</style>