<template>
  <div class="popular-container">
    <div class="popular-view">
      <h1 class="category">Popular</h1>
      <div class="select-view-container">
        <RkdButton :on-click="toggleViewOption" :disabled="viewOption === 'scroll'">스크롤</RkdButton>
        <RkdButton :on-click="toggleViewOption" :disabled="viewOption === 'grid'">그리드</RkdButton>
      </div>
    </div>

    <div v-if="viewOption === 'grid'">
      <MovieTableView :table-page="tablePage" :index-from="indexFrom" :index-to="indexTo" :movie-items="movieItems" :next-page="nextPage" :prev-page="prevPage"/>
    </div>

    <div v-if="viewOption === 'scroll'">
      <MovieScrollView :go-top="goTop" :movie-items="movieItems"/>
    </div>

    <Loading :isLoading="loading"/>
  </div>
</template>

<script>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import Loading from "@/components/etc/Loading.vue";
import MovieScrollView from "@/components/movie/MovieScrollView.vue";
import MovieTableView from "@/components/movie/MovieTableView.vue";
import RkdButton from "@/components/etc/RkdButton.vue";

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
  components: {RkdButton, MovieTableView, MovieScrollView, Loading},
  setup() {
    const movieItems = ref([]);
    const currentPage = ref(1);
    const viewOption = ref("grid");
    const isScrollListening = ref(true);
    const loading = ref(false);
    const indexFrom = ref(0);
    const sliceSize = ref(10);
    const tablePage = ref(1);

    const indexTo = computed(() => {
      return Number(indexFrom.value + sliceSize.value);
    });

    const fetchPopularMovies = (page) => {
      loading.value = true;
      const endpoint = `${url}${page}`;

      fetch(endpoint, options)
          .then(res => res.json())
          .then(json => {
            movieItems.value.push(...json['results']);
          })
          .catch(err => console.error(err))
          .finally(() => {
            loading.value = false;
          });
    };

    const nextPage = () => {
      if (indexTo.value + sliceSize.value >= movieItems.value.length) {
        currentPage.value++;
        fetchPopularMovies(currentPage.value);
      }

      tablePage.value++;
      indexFrom.value += sliceSize.value;
    };

    const prevPage = () => {
      if (tablePage.value > 1) {
        tablePage.value--;
        indexFrom.value -= sliceSize.value;
      }
    };

    const goTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const toggleViewOption = () => {
      if (viewOption.value === "scroll") {
        setViewOption('grid');
      }
      else {
        setViewOption('scroll');
      }
    }

    const setViewOption = (option) => {
      viewOption.value = option;
      currentPage.value = 1;
      tablePage.value = 1;
      indexFrom.value = 0;

      movieItems.value = [];
      fetchPopularMovies(currentPage.value);

      document.body.style.overflow = option === "grid" ? 'hidden' : '';
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

    const updateSliceSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const gap = 16;

      sliceSize.value = Math.floor((width - 20 + gap) / (200 + gap)) * (Math.floor(height / 300) - 1);
      sliceSize.value = Math.max(1, sliceSize.value);
    };

    onMounted(() => {
      setViewOption('grid');
      window.addEventListener('scroll', handleScroll);

      updateSliceSize();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    });

    return {
      movieItems,
      viewOption,
      isScrollListening,
      loading,
      tablePage,
      sliceSize,
      indexFrom,
      indexTo,
      nextPage,
      prevPage,
      goTop,
      toggleViewOption,
    };
  },
};
</script>

<style scoped>
.popular-container {
  margin: 16px;
}
.popular-view {
  display: flex;
  justify-content: space-between;
}
.select-view-container {
  justify-content: flex-end;
  margin-top: 16px;
}
.select-view-container button {
  margin: 16px;
}

.category {
  margin-left: 16px;
  margin-bottom: 0;
}
</style>
