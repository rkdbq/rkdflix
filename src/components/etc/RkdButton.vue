<template>
  <button @click="onClick" :disabled="disabled" :style="{width: `${widthSize}px`}"><slot></slot></button>
</template>

<script>
export default {
  name: 'rkdButton',
  props: {
    onClick: Function,
    disabled: {
      type: Boolean,
      default: false,
    },
    widthSize: {
      type: Number,
      default: 120,
    }
  },
}
</script>
<style>

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

nav {
  display: flex;
  gap: 20px; /* 링크 간격 */
}

button {
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 활성화 상태 */
button:active {
  background-color: #4a90e2;
  border-color: #4a90e2;
  color: white;
}

/* Hover effect */
button:hover {
  background-color: #e0e0e0;
  border-color: #bbb;
}

/* Disabled state (if needed) */
button:disabled {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
  opacity: 0.7;
}

button:hover:not(.active) {
  background-color: #e0e0e0; /* Hover color for inactive buttons */
  border-color: #bbb;
}
</style>