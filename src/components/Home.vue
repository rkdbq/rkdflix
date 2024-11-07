<template>
  <MovieSliderView :list-name="'Now Playing'" :movie-items="movieItemsMap['now_playing']"/>
  <MovieSliderView :list-name="'Top Rated'" :movie-items="movieItemsMap['top_rated']"/>
  <MovieSliderView :list-name="'Upcoming'" :movie-items="movieItemsMap['upcoming']"/>

  <Loading :isLoading="loading"/>
</template>

<script>
import { ref, onMounted } from 'vue';
import MovieSliderView from "@/components/movie/MovieSliderView.vue";
import Loading from "@/components/etc/Loading.vue";

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
  components: { MovieSliderView, Loading },
  setup() {
    const movieItemsMap = ref(Map);
    const loading = ref(false);

    const fetchMovies = (pathParam) => {
      loading.value = true;

      const language = "ko";
      const page = 1;

      fetch(`${url}${pathParam}?language=${language}&page=${page}`, options)
          .then(res => res.json())
          .then(json => {
            movieItemsMap.value[pathParam] = json['results'];
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
      loading,
    };
  },
};
</script>
