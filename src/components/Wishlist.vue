<template>
  <div class = "wishlist-container">
    <div class="wishlist-view">
      <h1 class="list-name">Wishlist</h1>
      <div class="margin-container"></div>
    </div>

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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return { wishlist, goTop };
  },
};
</script>
<style scoped>
.wishlist-container {
  margin: 16px;
}
.wishlist-view {
  display: flex;
  justify-content: space-between;
}
.list-name {
  margin-left: 16px;
  margin-bottom: 32px;
}
.margin-container {
  justify-content: flex-end;
  margin: 16px;
}
</style>