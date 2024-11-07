<template>
  <header v-if="!isSignInRoute">
    <nav>
      <RouterLink class="nav-item" to="/">Home</RouterLink>
      <RouterLink class="nav-item" to="/popular">Popular</RouterLink>
      <RouterLink class="nav-item" to="/search">Search</RouterLink>
      <RouterLink class="nav-item" to="/wishlist">Wishlist</RouterLink>
    </nav>
    <nav class="nav-logout">
      <p class="nav-item">{{userId}} 님</p>
      <button class="nav-item" @click="LogOut">로그아웃</button>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const isSignInRoute = computed(() => route.path === '/sign-in');

const store = useStore();
const userId = computed(() => store.state.user.userId);

const LogOut = () => {
  localStorage.removeItem('remember_me');
  router.push('/sign-in');
}
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
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
nav {
  display: flex;
  gap: 20px; /* 링크 간격 */
}
.nav-logout {
  gap: 0;
}
.nav-item {
  margin: 0;
  padding: 10px;
}
</style>
