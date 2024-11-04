<script>
import MovieItem from "@/components/MovieItem.vue";

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "PopularMovie",
  components: {MovieItem},
  data() {
    return {
      movieItems: []
    }
  },
  mounted() {
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
          // 데이터를 성공적으로 가져온 후 title에 할당
          this.movieItems = json['results'];
        })
        .catch(err => console.error(err));
  },
}
</script>

<template>
  <h1>Popular</h1>
  <div class="movie-grid-container">
    <div class="movie-grid">
      <MovieItem
          v-for="item in movieItems"
          :key="item['id']"
          :poster_path="item['poster_path']"
          :vote_average="item['vote_average']"
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