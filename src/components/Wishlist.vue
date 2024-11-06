<template>
  <div class="movie-grid-container">
    <div class="movie-grid">
      <MovieItem
          v-for="item in wishlist"
          :key="item['id']"
          :id="item['id']"
          :posterPath="item['poster_path']"
          :voteAverage="item['vote_average']"
          :overview="item['overview']"
          :show-info="true"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MovieItem from "@/components/movie/MovieItem.vue";

export default {
  name: "WishList",
  components: { MovieItem },
  setup() {
    const store = useStore();
    const wishlist = computed(() => Object.values(store.state.user.wishlist));

    return { wishlist };
  },
};
</script>

<style scoped>
.movie-grid-container {
  display: flex;
  justify-content: center;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  justify-items: center;
}
</style>
