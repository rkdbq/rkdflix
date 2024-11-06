<script>
import MovieItem from "@/components/movie/MovieItem.vue";
import Filter from "@/components/Filter.vue";

const url = 'https://api.themoviedb.org/3/discover/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "SearchMovie",
  components: {Filter, MovieItem},
  data() {
    return {
      movieItems: [],
      currentPage: 1,
      isScrollListening: true,
      loading: false,

      genreId: {},
      sortParams: {
        '인기순': "popularity",
        '이름순': "title",
        '별점순': "vote_average",
        '개봉순': "primary_release_date"
      },
      orderParams: {
        '오름차순': "asc",
        '내림차순': "desc"
      },
      selectedFilterOption: {
        'genre': "장르",
        'vote avg': "별점",
        'sort by': "기준",
        'order by': "순서"
      },
      filters: {
        'genre': [],
        'vote avg': ['0-2', '2-4', '4-6', '6-8', '8-10'],
        'sort by': ['인기순', '이름순', '별점순'],
        'order by': ['오름차순', '내림차순'],
      },
    }
  },
  mounted() {
    this.getGenreList();
    this.fetchSearchedMovies(this.currentPage);
    window.addEventListener('scroll', this.handleScroll); // 스크롤 이벤트 리스너 추가
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    resetFilters() {
      // 모든 필터 옵션을 초기화
      this.selectedFilterOption = {
        'genre': "장르",
        'vote avg': "별점",
        'sort by': "기준",
        'order by': "순서"
      };
      this.movieItems = [];
      this.currentPage = 1;
      this.fetchSearchedMovies(this.currentPage);
    },
    getGenreList() {
      const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=ko';

      fetch(genreUrl, options)
          .then(res => res.json())
          .then(json => {
            // console.log(json);
            json['genres'].forEach((genre) => {
              this.filters['genre'].push(genre['name']);
              this.genreId[genre['name']] = genre['id'];
            });
          })
    },
    fetchSearchedMovies(page) {
      this.loading = true;

      const pathParam = "movie"
      const language = "ko";
      const genre = this.selectedFilterOption['genre'];
      const voteAverage = this.selectedFilterOption['vote avg'];
      const sortBy = this.selectedFilterOption['sort by'];
      const orderBy = this.selectedFilterOption['order by'];

      let queryUrl = url + `${pathParam}?language=${language}&page=${page}`;
      if (genre !== "장르") {
        const genreId = this.genreId[genre];
        queryUrl += `&with_genres=${genreId}`;
      }
      if (voteAverage !== "별점") {
        const voteAverageRange = voteAverage.split('-');
        queryUrl += `&vote_average.gte=${voteAverageRange[0]}&vote_average.lte=${voteAverageRange[1]}`;
      }
      if (sortBy !== "기준" && orderBy !== "순서") {
        const sortParam = this.sortParams[sortBy];
        const orderParam = this.orderParams[orderBy];
        queryUrl += `&sort_by=${sortParam}.${orderParam}`;
      }

      console.log(queryUrl);
      fetch(queryUrl, options)
          .then(res => res.json())
          .then(json => {
            this.movieItems.push(...json['results']);
          })
          .catch(err => console.error(err))
          .finally(() => {
            this.loading = false;
          })
    },
    goTop() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      if (this.isScrollListening) {
        // 문서의 높이와 현재 스크롤 위치를 계산
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 최하단에 도달했을 때 다음 페이지를 로드
        if (scrollTop + windowHeight >= documentHeight - 5) {
          this.isScrollListening = false;
          this.currentPage++;
          this.fetchSearchedMovies(this.currentPage);

          // 1초 후에 리스닝을 재개
          setTimeout(() => {
            this.isScrollListening = true;
          }, 1000);
        }
      }
    },
    selectOption(payload) {
      const filter = payload[0];
      this.selectedFilterOption[filter] = payload[1];

      this.movieItems = [];
      this.currentPage = 1;
      this.fetchSearchedMovies(this.currentPage);
    }
  }
}
</script>

<template>
  <div>
    <h1>Search</h1>

    <Filter
        v-for="[filterType, options] in Object.entries(filters)"
        :key="filterType"
        :filter-type="filterType"
        :options="options"
        :selected-option="selectedFilterOption[filterType]"
        @on-option-selected="selectOption"
    />
    <button @click="resetFilters" class="reset-button">초기화</button>

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

    <div class="go-top-button">
      <button @click="goTop">Top</button>
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">Loading...</div>
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
.reset-button {
  width: 100px;
  margin: 16px;
}
</style>