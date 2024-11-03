<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trend">Trend</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/my-list">My List</RouterLink>
    </nav>
  </header>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <main>
    <RouterView />
  </main>
</template>

<script>
export default {
  name: 'App',
  components: {
  }

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
  justify-content: flex-start; /* 좌측 정렬 */
  align-items: center;
  padding: 10px;
}

nav {
  display: flex;
  gap: 20px; /* 링크 간격 */
}
</style>
