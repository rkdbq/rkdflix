<template>
  <div>
    <label for="id">{{ fieldName }}:</label>
    <input type="text" id="id" v-model="inputFieldRef" />
    <p style="color: red;">{{ validationMessageRef }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'UserInput',
  props: {
    fieldName: String, // 부모에서 전달된 value (v-model로 받은 값)
    inputField: String,
    validationMessage: String,
    validateFunction: Function,
  },
  setup(props, { emit }) {
    const validationMessageRef = ref('');
    const inputFieldRef = ref('');

    watch(inputFieldRef, (val) => {
      validationMessageRef.value = props.validateFunction(val);
      emit('onChanged', [inputFieldRef, validationMessageRef]);
    })

    return {
      inputFieldRef,
      validationMessageRef
    };
  },
};
</script>
