<template>
  <MovieGrid :movie-items="slicedMovieItems" />
  <div class="pagination">
    <button @click="prevPage" :disabled="tablePage === 1">Previous</button>
    <span>Page {{ tablePage }}</span>
    <button @click="nextPage" :disabled="tablePage === 20">Next</button>
  </div>
</template>

<script>
import {computed, defineComponent } from 'vue';
import MovieGrid from "@/components/movie/MovieGrid.vue";

export default defineComponent({
  name: 'MovieTableView',
  components: { MovieGrid },
  props: {
    tablePage: {
      type: Number,
      required: true
    },
    indexFrom: {
      type: Number,
      required: true,
    },
    indexTo: {
      type: Number,
      required: true,
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
  setup(props) {
    const slicedMovieItems = computed(() => {
      return props.movieItems.slice(props.indexFrom, props.indexTo);
    });

    return {
      slicedMovieItems
    }
  }

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
