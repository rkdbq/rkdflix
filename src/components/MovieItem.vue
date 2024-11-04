<script>
const url = "https://image.tmdb.org/t/p/original"

export default {
  name: "MovieItem",
  props: ['title', 'posterPath', 'overview', 'voteAverage'],
  computed: {
    posterUrl() {
      return url + this.posterPath
    },
    voteAverageStyle() {
      let color;
      if (this.roundedVoteAverage >= 8) {
        color = "green";
      } else if (this.roundedVoteAverage >= 4) {
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
      }
    },
    roundedVoteAverage() {
      return Math.round(this.voteAverage * 10) / 10
    },
    truncatedOverview() {
      // overview가 30자 이상일 경우 잘라내고 '...'을 추가
      return this.overview.length > 50
          ? this.overview.substring(0, 50) + '...'
          : this.overview;
    },
  }
}
</script>

<template>
  <div class="movie-item">
    <div class="poster-container">
      <img :src="posterUrl" :alt="title" />
      <p :style="voteAverageStyle" class="vote-box">{{ roundedVoteAverage }}</p>
    </div>
    <p class="title" v-if="title">{{ title }}</p>
    <p v-if="overview">{{truncatedOverview}}</p>
  </div>
</template>

<style scoped>
.movie-item {
  width: 200px; /* 카드 너비 */
}
img {
  width: 200px; /* 원하는 너비 */
  height: 300px; /* 원하는 높이 */
  object-fit: cover; /* 이미지 비율을 유지하면서 잘림 없이 조정 */
  border-radius: 8px; /* 원하는 경우 모서리를 둥글게 */
}
.poster-container {
  position: relative;
  width: 100%;
}
.vote-box {
  position: absolute;
  right: 15px;
  text-align: center;
}
</style>