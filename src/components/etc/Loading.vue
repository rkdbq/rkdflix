<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-spinner">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    isLoading: {}
  }
}
</script>

<style scoped>
.pagination button {
  margin: 0 10px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  color: white;
  font-size: 24px;
}
</style>