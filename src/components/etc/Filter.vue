<template>
  <div class="dropdown">
    <RkdButton :on-click="toggleDropdown">{{selectedOption}}</RkdButton>
    <div v-if="isOpen" class="dropdown-menu">
      <RkdButton
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="dropdown-button"
      >
        {{ option }}
      </RkdButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import RkdButton from "@/components/etc/RkdButton.vue";

export default defineComponent({
  name: 'FilterDropdown',
  components: {RkdButton},
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
  z-index: 500;
  margin-right: 8px;
  margin-left: 8px;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
}

.dropdown-button {
  width: 100%;
}

@media (max-width: 768px) {
  .dropdown {
    margin-right: 2px;
    margin-left: 2px;
  }
  .dropdown button {
    margin: 0 2px;
    font-size: 12px;
    padding: 12px;
  }
}
</style>
