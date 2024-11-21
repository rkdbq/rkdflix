<template>
  <MovieGrid :movie-items="slicedMovieItems" />
  <div class="pagination">
    <RkdButton :on-click="prevPage" :disabled="tablePage === 1">❮</RkdButton>
    <span class="pagination-info">페이지 {{ tablePage }}</span>
    <RkdButton :on-click="nextPage" :disabled="tablePage === 20">❯</RkdButton>
  </div>
</template>

<script>
import {computed, defineComponent } from 'vue';
import MovieGrid from "@/components/movie/MovieGrid.vue";
import RkdButton from "@/components/etc/RkdButton.vue";

export default defineComponent({
  name: 'MovieTableView',
  components: {RkdButton, MovieGrid },
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
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination-info {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}
</style>
