<template>
  <div>
    <h1>{{ listName }}</h1>
    <div class="slider">
      <button @click="prevSlide" class="arrow left-arrow">❮</button>
      <div class="movie-grid" ref="slider">
        <MovieItem
            v-for="item in movieItems"
            :key="item['id']"
            :id="item['id']"
            :title="item['title']"
            :posterPath="item['poster_path']"
            :overview="item['overview']"
            :voteAverage="item['vote_average']"
            :show-info="true"
        />
      </div>
      <button @click="nextSlide" class="arrow right-arrow">❯</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import MovieItem from "@/components/movie/MovieItem.vue";

export default defineComponent({
  name: 'MovieSliderView',
  components: { MovieItem },
  props: {
    listName: {
      type: String,
      required: true
    },
    movieItems: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const slider = ref(null);

    const nextSlide = () => {
      if (slider.value) {
        slider.value.scrollBy({
          top: 0,
          left: slider.value.clientWidth,
          behavior: 'smooth'
        });
      }
    };

    const prevSlide = () => {
      if (slider.value) {
        slider.value.scrollBy({
          top: 0,
          left: -slider.value.clientWidth,
          behavior: 'smooth'
        });
      }
    };

    onMounted(() => {
      console.log(props.movieItems);
    });

    return {
      slider,
      nextSlide,
      prevSlide,
    };
  }
});
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden; /* 슬라이더 밖으로 넘치는 요소 숨김 */
}

.movie-grid {
  display: flex;
  overflow-x: auto; /* 수평 스크롤 가능 */
  scroll-behavior: smooth; /* 스크롤 애니메이션 효과 */
  width: 100%;
  padding: 10px 0; /* 패딩 추가 */
  gap: 16px;
}

.movie-grid::-webkit-scrollbar {
  display: none; /* Chrome/Safari용 */
}

.arrow {
  background-color: transparent;
  border: none;
  color: grey;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
}

/* hover 효과 */
.arrow:hover {
  color: black;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>
