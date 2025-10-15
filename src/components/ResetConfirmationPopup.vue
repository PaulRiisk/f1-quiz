<template>
  <div class="popup-overlay" @click="handleCancel">
    <div class="popup-content" @click.stop>
      <h2 class="popup-title">Achtung!</h2>
      <p class="popup-text">
        Willst du deinen Fortschritt<br>
        zurücksetzen?
      </p>
      <div class="button-row">
        <button 
          @click="handleConfirm"
          class="confirm-button"
        >
          Ja
        </button>
        <button 
          @click="handleCancel"
          class="cancel-button"
        >
          Nein
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['confirm', 'cancel'])

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
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
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  max-width: 25rem;
  width: calc(100% - 2.5rem);
  text-align: center;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(3.125rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.popup-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--dark-bg);
  margin: 0 0 1.5rem 0;
}

.popup-text {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--dark-bg);
  margin: 0 0 2rem 0;
  line-height: 1.4;
}

.button-row {
  display: flex;
  gap: 1rem;
}

.confirm-button,
.cancel-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.confirm-button {
  background-color: var(--primary-red);
  color: var(--text-white);
}

.cancel-button {
  background-color: var(--dark-bg);
  color: var(--text-white);
}

.confirm-button:hover,
.cancel-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.confirm-button:active,
.cancel-button:active {
  transform: scale(0.98);
}
</style>