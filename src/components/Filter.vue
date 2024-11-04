<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selectedOption || filterType.toUpperCase() }}
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <button
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="dropdown-button"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterDropdown',
  props: {
    filterType: String,
    options: {},
    selectedOption: {},
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit('onOptionSelected', [this.filterType, option]);
      this.toggleDropdown()
    }
  }
}
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 16px;
  z-index: 500;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
}

.dropdown-button {
  width: 100px;
}
</style>