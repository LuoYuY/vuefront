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
<!--        <h2>课件下载链接</h2> <span>删除按钮</span>-->
<!--        <h1>课件上传</h1>-->
<!--        <h3>课件上传框</h3>-->
<!--        <Button @click="showDialog()">文件上传</Button>-->
<!--        <h1>论坛</h1>-->

<!--        <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">-->
<!--          <Tabs>-->
<!--            <TabPane label="选择文件">-->
<!--              <Upload :before-upload="handleUpload" action multiple :format="['docx','doc','txt', 'pdf']">-->
<!--                <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>-->
<!--              </Upload>-->
<!--              <div>-->
<!--                <ul class="file-list" v-for="(list,index) in add.uploadFile" :key="index">-->
<!--                  <li>-->
<!--                    <span style="font-size:15px;color:#3449ff">文件名: {{ list.name }}</span>-->
<!--                    <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </TabPane>-->
<!--          </Tabs>-->
<!--          <div slot="footer">-->
<!--            <Button type="text" size="large" @click="cancleUpload">取消</Button>-->
<!--            <Button-->
<!--              type="primary"-->
<!--              @click="upload"-->
<!--              :loading="loadingStatus"-->
<!--            >{{ loadingStatus ? '上传中...' : '上传' }}</Button>-->
<!--          </div>-->
<!--        </Modal>-->
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
        courseWare: []
        // add: {
        //   dialog: false,
        //   uploadFile: []
        // },
        // loadingStatus: false
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
      showDialog () {
        this.add.dialog = true
      },
      getDetail (classId, courseId) {
        this.courseWare = []
        alert('courseId:' + courseId)
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
      },
      delFileList (index) {
        this.add.uploadFile.splice(index, 1)
      },
      handleUpload (file) {
        this.add.uploadFile.push(file)
        return false
      },
      upload () {
        this.loadingStatus = true
        console.log('上传：' + this.add.uploadFile)
        let formData = new FormData()
        if (this.add.uploadFile.length > 0) {
          for (let i = 0; i < this.add.uploadFile.length; i++) {
            formData.append('uploadFile', this.add.uploadFile[i]) // 文件对象
          }
          // console.log(formData)
          alert('courseId' + this.courseId)
          formData.append('courseId', this.courseId)
          this.$axios.post('/tch/uploadFile', formData, {
            timeout: 10000,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            console.log(response)
            if (response.data.status === 0) {
              this.loadingStatus = false
              this.add.uploadFile = []
              this.$Message.success('Success')
              this.add.dialog = false
            }
          })
            .catch(error => {
              this.loadingStatus = false
              this.$Message.error('服务器错误' + error)
            })
        } else {
          this.loadingStatus = false
          this.$Message.error('请至少上传一个文件')
        }
      },
      download (url) {
        alert(url)
        this.$axios.get(url)
          .then((response) => {
            console.log(response)
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
