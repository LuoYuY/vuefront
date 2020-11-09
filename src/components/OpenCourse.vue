<template>
<div id="openCourse">
  <div class="content">
    <div class="up">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="title">
        <span>课程名称</span>
        <Select filterable v-model="formInline.title">
          <Option :value="item.id" v-for="item in courseList" v-bind:key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <!--        <FormItem prop="time">-->
      <!--          <i-input type="password" v-model="formInline.password" placeholder="Password">-->
      <!--            <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
      <!--&lt;!&ndash;            <span slot="append">.com</span>&ndash;&gt;-->
      <!--          </i-input>-->
      <!--        </FormItem>-->
      <FormItem prop="className">
        <i-input type="text" v-model="formInline.className" placeholder="">
          <span slot="prepend">课程名称</span>
        </i-input>
      </FormItem>
      <FormItem prop="activeTime" :label-in-value="true">
        <Row>
          <i-col span="11">
            <span>开始时间</span>
            <DatePicker type="date" :options="startTimeOptions" @on-change="startTimeChange" placeholder="开始时间"
                        v-model="formInline.starttime"></DatePicker>
          </i-col>
          <i-col span="2" style="text-align: center">-</i-col>
          <i-col span="11">
            <span>结束时间</span>
            <DatePicker type="date" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间"
                        v-model="formInline.endtime">
            </DatePicker>
          </i-col>
        </Row>
      </FormItem>
      <FormItem prop="grade">
        <span>开课年级</span>
        <Select filterable v-model="formInline.grade" >
          <Option :value="item.id" v-for="item in gradeList" v-bind:key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="maxNum">
        <i-input type="text" v-model="formInline.maxNum" placeholder="">
          <span slot="prepend">限选人数（人）</span>
        </i-input>
      </FormItem>
      <FormItem>
        <span>开课学期</span>
        <Select filterable v-model="formInline.semester">
          <Option :value="item.id" v-for="item in semesterList" v-bind:key="item.id">{{ item.year }}学年 第{{ item.term }}学期</Option>
        </Select>
      </FormItem>
      <FormItem style="float:right;">
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form></div>
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
    name: 'OpenCourse',
    data () {
      return {
        formInline: {
          title: null,
          starttime: '', // 开始日期
          endtime: '', // 结束日期
          startTimeOptions: {},
          endTimeOptions: {},
          activeTime: '',
          maxNum: null,
          semester: null,
          grade: null,
          className: null
        },
        ruleInline: {
          // title: [
          //   {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          // ],
          // password: [
          //   {required: true, message: 'Please fill in the password.', trigger: 'blur'},
          //   {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          // ],
          activeTime: [
            { required: true,
              type:'array',
              fields: {
                0: { required: true, message: '请选择时间范围', trigger: 'blur' },
                1: { required: true, message: '请选择时间范围', trigger: 'blur' }
              }
            }
          ]
        },
        semesterList:[],
        courseList: [],
        gradeList: [],
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '小课名称',
            key: 'className'
          },
          {
            title: '课程名称',
            key: 'courseName'
          },
          {
            title: '开课时间',
            key: 'startDate'
          },
          {
            title: '结束时间',
            key: 'endDate'
          },
          {
            title: '开课学期',
            key: 'semesterName'
          },
          {
            title: '开课年级',
            key: 'gradeName'
          },
          {
            title: '限选人数',
            key: 'maxNum'
          },
          {
            title: '创建时间',
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
      this.$axios.get('/course/semesterList')
        .then((response) => {
          this.semesterList = JSON.parse(JSON.stringify(response.data.data))
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      this.$axios.get('/tch/getCoursesList?teacherId=' + this.currentUser.id)
        .then((response) => {
          console.log(response)
          this.courseList = JSON.parse(JSON.stringify(response.data.data))
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      this.$axios.get('/course/gradeList')
        .then((response) => {
          console.log(response)
          this.gradeList = JSON.parse(JSON.stringify(response.data.data))
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      this.updateTable()
    },
    methods: {
      handleSubmit (name) {
        alert(this.formInline.starttime)
        alert(this.formInline.title)
        this.$refs[name].validate((valid) => {
          if (valid) {
            let data = {
              teacherId: this.currentUser.id,
              courseId: this.formInline.title,
              name: this.formInline.className,
              startDate: this.formInline.starttime,
              endDate: this.formInline.endtime,
              semesterId: this.formInline.semester,
              gradeId: this.formInline.grade,
              maxNum: this.formInline.maxNum
            }
            // eslint-disable-next-line no-undef
            this.$axios.post('/tch/creClassApply', qs.stringify(data))
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
            // this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      startTimeChange: function (e) { // 设置开始时间
        this.formInline.starttime = e
        this.formInline.endTimeOptions = {
          disabledDate: date => {
            let startTime = this.formInline.starttime ? new Date(this.formInline.starttime).valueOf() : ''
            alert(date)
            return date && (date.valueOf() < startTime)
            // return date && (date.valueOf() < startDate-86400000 || date.valueOf() > Date.now()-86400000) ;  此约束为当日之前开始日期之后
          }
        }
      },
      endTimeChange: function (e) { // 设置结束时间
        this.formInline.endtime = e
        let endTime = this.formInline.endtime ? new Date(this.formInline.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
        this.formInline.startTimeOptions = {
          disabledDate (date) {
            return date && date.valueOf() > endTime
          }
        }
      },
      updateTable () {
        this.data1 = []
        this.$axios.get('/tch/applyCreClassList?teacherId=' + this.currentUser.id)
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
                className: array[i].name,
                courseName: array[i].courseName,
                startDate: array[i].startDate,
                endDate: array[i].endDate,
                semesterName: array[i].semesterName,
                gradeName: array[i].gradeName,
                maxNum: array[i].maxNum,
                createDate: array[i].createDate,
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

<style scoped>
  #openCourse {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .content {
    width: 80%;
    padding:10px 10px 10px 10px;
    background: white;
  }
  .up {
    width: 50%;
    margin: 0 auto;
  }
</style>
