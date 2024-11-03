<script>
import MovieItem from "@/components/MovieItem.vue";

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "HomePage",
  components: {MovieItem},
  data() {
    return {
      movieItems: {}
    }
  },
  mounted() {
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
          // 데이터를 성공적으로 가져온 후 title에 할당
          this.movieItems = json['results'][2];
        })
        .catch(err => console.error(err));
  }
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <MovieItem
        :title="movieItems['title']"
    />
  </div>
</template>

<style scoped>

</style>