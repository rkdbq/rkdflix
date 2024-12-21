<template>
  <div class="app-container">
    <header v-if="!isSignInRoute && !isErrorRoute" class="header-container">
      <nav class="nav-main">
        <RouterLink class="nav-item nav-route" to="/"><span><img class="logo" src="./assets/logo.png" alt="홈"/></span></RouterLink>
        <RouterLink class="nav-item nav-route" to="/"><FontAwesomeIcon :icon="faHouse" /> <span>홈</span></RouterLink>
        <RouterLink class="nav-item nav-route" to="/popular"><FontAwesomeIcon :icon="faFire" /> <span>인기</span></RouterLink>
        <RouterLink class="nav-item nav-route" to="/search"><FontAwesomeIcon :icon="faSearch" /> <span>검색</span></RouterLink>
        <RouterLink class="nav-item nav-route" to="/wishlist"><FontAwesomeIcon :icon="faHeart" /> <span>위시리스트</span></RouterLink>
      </nav>
      <nav class="nav-user">
        <p v-if="userNickname" class="user-info">{{ userNickname }} 님</p>
        <p v-else class="user-info">{{ userId }} 님</p>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faFire, faHeart, faHouse, faSearch} from "@fortawesome/free-solid-svg-icons";

const route = useRoute();
const router = useRouter();
const isSignInRoute = computed(() => route.path === '/sign-in');
const isErrorRoute = computed(() => route.path === '/error');

const store = useStore();
const userId = computed(() => store.state.user.userId);
const userNickname = computed(() => store.state.user.nickname);

const LogOut = () => {
  localStorage.removeItem('remember_me');
  localStorage.removeItem('access_token');
  router.push('/sign-in');
}

onMounted(() => {
  if(store.state.user.userId === null) {
    router.push('/sign-in');
  }

  const handleOffline = () => {
    console.error('오프라인 상태 감지!');
    router.push('/error'); // 에러 페이지로 라우팅
  };

  // 네트워크 상태 이벤트 리스너 등록
  window.addEventListener('offline', handleOffline);

  return () => {
    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    window.removeEventListener('offline', handleOffline);
  };
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

.logo {
  width: 20px;
  height: 20px;
  margin: 2px;
  transition: scale 0.1s ease;
}

.logo:hover {
  scale: 1.1;
}

.nav-route {
  padding: 10px 0;
}

@media (max-width: 768px) {
  .nav-item {
    gap: 0; /* 아이콘 간격 제거 */
  }

  .nav-item span {
    display: none; /* 모바일에서 텍스트 숨김 */
  }
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
