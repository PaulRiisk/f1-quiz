<template>
  <div class="question-view">
    <div v-if="question" class="question-content">
      <!-- Question Image -->
      <div class="image-container">
        <img 
          :src="question.image" 
          :alt="question.question"
          class="question-image"
        />
      </div>

      <!-- Answer Input -->
      <div class="input-container">
        <input
          v-model="userAnswer"
          @keyup.enter="submitAnswer"
          type="text"
          :placeholder="question.question"
          class="answer-input"
          :disabled="showSuccess"
        />
      </div>
    </div>

    <!-- Success Popup -->
    <SuccessPopup 
      v-if="showSuccess"
      :points="question?.points || 10"
      @continue="handleContinue"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import SuccessPopup from './SuccessPopup.vue'

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()

const userAnswer = ref('')
const showSuccess = ref(false)

const question = computed(() => {
  return quizStore.getQuestionById(route.params.id)
})

onMounted(() => {
  // Wenn Frage schon beantwortet wurde, zurück zur Übersicht
  if (quizStore.isAnswered(parseInt(route.params.id))) {
    router.push({ name: 'questions' })
  }
})

function submitAnswer() {
  if (!userAnswer.value.trim() || !question.value) return

  const isCorrect = quizStore.checkAnswer(question.value.id, userAnswer.value)

  if (isCorrect) {
    // Punkte hinzufügen und als beantwortet markieren
    quizStore.addPoints(question.value.points)
    quizStore.markAsAnswered(question.value.id)
    
    // Success Popup anzeigen
    showSuccess.value = true
  } else {
    // Falsche Antwort - Input leeren und Shake-Animation
    userAnswer.value = ''
    // Optional: Shake-Animation oder Feedback
  }
}

function handleContinue() {
  showSuccess.value = false
  router.push({ name: 'questions' })
}
</script>

<style scoped>
.question-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark-bg);
  padding: 20px;
  position: relative;
}

.question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex: 1;
}

/* Image Container */
.image-container {
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1;
  background-color: var(--image-bg);
  border-radius: 24px;
  overflow: hidden;
  margin-top: 40px;
}

.question-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Input Container */
.input-container {
  width: 100%;
  max-width: 600px;
  margin-top: auto;
  padding-bottom: 40px;
}

.answer-input {
  width: 100%;
  padding: 18px 24px;
  font-size: 16px;
  background-color: var(--text-white);
  border: none;
  border-radius: 16px;
  color: var(--darker-bg);
  outline: none;
  transition: transform 0.2s;
}

.answer-input::placeholder {
  color: var(--text-gray);
}

.answer-input:focus {
  transform: scale(1.02);
}

.answer-input:disabled {
  opacity: 0.5;
}

/* Optional: Shake Animation bei falscher Antwort */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.answer-input.wrong {
  animation: shake 0.5s;
}
</style>