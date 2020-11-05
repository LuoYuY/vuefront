<template>
  <div id="TaskDetailStu">
    <div class="content">
      <h1>{{ this.title }} </h1>
      <h1>{{ this.content }} </h1>
      <h1>{{ this.startTime }} </h1>
      <h1>{{ this.endTime }} </h1>
      <h2>得分</h2>
      <h2>提交状态</h2>
      <h2>已提交作业</h2>
      <Button @click="showDialog()"  v-if="status === 1">提交作业/修改提交作业</Button>

      <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">
        <Tabs>
          <TabPane label="选择文件">
            <Upload :before-upload="handleUpload" action :format="['docx','doc','txt', 'pdf']">
              <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
            <div>
                <span style="font-size:15px;color:#3449ff" v-if="add.uploadFile!==null">文件名: {{ add.uploadFile.name }}</span>
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
        taskId: this.$route.query.taskId,
        title: null,
        content: null,
        startTime: null,
        endTime: null,
        status: null,
        add: {
          dialog: false,
          uploadFile: null
        },
        loadingStatus: false
      }
    },
    mounted: function () {
      this.getTaskDetail()
    },
    methods: {
      getTaskDetail () {
        this.$axios.get('/tch/getTaskDetail?taskId=' + this.taskId)
          .then((response) => {
            let task = response.data.data
            this.title = task.title
            this.content = task.content
            this.startTime = task.startTime.substr(0, 19)
            this.endTime = task.endTime.substr(0, 19)
            this.status = task.status
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
    /*display: flex;*/
  }
</style>
