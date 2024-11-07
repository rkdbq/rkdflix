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

    <MovieScrollView :go-top="goTop" :movie-items="movieItems"/>

    <Loading :isLoading="loading"/>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import Filter from "@/components/etc/Filter.vue";
import Loading from "@/components/etc/Loading.vue";
import MovieScrollView from "@/components/movie/MovieScrollView.vue";

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
  components: {MovieScrollView, Filter, Loading },
  setup() {
    const movieItems = ref([]);
    const currentPage = ref(1);
    const isScrollListening = ref(true);
    const loading = ref(false);
    const genreId = reactive({});
    const sortParams = reactive({
      '인기순': "popularity",
      '이름순': "title",
      '별점순': "vote_average",
      '개봉순': "primary_release_date"
    });
    const orderParams = reactive({
      '오름차순': "asc",
      '내림차순': "desc"
    });
    const selectedFilterOption = reactive({
      'genre': "장르",
      'vote avg': "별점",
      'sort by': "기준",
      'order by': "순서"
    });
    const filters = reactive({
      'genre': [],
      'vote avg': ['0-2', '2-4', '4-6', '6-8', '8-10'],
      'sort by': ['인기순', '이름순', '별점순'],
      'order by': ['오름차순', '내림차순'],
    });

    const resetFilters = () => {
      selectedFilterOption['genre'] = "장르";
      selectedFilterOption['vote avg'] = "별점";
      selectedFilterOption['sort by'] = "기준";
      selectedFilterOption['order by'] = "순서";
      movieItems.value = [];
      currentPage.value = 1;
      fetchSearchedMovies(currentPage.value);
    };

    const getGenreList = () => {
      const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=ko';

      fetch(genreUrl, options)
          .then(res => res.json())
          .then(json => {
            json['genres'].forEach((genre) => {
              filters['genre'].push(genre['name']);
              genreId[genre['name']] = genre['id'];
            });
          })
    };

    const fetchSearchedMovies = (page) => {
      loading.value = true;

      const pathParam = "movie"
      const language = "ko";
      const genre = selectedFilterOption['genre'];
      const voteAverage = selectedFilterOption['vote avg'];
      const sortBy = selectedFilterOption['sort by'];
      const orderBy = selectedFilterOption['order by'];

      let queryUrl = url + `${pathParam}?language=${language}&page=${page}`;
      if (genre !== "장르") {
        queryUrl += `&with_genres=${genreId[genre]}`;
      }
      if (voteAverage !== "별점") {
        const voteAverageRange = voteAverage.split('-');
        queryUrl += `&vote_average.gte=${voteAverageRange[0]}&vote_average.lte=${voteAverageRange[1]}`;
      }
      if (sortBy !== "기준" && orderBy !== "순서") {
        const sortParam = sortParams[sortBy];
        const orderParam = orderParams[orderBy];
        queryUrl += `&sort_by=${sortParam}.${orderParam}`;
      }

      fetch(queryUrl, options)
          .then(res => res.json())
          .then(json => {
            movieItems.value.push(...json['results']);
          })
          .catch(err => console.error(err))
          .finally(() => {
            loading.value = false;
          })
    };

    const goTop = () => {
      window.scrollTo(0, 0);
    };

    const handleScroll = () => {
      if (isScrollListening.value) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 5) {
          isScrollListening.value = false;
          currentPage.value++;
          fetchSearchedMovies(currentPage.value);

          setTimeout(() => {
            isScrollListening.value = true;
          }, 1000);
        }
      }
    };

    const selectOption = (payload) => {
      const filter = payload[0];
      selectedFilterOption[filter] = payload[1];

      movieItems.value = [];
      currentPage.value = 1;
      fetchSearchedMovies(currentPage.value);
    };

    onMounted(() => {
      getGenreList();
      fetchSearchedMovies(currentPage.value);
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      movieItems,
      currentPage,
      isScrollListening,
      loading,
      genreId,
      sortParams,
      orderParams,
      selectedFilterOption,
      filters,
      resetFilters,
      getGenreList,
      fetchSearchedMovies,
      goTop,
      handleScroll,
      selectOption,
    };
  }
};
</script>

<style scoped>
.reset-button {
  width: 100px;
  margin: 16px;
}
</style>
