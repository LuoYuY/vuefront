<template>
  <div id="TaskDetailStu">
    <div class="content">
      <p class="left">作业名称</p>
      <p class="right">{{ this.title }}</p>
      <p class="left">作业内容</p>
      <p class="right">{{ this.content }}</p>
      <p class="left">开始时间</p>
      <p class="right">{{ this.startTime }} </p>
      <p class="left">结束时间</p>
      <p class="right">{{ this.endTime }} </p>
      <p class="left">附件</p>
      <div class="right">
        <p slot="title" v-for="(item,index) in taskWares" :key="index">
          <Icon type="ios-attach" size=20 style="display: inline-block"/>
          <a v-on:click="downloadFile(item.filename, item.filepath)" >{{ item.filename }}</a>
        </p>
      </div>
      <p class="left">提交状态</p>
      <div class="right">
        <span v-if="stuTask.status === 1">未完成</span>
        <span v-if="stuTask.status === 2">已完成 <span>修改时间：{{ stuTask.uploadTime }}</span></span>
      </div>
      <p class="left">已提交的作业</p>
      <p class="right"><a :href="stuTask.filepath">{{ stuTask.filename }} </a></p>
      <p class="left">得分</p>
      <p class="right"><span>{{ stuTask.score }}</span></p>
      <p class="left"></p>
      <div class="right">
        <Button @click="showDialog()" v-if="status === 1">提交作业/修改提交作业</Button>
      </div>
      <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">
        <Tabs>
          <TabPane label="选择文件">
            <Upload :before-upload="handleUpload" action :format="['docx','doc','txt', 'pdf']">
              <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
            <div>
              <span style="font-size:15px;color:#3449ff"
                    v-if="add.uploadFile!==null">文件名: {{ add.uploadFile.name }}</span>
              <Icon type="ios-close" size="25" color="red" v-if="add.uploadFile!==null" @click="delFileList()"></Icon>
            </div>
          </TabPane>
        </Tabs>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelUpload">取消</Button>
          <Button
            type="primary"
            @click="upload"
            :loading="loadingStatus"
          >{{ loadingStatus ? '上传中...' : '上传' }}
          </Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskDetailStu',
    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        stuTask: {
          filename: '',
          filepath: '',
          uploadTime: '',
          score: null,
          status: 1
        },
        taskId: this.$route.query.taskId,
        title: null,
        content: null,
        startTime: null,
        endTime: null,
        status: null,
        taskWares: [],
        add: {
          dialog: false,
          uploadFile: null
        },
        loadingStatus: false
      }
    },
    mounted: function () {
      this.getTaskDetail()
      this.getStuTaskDetail()
    },
    methods: {
      getStuTaskDetail () {
        this.$axios.get('/stu/getStuTaskDetail?taskId=' + this.taskId + '&studentId=' + this.currentUser.id)
          .then((response) => {
            let taskStu = response.data.data.taskStu
            if (taskStu != null) {
              this.stuTask.filename = taskStu.filename
              this.stuTask.filepath = taskStu.filepath
              this.stuTask.uploadTime = taskStu.uploadTime
              this.stuTask.score = taskStu.score
              this.stuTask.status = taskStu.status
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
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
      getTaskDetail () {
        // {
        //   "filename": "人件读后感.odt",
        //   "filepath": "http://localhost:8080/download/task/4/人件读后感.odt",
        //   "uploadDate": 1604505600000,
        //   "id": 1,
        //   "taskId": 4
        // }
        this.$axios.get('/tch/getTaskDetail?taskId=' + this.taskId)
          .then((response) => {
            let task = response.data.data.task
            this.title = task.title
            this.content = task.content
            this.startTime = task.startTime.substr(0, 19)
            this.endTime = task.endTime.substr(0, 19)
            this.status = task.status
            if (response.data.data.taskWare !== null) {
              let array = []
              array = JSON.parse(JSON.stringify(response.data.data.taskWare))
              for (let i = 0; i < array.length; i++) {
                const obj = { // 关键！ 创建一个新对象
                  filename: array[i].filename,
                  filepath: array[i].filepath
                }
                this.taskWares.push(obj)
                // console.log(this.courses)
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      delFileList (index) {
        this.add.uploadFile = null
      },
      handleUpload (file) {
        this.add.uploadFile = file
        return false
      },
      showDialog () {
        this.add.dialog = true
      },
      cancelUpload () {
        this.loadingStatus = false
        this.add.uploadFile = null
        this.add.dialog = false
      },
      upload () {
        this.loadingStatus = true
        console.log('上传：' + this.add.uploadFile)
        let formData = new FormData()
        if (this.add.uploadFile !== null) {
          formData.append('uploadFile', this.add.uploadFile) // 文件对象
          alert('taskId' + this.taskId)
          formData.append('taskId', this.taskId)
          formData.append('userId', this.currentUser.id)
          alert('currentUserid' + this.currentUser.id)
          this.$axios.post('/stu/uploadTask', formData, {
            timeout: 10000,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            console.log(response)
            if (response.data.status === 0) {
              this.loadingStatus = false
              this.add.uploadFile = null
              this.$Message.success('Success')
              this.add.dialog = false
              this.getStuTaskDetail()
              // this.getDetail(this.courseId)
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
      }
    }
  }
</script>

<style scoped>
  #TaskDetailStu {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .content {
    width: 60%;
    margin-top: 100px;
    padding: 10px 10px 10px 10px;
    background: white;
    display: grid;
    grid-template-columns: 25% 75%;
    border: gray solid 2px;
    /*grid-template-rows: repeat(2, 50%);*/
    /*display: flex;*/
  }

  .left {
    font-size: 15px;
    font-weight: 900;
    margin-top: 10px;
  }

  .right {
    font-size: 15px;
    margin-top: 10px;
  }
</style>
