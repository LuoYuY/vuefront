<template>
  <div id="ClassDetailTch">
    <div class="content">
      <aside class="left">
        <Button v-on:click="toCreateTask()">发布作业</Button>
        <Button>发布考试</Button>
        <h1>作业</h1>
        <div style="background:#eee;padding: 20px" >
          <Card :bordered="false"  v-for="(item,index) in tasks" :key="index">
            <p style="cursor:pointer" slot="title" v-on:click="toTaskDetail(item.id)">{{ item.name }}</p>
          </Card>
<!--          <span style="cursor:auto">auto</span><br>-->
<!--          <span style="cursor:crosshair">crosshair</span><br>-->
<!--          <span style="cursor:default">default</span><br>-->
<!--          <span style="cursor:e-resize">e-resize</span><br>-->
<!--          <span style="cursor:help">help</span><br>-->
<!--          <span style="cursor:move">move</span><br>-->
<!--          <span style="cursor:n-resize">n-resize</span><br>-->
<!--          <span style="cursor:ne-resize">ne-resize</span><br>-->
<!--          <span style="cursor:nw-resize">nw-resize</span><br>-->
<!--          <span style="cursor:pointer">pointer</span><br>-->
<!--          <span style="cursor:progress">progress</span><br>-->
<!--          <span style="cursor:s-resize">s-resize</span><br>-->
<!--          <span style="cursor:se-resize">se-resize</span><br>-->
<!--          <span style="cursor:sw-resize">sw-resize</span><br>-->
<!--          <span style="cursor:text">text</span><br>-->
<!--          <span style="cursor:w-resize">w-resize</span><br>-->
<!--          <span style="cursor:wait">wait</span><br>-->
        </div>
        <h1>考试</h1>
        <p>考试名称</p>
      </aside>
      <section class="right">
        <router-view :key="key"></router-view>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ClassDetailTch',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        classId: this.$route.query.id,
        tasks: []
      }
    },
    mounted: function () {
       this.getTasks()
    },
    computed:{
      key () {
        return this.$route.name ? this.$route.name + new Date() : this.$route + +new Date()
      }
    },
    methods: {
      toCreateTask () {
        this.$router.push({name:'createTask', query:{classId:this.classId}})
      },
      toTaskDetail (taskId) {
        this.$router.push({name:'taskDetailTch', query:{taskId:taskId}})
      },
      getTasks () {
        this.tasks = []
        this.$axios.get('/tch/getTaskList?classId=' + this.classId)
          .then((response) => {
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name
              }
              this.tasks.push(obj)
              // console.log(this.courses)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      }
    }
  }
</script>

<style scoped>
  #ClassDetailTch {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .content {
    width: 80%;
    margin-top: 100px;
    padding: 10px 10px 10px 10px;
    background: white;
    display: flex;
  }

  .left {
    flex: 0 0 400px; /* 左侧固定200px */
    height: 500px;
    background: lightblue;
  }
  .right {
    /* 此处解释下
    flex: 1 1 0%
    0%表示此处宽度是按照自身内容宽度来，此处自身内容宽度为0，但是分配剩余的空间，所以可以自适应变化
     */
    flex: 1; /* 随父级变化 */
    height: 500px;
    background: burlywood;
  }
</style>
<style>
  .ivu-card-body {
    display: none;
  }
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
