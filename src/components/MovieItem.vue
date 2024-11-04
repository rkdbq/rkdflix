<script>
const url = "https://image.tmdb.org/t/p/original"

export default {
  name: "MovieItem",
  props: ['title', 'poster_path', 'overview', 'vote_average'],
  computed: {
    poster_url() {
      return url + this.poster_path
    },
    voteAverageStyle() {
      let color;
      if (this.rounded_vote_average >= 8) {
        color = "green";
      } else if (this.rounded_vote_average >= 4) {
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
    rounded_vote_average() {
      return Math.round(this.vote_average * 10) / 10
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
      <img :src="poster_url" :alt="title" />
      <p :style="voteAverageStyle" class="vote-box">{{ rounded_vote_average }}</p>
    </div>
    <p class="title">{{ title }}</p>
    <p>{{truncatedOverview}}</p>
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