<template>
  <div class="app-container">
    <header v-if="!isSignInRoute">
      <nav>
        <RouterLink class="nav-item nav-route" to="/">Home</RouterLink>
        <RouterLink class="nav-item nav-route" to="/popular">Popular</RouterLink>
        <RouterLink class="nav-item nav-route" to="/search">Search</RouterLink>
        <RouterLink class="nav-item nav-route" to="/wishlist">Wishlist</RouterLink>
      </nav>
      <nav class="nav-logout">
        <p class="nav-item">{{userId}} 님</p>
        <RkdButton class="nav-item" :on-click="LogOut">로그아웃</RkdButton>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRoute, useRouter} from 'vue-router';
import {computed, onMounted} from 'vue';
import RkdButton from "@/components/etc/RkdButton.vue";

const route = useRoute();
const router = useRouter();
const isSignInRoute = computed(() => route.path === '/sign-in');

const store = useStore();
const userId = computed(() => store.state.user.userId);

const LogOut = () => {
  localStorage.removeItem('remember_me');
  router.push('/sign-in');
}

onMounted(() => {
  if(store.state.user.userId === null) {
    router.push('/sign-in');
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  position: fixed;
  top: 0;
  left: 5px;
  right: 5px;
  width: 98%;
  background-color: rgba(255, 255, 255, 0.90);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 헤더 그림자 추가 */
  z-index: 1000; /* 다른 요소 위로 표시 */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

main {
  margin-top: 70px; /* header 높이만큼 마진 추가 */
}
nav {
  display: flex;
  gap: 20px; /* 링크 간격 */
}
.nav-logout {
  gap: 0;
}
.nav-item {
  position: relative;
  padding: 10px;
  margin: 0 8px;
}
.nav-route {
  position: relative;
  padding: 10px;
  color: #333;
  font-weight: bold;
  text-decoration: none;
  margin: 0 8px;
}
.nav-route::after {
  content: '';
  position: absolute;
  bottom: -2px; /* 텍스트와 선 사이의 거리 */
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #000000, #ca2222);
  transition: width 0.3s ease;
}

.nav-route:hover::after {
  width: 100%; /* hover 시 전체 너비로 확장 */
}
</style>
