<template>
  <MovieGrid :movie-items="movieItems" :show-info="showInfo"/>
  <div class="go-top-button">
    <button @click="goTop">Top</button>
  </div>
</template>
<script>
import MovieGrid from "@/components/movie/MovieGrid.vue"

export default {
  name: 'MovieScrollView',
  components: {MovieGrid},
  props: {
    goTop: {},
    movieItems: {},
    showInfo: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<style scoped>
.go-top-button {
  position: fixed; /* 화면에 고정 */
  bottom: 20px; /* 하단에서 20px */
  right: 20px; /* 우측에서 20px */
  padding: 10px 15px; /* 패딩 */
  border-radius: 5px; /* 모서리 둥글게 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}
</style>