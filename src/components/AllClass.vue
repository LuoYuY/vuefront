<template>
  <div id="MyCourse">
    <div class="content">
      <aside class="left">
        <div style="background:#eee;padding: 20px">
          <Card :bordered="false" v-for="(item,index) in classes" :key="index">
            <!--            <p style="cursor:pointer" slot="title" v-on:getDetail="getDetail(item.id,item.courseId)">{{ item.name }}</p>-->
            <p slot="title"><a v-on:click="getDetail(item.id,item.courseId,item.name)">{{ item.name }}</a></p>
          </Card>
        </div>
      </aside>
      <section class="right">
        <!--          <router-view></router-view>-->
        <!--        <h1>{{ className }}</h1>-->
        <h1 style="font-size: 30px" v-if="className!==null"> {{ className }} </h1>
        <div class="text" v-if="courseName!==null">所属课程： {{ courseName }}</div>
        <!--        <h1>小班目录</h1>-->
        <!--        <h2>进行中</h2>-->
        <!--        <h3 v-for="(item,index) in classes" :key="index" >{{ item.name }}</h3>-->
        <!--        <h2>已结束</h2>-->
        <!--        <h3>结束了的小班链接</h3>-->
        <h1 v-if="courseWare.length > 0">课件目录</h1>
        <div v-if="courseWare.length > 0" style="background:#eee;padding: 20px">
          <div v-for="(item,index) in courseWare" :key="index">
            <Icon type="ios-attach" size=20 style="display: inline-block"/>
<!--            <a style="font-size: 15px" :href="item.filepath">{{ item.filename }} </a>-->
            <a style="font-size: 15px" v-on:click="downloadFile(item.filename, item.filepath)" >{{ item.filename }}</a>
          </div>
        </div>
        <h1 v-if="tasks.length > 0" style="margin-top:30px">作业目录</h1>
        <div class="task" v-for="(item,index) in tasks" :key="index" style="cursor:pointer">
          <Icon type="ios-cube" size=30 style="display: inline-block"/>
          <p style="display: inline-block" slot="title" v-on:click="toTaskDetail(item.id)">{{ item.title }}</p>
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
        tasks: [],
        className: null
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
                courseName: array[i].courseName,
                teacherName: array[i].teacherName,
                courseId: array[i].courseId
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
        let routeData = this.$router.resolve({name: 'taskDetailStu', query: {taskId: taskId}})
        window.open(routeData.href, '_blank')
      },
      downloadFile (fileName, data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      },
      getDetail (classId, courseId, className) {
        this.courseWare = []
        // this.classId = courseId
        // 课程信息填充
        this.className = className
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
    flex: 0 0 300px; /* 左侧固定200px */
    height: 500px;
    background: white;
    margin-right: 30px;
  }

  .right {
    /* 此处解释下
    flex: 1 1 0%
    0%表示此处宽度是按照自身内容宽度来，此处自身内容宽度为0，但是分配剩余的空间，所以可以自适应变化
     */
    flex: 1; /* 随父级变化 */
    height: 500px;
    background: white;
    border: 2px solid #dbe0e6;
    padding: 20px;
  }

  .text {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;

  }

  .task {
    width: 300px;
    margin-bottom: 10px;
    margin-left: 30px;
    font-size: 20px;
  }
</style>
<style>
  .ivu-card-body {
    display: none;
  }
</style>
