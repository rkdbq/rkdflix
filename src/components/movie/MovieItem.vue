<template>
  <div class="movie-item" @click="toggleToWishlist">
    <div class="poster-container" :class="{'in-wishlist': isInWishlist}">
      <img :src="posterUrl" :alt="title" />
      <p :style="voteAverageStyle" class="vote-box">{{ roundedVoteAverage }}</p>
    </div>
    <p class="title" v-if="showInfo">{{ title }}</p>
    <p v-if="showInfo">{{ truncatedOverview }}</p>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';

const url = "https://image.tmdb.org/t/p/original";

export default {
  name: "MovieItem",
  props: {
    id: Number,
    title: String,
    posterPath: String,
    overview: {
      type: String,
      default: '',
    },
    voteAverage: Number,
    showInfo: Boolean,
  },
  setup(props) {
    const store = useStore();
    const { id, title, posterPath, overview, voteAverage } = toRefs(props);

    // Computed properties
    const posterUrl = computed(() => url + posterPath.value);
    const roundedVoteAverage = computed(() => Math.round(voteAverage.value * 10) / 10);

    const voteAverageStyle = computed(() => {
      let color;
      if (roundedVoteAverage.value >= 8) {
        color = "green";
      } else if (roundedVoteAverage.value >= 4) {
        color = "orange";
      } else {
        color = "red";
      }
      return {
        backgroundColor: color,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        display: "inline-block",
        fontWeight: "bold"
      };
    });

    const truncatedOverview = computed(() => {
      return overview.value.length > 50
          ? overview.value.substring(0, 50) + '...'
          : overview.value;
    });

    const isInWishlist = computed(() => {
      return store.state.user.wishlist[id.value];
    });

    // Methods
    const toggleToWishlist = () => {
      const movieItem = {
        id: id.value,
        title: title.value,
        poster_path: posterPath.value,
        overview: overview.value,
        vote_average: voteAverage.value,
      };
      store.dispatch('toggleMovieInWishlist', movieItem);
    };

    return {
      posterUrl,
      voteAverageStyle,
      roundedVoteAverage,
      truncatedOverview,
      isInWishlist,
      toggleToWishlist,
    };
  }
};
</script>

<style scoped>
.movie-item {
  width: 200px;
}
.movie-item:hover {
  transform: scale(1.05);
}
img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
.poster-container {
  position: relative;
  width: 100%;
}
.poster-container.in-wishlist {
  border: 2px solid gold;
}
.vote-box {
  position: absolute;
  right: 15px;
  text-align: center;
}
.title {
  font-weight: bold;
}
</style>
