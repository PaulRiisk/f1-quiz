<template>
  <div class="popup-overlay" @click="handleOverlayClick">
    <div class="popup-content" :class="variant" @click.stop>
      <h2 class="popup-title">{{ title }}</h2>
      <p v-if="message" class="popup-text" v-html="message"></p>
      
      <!-- Single button layout -->
      <button 
        v-if="!showCancelButton"
        @click="handleConfirm"
        class="action-button primary-button"
      >
        {{ confirmText }}
      </button>

      <!-- Two button layout -->
      <div v-else class="button-row">
        <button 
          @click="handleConfirm"
          class="action-button confirm-button"
        >
          {{ confirmText }}
        </button>
        <button 
          @click="handleCancel"
          class="action-button cancel-button"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'OK'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})
// Define emits
const emit = defineEmits(['confirm', 'cancel', 'close'])

// Handle confirm action, cancel action, and overlay click
function handleConfirm() {
  emit('confirm')
  emit('close')
}

function handleCancel() {
  emit('cancel')
  emit('close')
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    handleCancel()
  }
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
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  max-width: 25rem;
  width: calc(100% - 2.5rem);
  text-align: center;
  animation: slideUp 0.4s ease;
}

/* Variant styles */
.popup-content.default {
  background-color: var(--text-white);
}

.popup-content.success {
  background-color: var(--primary-red);
}

.popup-content.warning {
  background-color: var(--text-white);
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
  margin: 0 0 1.5rem 0;
}

.popup-content.default .popup-title,
.popup-content.warning .popup-title {
  color: var(--dark-bg);
}

.popup-content.success .popup-title {
  color: var(--text-white);
}

.popup-text {
  font-size: 1.125rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
  line-height: 1.4;
}

.popup-content.default .popup-text,
.popup-content.warning .popup-text {
  color: var(--dark-bg);
}

.popup-content.success .popup-text {
  color: var(--text-white);
}

.button-row {
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.action-button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.action-button:active {
  transform: scale(0.98);
}

/* Single button layout */
.primary-button {
  width: 100%;
}

.popup-content.default .primary-button {
  background-color: var(--dark-bg);
  color: var(--text-white);
}

.popup-content.success .primary-button {
  background-color: var(--text-white);
  color: var(--primary-red);
}

/* Two button layout */
.button-row .action-button {
  flex: 1;
}

.confirm-button {
  background-color: var(--primary-red);
  color: var(--text-white);
}

.cancel-button {
  background-color: var(--dark-bg);
  color: var(--text-white);
}
</style>
