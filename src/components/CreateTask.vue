<template>
  <div id="CreateTask">
    <Form :model="formItem" :label-width="80">
      <FormItem label="作业名称">
        <i-input v-model="formItem.title" placeholder="输入作业名称..."></i-input>
      </FormItem>
      <FormItem label="作业内容">
        <i-input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 500}"
                 placeholder="输入作业内容..."></i-input>
      </FormItem>
      <FormItem label="截止时间">
        <Row>
          <i-col span="11">
            <DatePicker type="date" format="yyyy-MM-dd" @on-change="formItem.date=$event"
                        :value="formItem.date" placeholder="Select date"></DatePicker>
          </i-col>
          <i-col span="2" style="text-align: center">-</i-col>
          <i-col span="11">
            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="添加附件">
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
      </FormItem>
      <FormItem style="float: right">
        <div>
          <Button size="large" @click="cancelUpload">取消</Button>
          <Button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '发布中...' : '发布' }}</Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'CreateTask',
    data () {
      return {
        classId: this.$route.query.classId,
        formItem: {
          title: '',
          date: '',
          time: '',
          content: ''
        },
        add: {
          uploadFile: []
        },
        loadingStatus: false
      }
    },
    methods: {
      delFileList (index) {
        this.add.uploadFile.splice(index, 1)
      },
      handleUpload (file) {
        this.add.uploadFile.push(file)
        return false
      },
      cancelUpload () {
      },
      upload () {
        this.loadingStatus = true
        let formData = new FormData()
        // if (this.add.uploadFile.length > 0) {
        if (this.add.uploadFile.length > 0) {
          for (let i = 0; i < this.add.uploadFile.length; i++) {
            formData.append('uploadFile', this.add.uploadFile[i]) // 文件对象
          }
        } else {
          formData.append('uploadFile', null)
        }
        formData.append('classId', this.classId)
        formData.append('title', this.formItem.title)
        formData.append('content', this.formItem.content)
        formData.append('date', this.formItem.date.toLocaleString().replace(/:\d{1,2}$/, ' '))
        formData.append('time', this.formItem.time)
        this.$axios.post('/tch/createTask', formData, {
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
            this.$router.go(-1)
          }
        })
          .catch(error => {
            this.loadingStatus = false
            this.$Message.error('服务器错误' + error)
          })
        // } else {
        //   this.loadingStatus = false
        //   this.$Message.error('请至少上传一个文件')
        // }
      }
    }
  }
</script>

<style scoped>
  #CreateTask {
    width: 80%;
    padding: 10px;
    background: white;
    font-size: 30px;
  }
</style>
