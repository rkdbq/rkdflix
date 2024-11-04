<script>
export default {
  name: "SignIn",
  methods: {
    LogIn() {
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <div>
    <button @click="LogIn">Log In</button>
  </div>
</template>

<style scoped>

</style>