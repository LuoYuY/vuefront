<template>
  <div id="MyCourse">
    <div class="content">
      <aside class="left">
        <div style="background:#eee;padding: 20px" >
          <Card :bordered="false"  v-for="(item,index) in classes" :key="index">
<!--            <p slot="title"> <a v-on:click="getDetail(item.id)">{{ item.name }}({{ item}})</a></p>-->
            <p slot="title"><a v-on:click="getDetail(item.id,item.courseId)">{{ item.name }}</a></p>
<!--            <p slot="content"> {{ item.courseName }} {{ item.teacherName }}</p>-->
          </Card>
        </div>
      </aside>
      <section class="right">
        <!--          <router-view></router-view>-->
<!--        <h1>{{ className }}</h1>-->
        <h2>所属课程： {{ courseName }}</h2>
<!--        <h1>小班目录</h1>-->
<!--        <h2>进行中</h2>-->
<!--        <h3 v-for="(item,index) in classes" :key="index" >{{ item.name }}</h3>-->
<!--        <h2>已结束</h2>-->
<!--        <h3>结束了的小班链接</h3>-->
        <h1>课件目录</h1>
        <div style="background:#eee;padding: 20px" >
          <Card :bordered="false"  v-for="(item,index) in courseWare" :key="index">
            <p slot="title"> <a :href="item.filepath">{{ item.filename }} </a></p>
          </Card>
        </div>
          <h1>作业目录</h1>
          <div>
              <Card :bordered="false"  v-for="(item,index) in tasks" :key="index">
                  <p style="cursor:pointer" slot="title" v-on:click="toTaskDetail(item.id)">{{ item.title }}</p>
              </Card>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AllClass',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        courseName: null,
        // courseId: null,
        classes: [],
        courseWare: [],
        tasks: []
      }
    },
    mounted: function () {
      this.getClasses()
    },
    methods: {
      getClasses () {
        this.classes = []
        this.$axios.get('/stu/getClassesList?studentId=' + this.currentUser.id)
          .then((response) => {
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name,
                courseName:array[i].courseName,
                teacherName:array[i].teacherName,
                courseId:array[i].courseId
              }
              this.classes.push(obj)
              // console.log(this.courses)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      toTaskDetail (taskId) {
        let routeData = this.$router.resolve({ name: 'taskDetailStu', query: { taskId: taskId } })
        window.open(routeData.href, '_blank')
      },
      getDetail (classId, courseId) {
        this.courseWare = []
        // this.classId = courseId
        // 课程信息填充
        this.$axios.get('/tch/getCourseDetail?courseId=' + courseId)
          .then((response) => {
            // console.log(response)
            this.courseName = response.data.data.course.name
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data.courseWare))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                filename: array[i].filename,
                filepath: array[i].filepath,
                uploadDate: array[i].uploadDate
              }
              this.courseWare.push(obj)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
        // 小课作业填充
        this.$axios.get('/stu/getTaskList?classId=' + classId)
          .then((response) => {
            // console.log(response)
            this.tasks = []
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                title: array[i].title
              }
              this.tasks.push(obj)
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
  #MyCourse {
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
</style>
