<template>
  <div class="app-container">
    <header v-if="!isSignInRoute" class="header-container">
      <nav class="nav-main">
        <RouterLink class="nav-item nav-route" to="/">Home</RouterLink>
        <RouterLink class="nav-item nav-route" to="/popular">Popular</RouterLink>
        <RouterLink class="nav-item nav-route" to="/search">Search</RouterLink>
        <RouterLink class="nav-item nav-route" to="/wishlist">Wishlist</RouterLink>
      </nav>
      <nav class="nav-user">
        <p class="user-info">{{ userId }} 님</p>
        <div class="logout-button">
          <RkdButton class="logout-button" :on-click="LogOut">로그아웃</RkdButton>
        </div>
      </nav>
    </header>
    <main class="main-content">
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
/* 넷플릭스 스타일 CSS */
body {
  margin: 0;
  background-color: #141414;
}
.app-container {
  font-family: Arial, sans-serif;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #141414;
  border-bottom: 1px solid #333;
}

.nav-main,
.nav-user {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #f6121d;
}

.nav-route {
  padding: 10px 0;
}

.user-info {
  font-size: 14px;
  color: #aaa;
}

.logout-button button {
  padding: 8px 16px;
  background-color: #e50914;
}

.logout-button button:hover {
  background-color: #f6121d;
}

.main-content {
  flex-grow: 1;
}

</style>
