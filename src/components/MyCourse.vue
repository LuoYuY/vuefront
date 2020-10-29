<template>
  <div id="MyCourse">
    <div class="content">
        <aside class="left">
          <Collapse>
            <Panel v-for="(item,index) in courses" :key="index">
              {{ item.name }}
              <div slot="content">
                <div>HHH</div>
                <div>HHHHH</div>
                <div>HHHHHHH</div>
              </div>
            </Panel>
          </Collapse>
        </aside>
        <section class="right"></section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyCourse',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        courses: []
      }
    },
    mounted: function () {
      this.getCourses()
    },
    methods: {
      getCourses () {
        this.courses = []
        this.$axios.get('/tch/getCoursesList?teacherId=' + this.currentUser.id)
          .then((response) => {
            console.log(response)
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name
              }
              this.courses.push(obj)
              console.log(this.courses)
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
