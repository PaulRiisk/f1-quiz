<template>
  <header class="app-header">
    <nav class="nav-bar">
      <button 
        v-if="canGoBack" 
        @click="goBack" 
        class="back-button"
        aria-label="Back"
      >
        <img src="@/assets/icons/left-arrow.svg" alt="Back" class="icon" />
      </button>
      <h1 class="title">{{ pageTitle }}</h1>
      <button 
        v-if="showHelp"
        @click="$emit('show-hint')"
        class="help-button"
        aria-label="Help"
      >
        <img src="@/assets/icons/help.svg" alt="Help" class="icon" />
      </button>
      <div v-if="showReset" class="right-buttons">
        <button 
          @click="goToImpressum"
          class="info-button"
          aria-label="Impressum"
        >
          <img src="@/assets/icons/info.svg" alt="Info" class="icon" />
        </button>
        <button 
          @click="$emit('show-reset')"
          class="reset-button"
          aria-label="Reset"
        >
          <img src="@/assets/icons/restart.svg" alt="Reset" class="icon" />
        </button>
      </div>
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
    'questions': 'Das F1 QUIZ',
    'impressum': 'Impressum'
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
  } else if (route.name === 'impressum') {
    router.push({ name: 'questions' })
  }
}

function goToImpressum() {
  router.push({ name: 'impressum' })
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
  padding: 1rem 1.25rem;
  position: relative;
}

.back-button,
.help-button,
.info-button,
.reset-button {
  background: none;
  border: none;
  color: var(--text-white);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.back-button:hover,
.help-button:hover,
.info-button:hover,
.reset-button:hover {
  opacity: 0.7;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  filter: brightness(0) invert(1); /* Makes SVG white */
}

.back-button .icon {
  width: 2rem;
  height: 2rem;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-white);
}

.right-buttons {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.help-button {
  margin-left: auto;
}
</style>