<template>
  <div class="movie-grid-container">
    <div class="movie-grid">
      <MovieItem
          v-for="item in movieItems"
          :key="item['id']"
          :id="item['id']"
          :posterPath="item['poster_path']"
          :voteAverage="item['vote_average']"
          :overview="item['overview']"
          :title="item['title']"
          :show-info="showInfo"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MovieItem from "@/components/movie/MovieItem.vue";

export default defineComponent({
  name: 'MovieGrid',
  components: { MovieItem },
  props: {
    movieItems: {
      type: Array,
      required: true
    },
    showInfo: {
      type: Boolean,
      default: false,
    }
  },
});
</script>

<style scoped>
.movie-grid-container {
  display: flex;
  justify-content: center;
}

.movie-grid {
  display: grid; /* 그리드 레이아웃 사용 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  justify-items: center;
}

.pagination button {
  margin: 0 10px;
}
</style>
