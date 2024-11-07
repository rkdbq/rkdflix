<template>
  <MovieGrid :movie-items="movieItems" />
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === 10">Next</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MovieGrid from "@/components/movie/MovieGrid.vue";

export default defineComponent({
  name: 'MovieTableView',
  components: { MovieGrid },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    movieItems: {
      type: Array,
      required: true
    },
    nextPage: {
      type: Function,
      required: true
    },
    prevPage: {
      type: Function,
      required: true
    }
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}
</style>
