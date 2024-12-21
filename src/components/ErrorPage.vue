<template>
    <div class="error-page">
      <h1>네트워크 연결 문제</h1>
      <p>인터넷 연결이 끊어졌습니다. 연결을 확인한 후 다시 시도해주세요.</p>
      <RkdButton @click="reloadPage">다시 시도</RkdButton>
    </div>
  </template>
  
  <script>
  import RkdButton from "@/components/etc/RkdButton.vue";

  export default {
    name: "ErrorPage",
    components: { RkdButton },
    methods: {
      reloadPage() {
        window.location.reload(); // 페이지 새로고침
      },
    },
  };
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  </style>
