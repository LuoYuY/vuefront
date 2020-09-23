<template>
  <div>
    <banner></banner>
    <password-forget></password-forget>
  </div>
</template>

<script>
  import Banner from './Banner'
  import FormPasswordForget from './FormPasswordForget'
  export default {
    name: 'PagePasswordForget',
    components: {
      'password-forget': FormPasswordForget,
      'banner': Banner
    }
  }
</script>

<style scoped>

</style>
