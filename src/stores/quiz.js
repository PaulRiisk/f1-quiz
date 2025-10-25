import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import questionsData from '@/data/questions.json'

const STORAGE_KEY = 'f1-quiz-progress'

// Helper function to load saved progress
function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      return {
        answeredQuestions: new Set(data.answeredQuestions || [])
      }
    }
  } catch (error) {
    console.error('Error loading progress:', error)
  }
  return {
    answeredQuestions: new Set()
  }
}

// Helper function to save progress
function saveProgress(answeredQuestions) {
  try {
    const data = {
      answeredQuestions: Array.from(answeredQuestions),
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

export const useQuizStore = defineStore('quiz', () => {
  // Initialize state with saved data
  const savedProgress = loadProgress()
  const questions = ref(questionsData.questions)
  const answeredQuestions = ref(savedProgress.answeredQuestions)

  // Auto-save on changes
  watch(answeredQuestions, () => {
    saveProgress(answeredQuestions.value)
  }, { deep: true })

  // Getters
  const answeredCount = computed(() => answeredQuestions.value.size)
  const totalQuestions = computed(() => questions.value.length)
  const progressPercentage = computed(() => 
    Math.round((answeredCount.value / totalQuestions.value) * 100)
  )

  // Actions
  function markAsAnswered(questionId) {
    answeredQuestions.value.add(questionId)
  }

  function isAnswered(questionId) {
    return answeredQuestions.value.has(questionId)
  }

  function getQuestionById(id) {
    return questions.value.find(q => q.id === parseInt(id))
  }

  function checkAnswer(questionId, userAnswer) {
    const question = getQuestionById(questionId)
    if (!question) return false

    const normalizedAnswer = userAnswer.toLowerCase().trim()
    return question.answer.some(
      correctAnswer => correctAnswer.toLowerCase() === normalizedAnswer
    )
  }

  function reset() {
    answeredQuestions.value.clear()
    // Remove progress from localStorage
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    questions,
    answeredQuestions,
    answeredCount,
    totalQuestions,
    progressPercentage,
    markAsAnswered,
    isAnswered,
    getQuestionById,
    checkAnswer,
    reset
  }
})