<template>
  <div id="MyCourse">
    <div class="content">
        <aside class="left">
          <div style="background:#eee;padding: 20px" >
            <Card :bordered="false"  v-for="(item,index) in courses" :key="index">
              <p slot="title"> <a v-on:click="getDetail(item.id)">{{ item.name }} </a></p>
             </Card>
          </div>
        </aside>
        <section class="right">
          <h1 style="margin-bottom: 20px">{{ courseName }}</h1>
          <h2 v-if="courseId!==null" style="margin-bottom: 10px">小班目录</h2>
<!--          <h2>进行中</h2>-->
          <div v-for="(item,index) in classes" :key="index" style="font-size: 20px;margin-bottom: 10px">
            <Icon type="ios-cube" size=20 style="display: inline-block"/>
            <router-link target="_blank" :to="{path:'/tch/detail',query:{id: item.id}}">{{ item.name }}</router-link>
          </div>
          <div>
            <h2 v-if="courseId!==null" style="margin-bottom: 10px;margin-top: 30px;display: inline-block">课件目录</h2>
            <Button v-if="courseId!==null" @click="showDialog()" style="display: inline-block;margin-left: 30px">上传课件</Button>
          </div>
          <div v-if="courseId!==null" style="background:#eee;padding: 5px" >
            <div v-for="(item,index) in courseWare" :key="index" style="font-size: 15px;margin-top: 5px;margin-bottom: 5px;">
              <Icon type="ios-attach" size=15 style="display: inline-block"/>
<!--                   <a v-on:click="downloadFile(item.filename, item.filepath)" >{{ item.filename }}</a>-->
              <a v-on:click="toDownload(item.filename)" >{{ item.filename }}</a>
              <!--              <a download="" :href="item.filepath">{{ item.filename }} </a>-->
              <Icon  style="cursor:pointer;margin-left: 10px" size="20" v-on:click="deleteWare(item.id)" type="ios-close-circle-outline" />
            </div>
          </div>
          <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">
            <Tabs>
              <TabPane label="选择文件">
                <Upload :before-upload="handleUpload" action multiple :format="['docx','doc','txt', 'pdf']">
                  <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
                </Upload>
                <div>
                  <ul class="file-list" v-for="(list,index) in add.uploadFile" :key="index">
                    <li>
                      <span style="font-size:15px;color:#3449ff">文件名: {{ list.name }}</span>
                      <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
                    </li>
                  </ul>
                </div>
              </TabPane>
            </Tabs>
            <div slot="footer">
              <Button type="text" size="large" @click="cancelUpload">取消</Button>
              <Button
                type="primary"
                @click="upload"
                :loading="loadingStatus"
              >{{ loadingStatus ? '上传中...' : '上传' }}</Button>
            </div>
          </Modal>
        </section>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'MyCourse',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        courses: [],
        courseName: null,
        courseId: null,
        classes: [],
        courseWare: [],
        add: {
          dialog: false,
          uploadFile: []
        },
        loadingStatus: false
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
            // console.log(response)
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name
              }
              this.courses.push(obj)
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
      getDetail (courseId) {
        this.classes = []
        this.courseWare = []
        this.courseId = courseId
        this.$axios.get('/tch/getCourseDetail?courseId=' + courseId)
          .then((response) => {
            // console.log(response)
            this.courseName = response.data.data.course.name
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data.classes))
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name
              }
              this.classes.push(obj)
              // console.log(this.courses)
            }
            let array2 = []
            array2 = JSON.parse(JSON.stringify(response.data.data.courseWare))
            for (let i = 0; i < array2.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                id: array2[i].id,
                filename: array2[i].filename,
                filepath: array2[i].filepath,
                uploadDate: array2[i].uploadDate
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
      },
      // downloadFile (fileName, data) {
      //   if (!data) {
      //     return
      //   }
      //   let url = window.URL.createObjectURL(new Blob([data]))
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   link.setAttribute('download', fileName)
      //   document.body.appendChild(link)
      //   link.click()
      // },
      deleteWare (courseWareId) {
        if (window.confirm('确认删除吗')) {
          let data = {
            courseWareId: courseWareId
          }
          this.$axios.post('/tch/deleteCourseWare', qs.stringify(data))
            .then((response) => {
              this.$Message.success('Success')
              this.getDetail(this.courseId)
            })
            .catch(function (error) {
              console.log(error)
            })
            .then(function () {
              // always executed
            })
        } else {}
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
                this.getDetail(this.courseId)
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
      cancelUpload () {
        this.add.dialog = false
      },
      toDownload (filename) {
        let url = '/course/courseWareDownload?courseId=' + this.courseId + '&file=' + filename
        this.$axios({
          method: 'get',
          url: url,
          responseType: 'blob'
        }).then(res => {
          console.log(res)
          this.download(res.data, filename)
        })
          .catch(err => {
            console.log(err)
            if (err.response.status === 400) {
              this.$Message.error('下载出错，文件可能不存在！！')
            }
          })
      },
      // 下载文件
      download (data, filename) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        // this.$Message.info('下载完成！')
        this.cancel()
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
    flex: 0 0 25%; /* 左侧固定200px */
    height: 500px;
    background: white;
    margin-right: 20px;
  }
  .right {
    /* 此处解释下
    flex: 1 1 0%
    0%表示此处宽度是按照自身内容宽度来，此处自身内容宽度为0，但是分配剩余的空间，所以可以自适应变化
     */
    flex: 1; /* 随父级变化 */
    background: white;
    padding: 10px;
    border: 5px solid rgba(219, 224, 230, 0.93);
  }
</style>
<style>
  .ivu-card-body {
    display: none;
  }
</style>
