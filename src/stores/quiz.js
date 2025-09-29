import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import questionsData from '@/data/questions.json'

export const useQuizStore = defineStore('quiz', () => {
  // State
  const questions = ref(questionsData.questions)
  const answeredQuestions = ref(new Set())
  const totalPoints = ref(0)

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

  function addPoints(points) {
    totalPoints.value += points
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
    totalPoints.value = 0
  }

  return {
    questions,
    answeredQuestions,
    totalPoints,
    answeredCount,
    totalQuestions,
    progressPercentage,
    markAsAnswered,
    addPoints,
    isAnswered,
    getQuestionById,
    checkAnswer,
    reset
  }
})