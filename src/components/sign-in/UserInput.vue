<template>
  <div>
    <label>{{ fieldName }}:</label>
    <input :type="inputType" v-model="inputFieldRef" />
    <p v-if="validationMessage" style="color: red;">{{ validationMessage }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'UserInput',
  props: {
    fieldName: String,
    inputField: String,
    inputType: String,
    validationMessage: String,
  },
  setup(props, { emit }) {
    const inputFieldRef = ref(props.inputField);

    watch(inputFieldRef, () => {
      emit('onChanged', [inputFieldRef]);
    })

    return {
      inputFieldRef
    };
  },
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}

label {
  margin-right: 8px;
}

input {
  padding: 5px;
  font-size: 14px;
}
</style>