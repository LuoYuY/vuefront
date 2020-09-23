<template>
<div>
  <banner></banner>
  <login-form></login-form>
</div>
</template>

<script>
  import LoginForm from './LoginForm'
  import Banner from './Banner'
  export default {
    name: 'PageLogin',
    components:{
      'login-form': LoginForm,
      'banner': Banner
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
</style>
