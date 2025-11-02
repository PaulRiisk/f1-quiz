<template>
  <div class="app-container">
    <!-- App Header -->
    <AppHeader v-if="showHeader" @show-hint="handleShowHint" @show-reset="handleShowReset" />

    <!-- Main Content Area -->
    <main class="main-content">
      <router-view v-slot="{ Component }">

        <!-- Route Transition -->
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>

      </router-view>
    </main>

  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

// Setup route and popup states
const route = useRoute()
const showHintPopup = ref(false)
const showResetPopup = ref(false)

// Computed property to determine header visibility
const showHeader = computed(() => route.name !== 'start')

// Handlers to show popups
function handleShowHint() {
  showHintPopup.value = true
}

function handleShowReset() {
  showResetPopup.value = true
}

// Provide popup states and toggles to child components
provide('popups', {
  hint: {
    show: showHintPopup,
    toggle: handleShowHint
  },
  reset: {
    show: showResetPopup,
    toggle: handleShowReset
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark-bg);
}

.main-content {
  flex: 1;
  position: relative;
}

/* Transition animations -> Simple Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>