<template>
  <div class="popup-overlay" @click="handleContinue">
    <div class="popup-content" @click.stop>
      <h2 class="popup-title">Richtig!</h2>
      <p class="popup-points">+{{ points }} Pkt.</p>
      <button 
        @click="handleContinue"
        class="continue-button"
      >
        Weiter
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  points: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['continue'])

function handleContinue() {
  emit('continue')
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.popup-content {
  background-color: var(--primary-red);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 400px;
  width: calc(100% - 40px);
  text-align: center;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.popup-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0 0 16px 0;
}

.popup-points {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-white);
  margin: 0 0 32px 0;
}

.continue-button {
  width: 100%;
  padding: 16px;
  background-color: var(--text-white);
  border: none;
  border-radius: 16px;
  color: var(--primary-red);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.continue-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.continue-button:active {
  transform: scale(0.98);
}
</style>