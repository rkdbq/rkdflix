<script>
import MovieGrid from "@/components/movie/MovieGrid.vue";

const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "PopularMovie",
  components: {MovieGrid},
  data() {
    return {
      movieItems: [],
      currentPage: 1,
      viewOption: "grid",
      isScrollListening: true,
      loading: false
    }
  },
  mounted() {
    this.fetchPopularMovies(this.currentPage);
    window.addEventListener('scroll', this.handleScroll); // 스크롤 이벤트 리스너 추가
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchPopularMovies(page) {
      this.loading = true;
      if(this.viewOption === "grid") {
        fetch(`${url}${page}`, options)
            .then(res => res.json())
            .then(json => {
              this.movieItems = json['results'];
            })
            .catch(err => console.error(err))
            .finally(() => {
              this.loading = false;
            });
      }
      else {
        fetch(`${url}${page}`, options)
            .then(res => res.json())
            .then(json => {
              this.movieItems.push(...json['results']);
            })
            .catch(err => console.error(err))
            .finally(() => {
              this.loading = false;
            })
      }
    },
    nextPage() {
      this.fetchPopularMovies(++this.currentPage);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchPopularMovies(--this.currentPage);
      }
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    setViewOption(option) {
      this.viewOption = option; // 선택된 옵션 설정
      this.currentPage = 1; // 페이지를 1로 초기화
      this.fetchPopularMovies(this.currentPage); // 영화 목록 새로 고침
    },
    handleScroll() {
      if (this.isScrollListening && this.viewOption === "scroll") {
        // 문서의 높이와 현재 스크롤 위치를 계산
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 최하단에 도달했을 때 다음 페이지를 로드
        if (scrollTop + windowHeight >= documentHeight - 5) {
          this.isScrollListening = false;
          this.currentPage++;
          this.fetchPopularMovies(this.currentPage);

          // 1초 후에 리스닝을 재개
          setTimeout(() => {
            this.isScrollListening = true;
          }, 1000);
        }
      }
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
    <MovieGrid :movie-items="movieItems"/>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === 10">Next</button>
    </div>
  </div>

  <div v-if="viewOption === 'scroll'">
    <MovieGrid :movie-items="movieItems"/>
    <div class="go-top-button">
      <button @click="goTop">Top</button>
    </div>
  </div>

  <div v-if="loading" class="loading-overlay">
    <div class="loading-spinner">Loading...</div>
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
.go-top-button {
  position: fixed; /* 화면에 고정 */
  bottom: 20px; /* 하단에서 20px */
  right: 20px; /* 우측에서 20px */
  padding: 10px 15px; /* 패딩 */
  border-radius: 5px; /* 모서리 둥글게 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}
.loading-overlay {
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}
.loading-spinner {
  color: white; /* 글자 색상 */
  font-size: 24px; /* 글자 크기 */
}
</style>