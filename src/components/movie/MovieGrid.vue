<template>
  <div class="movie-grid-container">
    <div class="movie-grid">
      <TransitionGroup name="list">
        <MovieItem
            v-for="item in movieItems"
            :key="item['id']"
            :id="item['id']"
            :posterPath="item['poster_path']"
            :voteAverage="item['vote_average']"
            :overview="item['overview']"
            :title="item['title']"
            :show-info="showInfo"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MovieItem from "@/components/movie/MovieItem.vue";

export default defineComponent({
  name: 'MovieGrid',
  components: { MovieItem },
  props: {
    movieItems: {
      type: Array,
      required: true
    },
    showInfo: {
      type: Boolean,
      default: false,
    }
  },
});
</script>

<style scoped>
.movie-grid-container {
  display: flex;
  justify-content: center;
}

.movie-grid {
  display: grid; /* 그리드 레이아웃 사용 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  justify-items: center;
}

.pagination button {
  margin: 0 10px;
}

.list-move, /* 움직이는 엘리먼트에 트랜지션 적용 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

/* 이동 애니메이션을 올바르게 계산할 수 있도록
   레이아웃 흐름에서 나머지 항목을 꺼내기. */
.list-leave-active {
  position: absolute;
}
</style>
