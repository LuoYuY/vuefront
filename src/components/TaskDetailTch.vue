<template>
<div>
  <h1>{{ this.title }} </h1>
  <h1>{{ this.content }} </h1>
  <h1>{{ this.startTime }} </h1>
  <h1>{{ this.endTime }} </h1>
  <h1>{{ this.sum }} </h1>
  <h1>{{ this.finishedSum }} </h1>
  <h3>附件</h3>
  <p slot="title" v-for="(item,index) in taskWares" :key="index">
    <a :href="item.filepath">{{ item.filename }}</a>
  </p>
  <span v-if="this.status === 1">未结束</span>
  <span v-if="this.status === 2">已结束</span>

  <h1>完成情况</h1>
  <Button v-on:click="downloadExcel()">下载评分单（excel）</Button>
  <Button @click="showDialog()">上传成绩单（excel）</Button>
  <br/>
  <br/>
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
    <div>
      <Table :columns="historyColumns" :data="historyData"></Table>
      <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>
    </div>
</div>
</template>

<script>
  // import qs from 'qs'
  export default {
    name: 'TaskDetailTch',
    data () {
      return {
        taskId: this.$route.query.taskId,
        title: null,
        content: null,
        startTime: null,
        endTime: null,
        sum: null,
        finishedSum: null,
        status: null,
        taskWares: [],
        students: [],
        add: {
          dialog: false,
          uploadFile: null
        },
        loadingStatus: false,
        ajaxHistoryData:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:1,
        historyColumns: [
          {
            title: '序号',
            key: 'id'
          },
          {
            title: '学号',
            key: 'studentId'
          },
          {
            title: '姓名',
            key: 'studentName'
          },
          {
            title: '完成情况',
            key: 'status'
          },
          {
            title: '附件名称',
            key: 'filename'
          },
          {
            title: '上传时间',
            key: 'uploadTime'
          },
          {
            title: '下载操作',
            key: 'download',
            render: (h, params) => {
              if (params.row.status === '已完成') {
                return h('a', {
                  attrs: {
                    href: params.row.filepath
                  },
                  style: {
                    display: 'block'
                  }
                }, '下载')
              }
            }
          },
          {
            title: '评分',
            key: 'score'
          }
        ],
        historyData: []
      }
    },
    created: function () {
      this.getTaskDetail()
      this.getTaskStatus()
      this.handleListApproveHistory()
    },
    methods: {
      getTaskDetail () {
        this.$axios.get('/tch/getTaskDetail?taskId=' + this.taskId)
          .then((response) => {
            let task = response.data.data.task
            this.title = task.title
            this.content = task.content
            this.startTime = task.startTime.substr(0, 19)
            this.endTime = task.endTime.substr(0, 19)
            this.sum = task.sum
            this.finishedSum = task.finishedSum
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
      getTaskStatus () {
        this.ajaxHistoryData = []
        // 保存取到的所有数据
        this.$axios.get('/tch/getStuTaskStatus?taskId=' + this.taskId)
          .then((response) => {
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data.list))
            this.dataCount = array.length
            for (let i = 0; i < array.length; i++) {
              const obj = { // 关键！ 创建一个新对象
                studentId: array[i].studentId,
                score: array[i].score ? array[i].score : 0,
                filename: array[i].filename,
                filepath: array[i].filepath,
                studentName:array[i].studentName,
                realStuId: 11,
                id: i + 1,
                uploadTime: array[i].uploadTime,
                status: array[i].status
              }
              this.ajaxHistoryData.push(obj)
              this.handleListApproveHistory()
              // console.log(this.courses)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
        // this.ajaxHistoryData = testData.histories
        // this.ajaxHistoryData =
      },
      // 获取历史记录信息
      handleListApproveHistory () {
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.dataCount < this.pageSize) {
          this.historyData = this.ajaxHistoryData
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      changepage (index) {
        let _start = (index - 1) * this.pageSize
        let _end = index * this.pageSize
        this.historyData = this.ajaxHistoryData.slice(_start, _end)
      },
      downloadExcel () {
        // window.open('/tch/downloadExcel?taskId=' + this.taskId + '&taskName=' + this.title, '_blank')
        this.$axios.get('/tch/downloadExcel?taskId=' + this.taskId + '&taskName=' + this.title, { responseType: 'blob' })
          .then((response) => {
            const link = document.createElement('a')
            let blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            link.setAttribute('download', '作业_' + this.title + '.xlsx')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // let blob = new Blob([response], {type: 'application/vnd.ms-excel'}) // res就是接口返回的文件流了
            // let objectUrl = URL.createObjectURL(blob)
            // window.location.href = objectUrl
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
          formData.append('taskId', this.taskId)
          this.$axios.post('/tch/uploadTaskScore', formData, {
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
              this.getTaskStatus()
              this.handleListApproveHistory()
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

</style>
