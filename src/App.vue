<template>
  <header>
    <nav v-if="!isSignInRoute">
      <RouterLink class="nav-item" to="/">Home</RouterLink>
      <RouterLink class="nav-item" to="/popular">Popular</RouterLink>
      <RouterLink class="nav-item" to="/search">Search</RouterLink>
      <RouterLink class="nav-item" to="/wishlist">Wishlist</RouterLink>
    </nav>
    <nav v-if="!isSignInRoute">
      <RouterLink class="nav-item" to="/signin">Log Out</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isSignInRoute = computed(() => route.path === '/signin');
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
  gap: 20px; /* 링크 간격 */
}
.nav-item {
  padding: 10px;
}
</style>
