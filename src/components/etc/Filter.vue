<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selectedOption }}
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterDropdown',
  props: {
    filterType: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
      emit('onOptionSelected', [props.filterType, option]);
      toggleDropdown();
    };

    return {
      isOpen,
      toggleDropdown,
      selectOption,
    };
  },
});
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
