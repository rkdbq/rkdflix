<template>
  <MovieGrid :movie-items="movieItems" :show-info="showInfo" />
  <div class="go-top-button">
    <RkdButton :on-click="goTop"><FontAwesomeIcon :icon="faArrowUp()" /></RkdButton>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MovieGrid from "@/components/movie/MovieGrid.vue";
import RkdButton from "@/components/etc/RkdButton.vue";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: 'MovieScrollView',
  methods: {
    faArrowUp() {
      return faArrowUp
    }
  },
  components: {FontAwesomeIcon, RkdButton, MovieGrid },
  props: {
    goTop: {
      type: Function,
      required: true
    },
    movieItems: {
      type: Array,
      required: true
    },
    showInfo: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.go-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
