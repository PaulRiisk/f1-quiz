<template>
  <div class="popup-overlay" @click="handleClose">
    <div class="popup-content" @click.stop>
      <h2 class="popup-title">Hinweis</h2>
      <p class="popup-text">
        Beantworte die gestellte Frage.<br>
        Groß und Kleinschreibung ist<br>
        irrelevant. Achte auf Leerzeichen.
      </p>
      <button 
        @click="handleClose"
        class="close-button"
      >
        Zurück
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
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
  background-color: var(--text-white);
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
  color: var(--dark-bg);
  margin: 0 0 24px 0;
}

.popup-text {
  font-size: 18px;
  font-weight: 400;
  color: var(--dark-bg);
  margin: 0 0 32px 0;
  line-height: 1.4;
}

.close-button {
  width: 100%;
  padding: 16px;
  background-color: var(--dark-bg);
  border: none;
  border-radius: 16px;
  color: var(--text-white);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.close-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.close-button:active {
  transform: scale(0.98);
}
</style>