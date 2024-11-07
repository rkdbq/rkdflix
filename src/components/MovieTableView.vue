<template>
  <MovieGrid :movie-items="movieItems"/>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === 10">Next</button>
  </div>
</template>
<script>
import MovieGrid from "@/components/movie/MovieGrid.vue"

export default {
  name: 'MovieTableView',
  components: {MovieGrid},
  props: {
    currentPage: {},
    movieItems: {},
    nextPage: {},
    prevPage: {}
  }
}
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