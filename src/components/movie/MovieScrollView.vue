<template>
  <MovieGrid :movie-items="movieItems" :show-info="showInfo" />
  <div class="go-top-button">
    <button @click="goTop">Top</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MovieGrid from "@/components/movie/MovieGrid.vue";

export default defineComponent({
  name: 'MovieScrollView',
  components: { MovieGrid },
  props: {
    goTop: {
      type: Function,
      required: true
    },
    movieItems: {
      type: Array,
      required: true
    },
    showInfo: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.go-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
