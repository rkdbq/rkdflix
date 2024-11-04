<script>
import MovieList from "@/components/MovieList.vue";

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
      MovieItemsMap: {},
    }
  },
  mounted() {
    this.fetchMovies('now_playing');
    this.fetchMovies('top_rated');
    this.fetchMovies('upcoming');

    console.log(this.MovieItemsMap);
  },
  methods: {
    fetchMovies(key) {
      const language = "en-US";
      const page = 1;

      fetch(`${url}${key}?language=${language}&page=${page}`, options)
          .then(res => res.json())
          .then(json => {
            this.MovieItemsMap[key] = json['results'];
          })
          .catch(err => console.error(err));
    },
  }
}
</script>

<template>
  <MovieList :list-name="'Now Playing'" :movie-items="MovieItemsMap['now_playing']"/>
  <MovieList :list-name="'Top Rated'" :movie-items="MovieItemsMap['top_rated']"/>
  <MovieList :list-name="'Upcoming'" :movie-items="MovieItemsMap['upcoming']"/>
</template>