<template>
  <div class="home-container">
    <MovieBanner
        :id="firstMovie['now_playing']['id']"
        :title="firstMovie['now_playing']['title']"
        :backdrop-path="firstMovie['now_playing']['backdrop_path']"
        :overview="firstMovie['now_playing']['overview']"
    />

    <MovieSliderView :list-name="'Now Playing'" :movie-items="movieItemsMap['now_playing']"/>
    <MovieSliderView :list-name="'Top Rated'" :movie-items="movieItemsMap['top_rated']"/>
    <MovieSliderView :list-name="'Upcoming'" :movie-items="movieItemsMap['upcoming']"/>

    <Loading :isLoading="loading"/>
  </div>
</template>

<script>
import {ref, onMounted, reactive } from 'vue';
import MovieSliderView from "@/components/movie/MovieSliderView.vue";
import Loading from "@/components/etc/Loading.vue";
import MovieBanner from "@/components/movie/MovieBanner.vue";

const url = 'https://api.themoviedb.org/3/movie/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "HomePage",
  components: {MovieBanner, MovieSliderView, Loading },
  setup() {
    const movieItemsMap = reactive({
          'now_playing': [],
          'top_rated': [],
          'upcoming': [],
        },
    );
    const firstMovie = reactive({
          'now_playing': {},
          'top_rated': {},
          'upcoming': {},
        },
    );
    const loading = ref(false);

    const fetchMovies = (pathParam) => {
      loading.value = true;

      const language = "ko";
      const page = 1;

      fetch(`${url}${pathParam}?language=${language}&page=${page}`, options)
          .then(res => res.json())
          .then(json => {
            movieItemsMap[pathParam] = json['results'];
            firstMovie[pathParam] = json['results'][0];
          })
          .catch(err => console.error(err))
          .finally(() => {
            loading.value = false;
          });
    };

    onMounted(() => {
      fetchMovies('now_playing');
      fetchMovies('top_rated');
      fetchMovies('upcoming');
    });

    return {
      movieItemsMap,
      firstMovie,
      loading,
    };
  },
};
</script>
<style scoped>
.home-container {
  margin: 16px;
}
</style>
