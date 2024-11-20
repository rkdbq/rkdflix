<template>
  <div class="movie-item">
    <div class="poster-container">
      <img
          :src="backdropUrl"
          :alt="title"
          class="backdrop-image"
          :class="{ loaded: isImageLoaded }"
          @load="handleImageLoad"
      />
      <div class="overlay">
        <h1 class="title">{{ title }}</h1>
        <p class="overview">{{ overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';

const url = "https://image.tmdb.org/t/p/original";

export default defineComponent({
  name: 'MovieBanner',
  props: {
    id: Number,
    title: String,
    backdropPath: String,
    overview: {
      type: String,
      default: '',
    },
    voteAverage: Number,
  },
  setup(props) {
    const backdropUrl = computed(() => url + props.backdropPath);
    const isImageLoaded = ref(false);

    const handleImageLoad = () => {
      isImageLoaded.value = true;
    };

    return {
      backdropUrl,
      isImageLoaded,
      handleImageLoad,
    };
  },
});
</script>

<style scoped>
.poster-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.backdrop-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0; /* 초기 상태에서는 투명 */
  transform: scale(1.05); /* 약간 확대 */
  transition: opacity 1s ease, transform 1s ease; /* 트랜지션 추가 */
}

.backdrop-image.loaded {
  opacity: 1; /* 로드 후 점차 나타남 */
  transform: scale(1); /* 원래 크기로 줄어듦 */
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35%;
  color: white;
  text-align: left;
  margin: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.poster-container:hover .overlay {
  opacity: 1;
}

.title {
  margin: 16px;
}

.overview {
  margin: 16px;
  text-align: justify;
}

</style>
