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
    <MovieTableView :current-page="currentPage" :movie-items="movieItems" :next-page="nextPage" :prev-page="prevPage"/>
  </div>

  <div v-if="viewOption === 'scroll'">
    <MovieScrollView :go-top="goTop" :movie-items="movieItems"/>
  </div>

  <Loading :isLoading="loading"/>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import Loading from "@/components/etc/Loading.vue";
import MovieScrollView from "@/components/movie/MovieScrollView.vue";
import MovieTableView from "@/components/movie/MovieTableView.vue";

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
  components: {MovieTableView, MovieScrollView, Loading},
  setup() {
    const movieItems = ref([]);
    const currentPage = ref(1);
    const viewOption = ref("grid");
    const isScrollListening = ref(true);
    const loading = ref(false);

    const fetchPopularMovies = (page) => {
      loading.value = true;
      const endpoint = `${url}${page}`;

      fetch(endpoint, options)
          .then(res => res.json())
          .then(json => {
            if (viewOption.value === "grid") {
              movieItems.value = json['results'];
            } else {
              movieItems.value.push(...json['results']);
            }
          })
          .catch(err => console.error(err))
          .finally(() => {
            loading.value = false;
          });
    };

    const nextPage = () => {
      currentPage.value++;
      fetchPopularMovies(currentPage.value);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchPopularMovies(currentPage.value);
      }
    };

    const goTop = () => {
      window.scrollTo(0, 0);
    };

    const setViewOption = (option) => {
      viewOption.value = option;
      currentPage.value = 1;
      fetchPopularMovies(currentPage.value);
    };

    const handleScroll = () => {
      if (isScrollListening.value && viewOption.value === "scroll") {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 5) {
          isScrollListening.value = false;
          currentPage.value++;
          fetchPopularMovies(currentPage.value);

          setTimeout(() => {
            isScrollListening.value = true;
          }, 1000);
        }
      }
    };

    onMounted(() => {
      fetchPopularMovies(currentPage.value);
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      movieItems,
      currentPage,
      viewOption,
      isScrollListening,
      loading,
      nextPage,
      prevPage,
      goTop,
      setViewOption,
    };
  },
};
</script>

<style scoped>
.select-view-container {
  display: flex;
  justify-content: flex-end;
  margin: 16px;
}

.pagination button {
  margin: 0 10px;
}
.go-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
