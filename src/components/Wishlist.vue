<script>
import MovieItem from "@/components/movie/MovieItem.vue";

export default {
  name: "WishList",
  components: {MovieItem},
  computed: {
    wishlist() {
      return Object.values(this.$store.state.user.wishlist);
    }
  },
  mounted() {
    console.log(this.wishlist);
  }
}
</script>

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
</style>