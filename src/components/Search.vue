<template>
  <div class="search-container">
    <div class="search-view">
      <h1 class="list-name">Search</h1>
      <div class="filter-container">
        <Filter
            v-for="[filterType, options] in Object.entries(filters)"
            :key="filterType"
            :filter-type="filterType"
            :options="options"
            :selected-option="selectedFilterOption[filterType]"
            @on-option-selected="selectOption"
        />
        <RkdButton :on-click="resetFilters"><FontAwesomeIcon :icon="faRotateRight()" /></RkdButton>
      </div>
    </div>

    <MovieScrollView :go-top="goTop" :movie-items="movieItems"/>

    <Loading :isLoading="loading"/>
  </div>
</template>

<script>
import {computed, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import Filter from "@/components/etc/Filter.vue";
import Loading from "@/components/etc/Loading.vue";
import MovieScrollView from "@/components/movie/MovieScrollView.vue";
import RkdButton from "@/components/etc/RkdButton.vue";
import {useStore} from "vuex";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

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
  methods: {
    faRotateRight() {
      return faRotateRight
    }
  },
  components: {FontAwesomeIcon, RkdButton, MovieScrollView, Filter, Loading },
  setup() {
    const store = useStore();

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
    const selectedFilterOption = computed(
    () => store.state.user.search,
    );
    const filters = reactive({
      'genre': [],
      'vote avg': ['0-2', '2-4', '4-6', '6-8', '8-10'],
      'sort by': ['인기순', '이름순', '별점순'],
      'order by': ['오름차순', '내림차순'],
    });

    const resetFilters = () => {
      store.state.user.search['genre'] = "장르";
      store.state.user.search['vote avg'] = "별점";
      store.state.user.search['sort by'] = "기준";
      store.state.user.search['order by'] = "순서";

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
          .finally(() => {
            fetchSearchedMovies(currentPage.value);
          })
    };

    const fetchSearchedMovies = (page) => {
      loading.value = true;

      const pathParam = "movie"
      const language = "ko";
      const genre = store.state.user.search['genre'];
      const voteAverage = store.state.user.search['vote avg'];
      const sortBy = store.state.user.search['sort by'];
      const orderBy = store.state.user.search['order by'];

      let queryUrl = url + `${pathParam}?language=${language}&page=${page}`;
      if (genre !== "장르" && genreId[genre]) {
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
      store.dispatch('updateMovieSearchOption', payload);

      movieItems.value = [];
      currentPage.value = 1;
      fetchSearchedMovies(currentPage.value);
    };

    onBeforeMount(() => {
      getGenreList();
    })
    onMounted(async () => {
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
.search-container {
  margin: 16px;
}
.search-view {
  display: flex;
  justify-content: space-between;
}
.list-name {
  margin-left: 16px;
  margin-bottom: 0;
}
.filter-container {
  justify-content: flex-end;
  margin: 16px;
}
.filter-container button {
  margin: 16px;
}
</style>
