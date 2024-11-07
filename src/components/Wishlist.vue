<template>
  <div>
    <h1>Wishlist</h1>

    <MovieScrollView :go-top="goTop" :movie-items="wishlist" :show-info="false"/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MovieScrollView from "@/components/movie/MovieScrollView.vue";

export default {
  name: "WishList",
  components: {MovieScrollView },
  setup() {
    const store = useStore();
    const wishlist = computed(() => Object.values(store.state.user.wishlist));

    const goTop = () => {
      window.scrollTo(0, 0);
    };

    return { wishlist, goTop };
  },
};
</script>
