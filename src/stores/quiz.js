import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import questionsData from '@/data/questions.json'

const STORAGE_KEY = 'f1-quiz-progress'

// Hilfsfunktion zum Laden des gespeicherten Fortschritts
function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      return {
        answeredQuestions: new Set(data.answeredQuestions || []),
        totalPoints: data.totalPoints || 0
      }
    }
  } catch (error) {
    console.error('Fehler beim Laden des Fortschritts:', error)
  }
  return {
    answeredQuestions: new Set(),
    totalPoints: 0
  }
}

// Hilfsfunktion zum Speichern des Fortschritts
function saveProgress(answeredQuestions, totalPoints) {
  try {
    const data = {
      answeredQuestions: Array.from(answeredQuestions),
      totalPoints: totalPoints,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Fehler beim Speichern des Fortschritts:', error)
  }
}

export const useQuizStore = defineStore('quiz', () => {
  // State mit gespeicherten Daten initialisieren
  const savedProgress = loadProgress()
  const questions = ref(questionsData.questions)
  const answeredQuestions = ref(savedProgress.answeredQuestions)
  const totalPoints = ref(savedProgress.totalPoints)

  // Automatisches Speichern bei Änderungen
  watch([answeredQuestions, totalPoints], () => {
    saveProgress(answeredQuestions.value, totalPoints.value)
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
    // Fortschritt aus localStorage löschen
    localStorage.removeItem(STORAGE_KEY)
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