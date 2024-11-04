<script>
import MovieItem from "@/components/MovieItem.vue";

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=';
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
      movieItems: [],
      currentPage: 1,
      viewOption: "grid",
    }
  },
  mounted() {
    this.fetchMovies(this.currentPage);
  },
  methods: {
    fetchMovies(page) {
      fetch(`${url}${page}`, options)
          .then(res => res.json())
          .then(json => {
            this.movieItems = json['results'];
          })
          .catch(err => console.error(err));
    },
    nextPage() {
      this.fetchMovies(++this.currentPage);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchMovies(--this.currentPage);
      }
    },
    setViewOption(option) {
      this.viewOption = option; // 선택된 옵션 설정
      this.currentPage = 1; // 페이지를 1로 초기화
      this.fetchMovies(this.currentPage); // 영화 목록 새로 고침
    },
  }
}
</script>

<template>
  <h1>Popular</h1>
  <div class="select-view-container">
    <button @click="setViewOption('scroll')" :disabled="viewOption === 'scroll'">
      Scroll
    </button>
    <button @click="setViewOption('grid')" :disabled="viewOption === 'grid'">
      Grid
    </button>
  </div>
  <div v-if="viewOption === 'grid'">
    <div class="movie-grid-container">
      <div class="movie-grid">
        <MovieItem
            v-for="item in movieItems"
            :key="item['id']"
            :posterPath="item['poster_path']"
            :voteAverage="item['vote_average']"
        />
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === 10">Next</button>
    </div>
  </div>
</template>

<style scoped>
.select-view-container {
  display: flex;
  justify-content: flex-end;
  margin: 16px;
}
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
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 10px;
}
</style>