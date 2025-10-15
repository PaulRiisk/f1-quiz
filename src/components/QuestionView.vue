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
          :class="{ 'wrong': showWrongAnimation }"
          :disabled="showSuccess"
        />
      </div>
    </div>

    <!-- Success Popup -->
    <SuccessPopup 
      v-if="showSuccess"
      @continue="handleContinue"
    />

    <!-- Hint Popup -->
    <HintPopup 
      v-if="popups?.hint.show.value"
      @close="popups.hint.show.value = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import SuccessPopup from './SuccessPopup.vue'
import HintPopup from './HintPopup.vue'

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()
const popups = inject('popups')

const userAnswer = ref('')
const showSuccess = ref(false)
const showWrongAnimation = ref(false)

const question = computed(() => {
  return quizStore.getQuestionById(route.params.id)
})

onMounted(() => {
  // If question is already answered, return to overview
  if (quizStore.isAnswered(parseInt(route.params.id))) {
    router.push({ name: 'questions' })
  }
})

function submitAnswer() {
  if (!userAnswer.value.trim() || !question.value) return

  const isCorrect = quizStore.checkAnswer(question.value.id, userAnswer.value)

  if (isCorrect) {
    // Add points and mark as answered
    quizStore.addPoints(question.value.points)
    quizStore.markAsAnswered(question.value.id)
    
    // Show success popup
    showSuccess.value = true
  } else {
    // Wrong answer - clear input and show shake animation
    userAnswer.value = ''
    showWrongAnimation.value = true
    
    // Reset animation after 500ms
    setTimeout(() => {
      showWrongAnimation.value = false
    }, 500)
  }
}

function handleContinue() {
  showSuccess.value = false
  router.push({ name: 'questions' })
}
</script>

<style scoped>
.question-view {
  height: calc(100vh - 5rem); /* Subtract navbar height */
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  background-color: var(--dark-bg);
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
}

.question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
}

/* Image Container */
.image-container {
  width: 100%;
  max-width: 28.125rem;
  aspect-ratio: 1;
  background-color: var(--image-bg);
  border-radius: 1.5rem;
  overflow: hidden;
  margin-top: 2.5rem;
}

.question-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Input Container */
.input-container {
  width: 100%;
  max-width: 37.5rem;
  margin-top: auto;
  padding-bottom: 2.5rem;
}

.answer-input {
  width: 100%;
  padding: 1.125rem 1.5rem;
  font-size: 1rem;
  background-color: var(--text-white);
  border: 0.1875rem solid transparent;
  border-radius: 1rem;
  color: var(--darker-bg);
  outline: none;
  transition: transform 0.2s, border-color 0.2s;
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

.answer-input.wrong {
  animation: shake 0.5s;
  border-color: var(--primary-red);
}

/* Shake animation for wrong answer */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-0.625rem); }
  20%, 40%, 60%, 80% { transform: translateX(0.625rem); }
}
</style>