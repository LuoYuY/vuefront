<template>
  <div>
    <input type="text" placeholder="username"/>
    <input type="password" placeholder="password"/>
    <input type="text" placeholder="verify code"/>
    <router-link to="/account/password_reset">forget password?</router-link>
    <button>Login</button>
  </div>
</template>

<script>
  export default {
    name: 'LoginForm'
  }
</script>

<style scoped>

</style>
