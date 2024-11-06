<script>
import MovieList from "@/components/movie/MovieList.vue";

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
  components: {MovieList},
  data() {
    return {
      movieItemsMap: {},
    }
  },
  mounted() {
    console.log(this.$store.state.user);
    this.fetchMovies('now_playing');
    this.fetchMovies('top_rated');
    this.fetchMovies('upcoming');
  },
  methods: {
    fetchMovies(pathParam) {
      const language = "ko";
      const page = 1;

      fetch(`${url}${pathParam}?language=${language}&page=${page}`, options)
          .then(res => res.json())
          .then(json => {
            this.movieItemsMap[pathParam] = json['results'];
          })
          .catch(err => console.error(err));
    },
  },
}
</script>

<template>
  <MovieList :list-name="'Now Playing'" :movie-items="movieItemsMap['now_playing']"/>
  <MovieList :list-name="'Top Rated'" :movie-items="movieItemsMap['top_rated']"/>
  <MovieList :list-name="'Upcoming'" :movie-items="movieItemsMap['upcoming']"/>
</template>