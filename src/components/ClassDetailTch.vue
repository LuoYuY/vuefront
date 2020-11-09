<template>
  <div id="ClassDetailTch">
    <div class="content">
      <aside class="left">
        <div style="margin-bottom: 20px">
          <Button v-on:click="toCreateTask()">发布作业</Button>
          <Button>发布考试</Button>
        </div>
        <h1 style="font-size: 20px">作业</h1>
        <div style="background:#eee;padding: 20px;margin-bottom: 20px">
          <Card :bordered="false" v-for="(item,index) in tasks" :key="index">
            <p style="cursor:pointer" slot="title" v-on:click="toTaskDetail(item.id)">{{ item.name }}</p>
          </Card>
        </div>
        <h1 style="font-size: 20px">考试</h1>
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
    computed: {
      key () {
        return this.$route.name ? this.$route.name + new Date() : this.$route + +new Date()
      }
    },
    methods: {
      toCreateTask () {
        this.$router.push({name: 'createTask', query: {classId: this.classId}})
      },
      toTaskDetail (taskId) {
        this.$router.push({name: 'taskDetailTch', query: {taskId: taskId}})
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
    flex: 0 0 25%; /* 左侧固定200px */
    height: 500px;
    background: #dbe0e6;
    margin-right: 20px;
    padding: 10px;
  }

  .right {
    /* 此处解释下
    flex: 1 1 0%
    0%表示此处宽度是按照自身内容宽度来，此处自身内容宽度为0，但是分配剩余的空间，所以可以自适应变化
     */
    flex: 1; /* 随父级变化 */
    min-height: 500px;
    background: white;
    border: 3px solid #dbe0e6;
    padding:10px;
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
