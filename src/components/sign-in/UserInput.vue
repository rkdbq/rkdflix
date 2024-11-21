<template>
  <div>
    <input :type="inputType" :placeholder="placeholder" v-model="inputFieldRef" />
    <p v-if="validationMessage" style="color: red;">{{ validationMessage }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'UserInput',
  props: {
    placeholder: String,
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
  display: flex;
  flex-direction: column;
}

input {
  height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* 연한 흰색 테두리 */
  border-radius: 4px;
  vertical-align: center;
  background-color: rgba(51, 51, 51, 0.8);
  color: #fff;
}

input::placeholder {
  color: #8c8c8c;
}

</style>