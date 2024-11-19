<template>
  <button @click="onClick" :disabled="disabled"><slot></slot></button>
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
<style scoped>
button {
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 검은색 */
  color: white; /* 텍스트 색상 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 연한 흰색 테두리 */
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease; /* 부드러운 애니메이션 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 가벼운 그림자 */
}

button:hover {
  background-color: rgba(0, 0, 0, 0.9); /* 덜 투명한 검은색으로 변경 */
  transform: scale(1.05); /* 약간 커지는 효과 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 테두리 강조 */
}

button:active {
  background-color: rgba(0, 0, 0, 0.5); /* 더 투명한 검은색 */
  transform: scale(0.95); /* 약간 줄어드는 효과 */
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4); /* 더 흐릿한 검은색 */
  cursor: not-allowed;
  opacity: 0.6;
}

button:focus {
  outline: none; /* 기본 포커스 제거 */
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4); /* 포커스 테두리 추가 */
}
</style>