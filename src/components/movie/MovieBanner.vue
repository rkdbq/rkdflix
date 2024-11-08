<template>
  <div class="movie-item">
    <div class="poster-container">
      <img :src="backdropUrl" :alt="title" class="backdrop-image" />
      <div class="overlay">
        <h1 class="title">{{ title }}</h1>
        <p class="overview">{{ overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

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

    return {
      backdropUrl
    }
  }
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
}
.title {
  margin: 16px;
}
.overview {
  margin: 16px;
  text-align: justify;
}
</style>
