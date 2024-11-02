<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/trend">Trend</RouterLink>
    <RouterLink to="/search">Search</RouterLink>
    <RouterLink to="/my-list">My List</RouterLink>
  </nav>
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
  margin-top: 60px;
}
</style>
