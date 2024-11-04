<script>
import MovieItem from "@/components/MovieItem.vue";

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIyYzM0Mzg5NDRjOWZhM2Y1OGM4ZWVhMTMwZmQ3MiIsIm5iZiI6MTczMDYwMDUxNy45MDUxNjQ3LCJzdWIiOiI2NzI2ZGQ5ZDU3NzIyYjU1NzE3YTk1NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lp6uHXXLkMDL02Ry0-3d_9niajSqhWRNcJbW2tnsXyw'
  }
};

export default {
  name: "HomePage",
  components: {MovieItem},
  data() {
    return {
      movieItems: []
    }
  },
  mounted() {
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
          // 데이터를 성공적으로 가져온 후 title에 할당
          this.movieItems = json['results'];
        })
        .catch(err => console.error(err));
  },
  methods: {
    next_slide() {
      const slider = this.$refs.slider;
      slider.scrollBy({
        top: 0,
        left: slider.clientWidth,
        behavior: 'smooth'
      });
    },
    prev_slide() {
      const slider = this.$refs.slider;
      slider.scrollBy({
        top: 0,
        left: -slider.clientWidth,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<template>
  <div>
    <h1>Now Playing</h1>
    <div class="slider">
      <button @click="prev_slide" class="arrow left-arrow">❮</button>
      <div class="movie-grid" ref="slider">
        <MovieItem
            v-for="item in movieItems"
            :key="item['id']"
            :title="item['title']"
            :poster_path="item['poster_path']"
            :overview="item['overview']"
            :vote_average="item['vote_average']"
        />
      </div>
      <button @click="next_slide" class="arrow right-arrow">❯</button>
    </div>
  </div>
</template>

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