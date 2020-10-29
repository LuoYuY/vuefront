<template>
  <div id="CreateCourse">
    <div class="content">
      <h1>新建课程</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="title">
          <i-input type="text" v-model="formInline.title" placeholder="">
            <span slot="prepend">课程名称</span>
          </i-input>
        </FormItem>
        <FormItem prop="reason">
          <span>申请理由</span>
          <Input v-model="formInline.reason" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>
        <FormItem style="float: right">
          <Button type="primary" @click="handleSubmit('formInline')">提交申请</Button>
        </FormItem>
      </Form>

      <br/>
      <br/>
      <h1>申请记录</h1>
      <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'CreateCourse',
    data () {
      return {
        formInline: {
          title: '',
          reason: ''
        },
        ruleInline: {
          title: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ]
        },
        semesterList:[],
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '课程名称',
            key: 'name'
          },
          {
            title: '申请理由',
            key: 'reason'
          },
          {
            title: '申请时间',
            key: 'createDate'
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === '已审核') {
                return h('span', {
                  'style': {
                    'color': '#2DC8B7'
                  }
                }, params.row.status)
              } else if (params.row.status === '待审核') {
                return h('span', {
                  'style': {
                    'color': '#FFB822'
                  }
                }, params.row.status)
              } else if (params.row.status === '驳回') {
                return h('span', {
                  'style': {
                    'color': '#B2B2B2'
                  }
                }, params.row.status)
              }
            }
          }
        ],
        data1: []
      }
    },
    mounted: function () {
      // this.$axios.get('/course/semesterList')
      //   .then((response) => {
      //     this.semesterList = JSON.parse(JSON.stringify(response.data.data))
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      //   .then(function () {
      //     // always executed
      //   })
      this.updateTable()
    },
    methods: {
      handleSubmit (name) {
        // alert(this.formInline.starttime)
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!')
            let data = {
              teacherId: this.currentUser.id,
              name: this.formInline.title,
              reason: this.formInline.reason
            }
            // eslint-disable-next-line no-undef
            this.$axios.post('/course/createApply', qs.stringify(data))
              .then((response) => {
                console.log(response)
                if (response.data.status === 0) {
                  this.$Message.success('Success!')
                } else {
                  this.$Message.error('Fail!')
                }
                  this.updateTable()
              }
              )
              .catch(function (error) {
                console.log(error)
              })
              .then(function () {
                // always executed
              })
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      rowClassName (row, index) {
        // if (index === 0) {
        //   return 'demo-table-info-row'
        // } else if (index === 1) {
        //   return 'demo-table-error-row'
        // }
        return ''
      },
      updateTable () {
        // // eslint-disable-next-line no-unused-vars
        // let data = {
        //   teacherId: this.currentUser.id
        // }
        // let _this = this
        this.data1 = []
        this.$axios.get('/tch/applyCreList?teacherId=' + this.currentUser.id)
          .then((response) => {
            console.log(response)
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              // new Date().getDay()
              let status = ''
              switch (array[i].status) {
                case 0:
                  status = '待审核'
                  break
                case 1:
                  status = '已审核'
                  break
                case 2:
                  status = '驳回'
                  break
              }
              const obj = { // 关键！ 创建一个新对象
                id: i + 1,
                name: array[i].name,
                reason: array[i].reason,
                createDate: array[i].createDate.slice(1),
                status: status
              }
              this.data1.push(obj)
              console.log(this.data1)
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

<style>
  .ivu-table .demo-table-info-row td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
  }
</style>
<style scoped>
  #CreateCourse {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .content {
    width: 40%;
    margin-top:100px;
    padding:10px 10px 10px 10px;
    background: white;
  }
</style>
