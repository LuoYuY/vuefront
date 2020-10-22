<template>
  <div>
    <banner></banner>
    <password-forget></password-forget>
  </div>
</template>

<script>
  import Banner from '../components/Banner'
  import FormPasswordForget from '../components/FormPasswordForget'
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
