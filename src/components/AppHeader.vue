<template>
  <header class="app-header">
    <nav class="nav-bar">
      <button 
        v-if="canGoBack" 
        @click="goBack" 
        class="back-button"
        aria-label="Zurück"
      >
        <span class="material-icons">chevron_left</span>
      </button>
      <h1 class="title">{{ pageTitle }}</h1>
      <button 
        v-if="showHelp"
        @click="$emit('show-hint')"
        class="help-button"
        aria-label="Hilfe"
      >
        <span class="material-icons">help_outline</span>
      </button>
      <button 
        v-if="showReset"
        @click="$emit('show-reset')"
        class="reset-button"
        aria-label="Zurücksetzen"
      >
        <span class="material-icons">refresh</span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

defineEmits(['show-hint', 'show-reset'])

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()

const pageTitle = computed(() => {
  if (route.name === 'question') {
    const question = quizStore.getQuestionById(route.params.id)
    return question?.question || 'F1 Quiz'
  }
  
  const titles = {
    'questions': 'Das F1 QUIZ'
  }
  return titles[route.name] || 'F1 Quiz'
})

const canGoBack = computed(() => {
  return route.name !== 'start'
})

const showHelp = computed(() => {
  return route.name === 'question'
})

const showReset = computed(() => {
  return route.name === 'questions'
})

function goBack() {
  if (route.name === 'question') {
    router.push({ name: 'questions' })
  } else if (route.name === 'questions') {
    router.push({ name: 'start' })
  }
}
</script>

<style scoped>
.app-header {
  background-color: var(--darker-bg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  position: relative;
}

.back-button,
.help-button,
.reset-button {
  background: none;
  border: none;
  color: var(--text-white);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.back-button:hover,
.help-button:hover,
.reset-button:hover {
  opacity: 0.7;
}

.back-button .material-icons {
  font-size: 32px;
}

.help-button .material-icons,
.reset-button .material-icons {
  font-size: 24px;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-white);
}

.help-button,
.reset-button {
  margin-left: auto;
}
</style>