<template>
<div>
  <banner></banner>
  <task-detail></task-detail>
</div>
</template>

<script>
  import BannerStudent from '../components/BannerStudent'
  import TaskDetailStu from '../components/TaskDetailStu'
  export default {
    name: 'PageTaskDetailStu',
    components: {
      'banner': BannerStudent,
      'task-detail': TaskDetailStu
    }
  }
</script>

<style scoped>

</style>
