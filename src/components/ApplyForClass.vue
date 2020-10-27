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
        <!--        <FormItem prop="time">-->
        <!--          <i-input type="password" v-model="formInline.password" placeholder="Password">-->
        <!--            <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
        <!--&lt;!&ndash;            <span slot="append">.com</span>&ndash;&gt;-->
        <!--          </i-input>-->
        <!--        </FormItem>-->
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
        <FormItem prop="duration">
          <i-input type="text" v-model="formInline.duration" placeholder="">
            <span slot="prepend">总学时（h）</span>
          </i-input>
        </FormItem>
        <FormItem prop="semester">
          <i-input type="text" v-model="formInline.semester" placeholder="">
            <span slot="prepend">学期</span>
          </i-input>
        </FormItem>
        <FormItem prop="grade">
          <i-input type="text" v-model="formInline.grade" placeholder="">
            <span slot="prepend">年级</span>
          </i-input>
        </FormItem>
        <FormItem prop="maxNum">
          <i-input type="text" v-model="formInline.maxNum" placeholder="">
            <span slot="prepend">限选人数（人）</span>
          </i-input>
        </FormItem>
        <FormItem>
          <span>开课学期</span>
          <Select>
            <Option :value="item.code" v-for="item in semesterList" v-bind:key="item.id">{{ item.year }}学年 第{{ item.term }}学期</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApplyForClass',
    data () {
      return {
        formInline: {
          title: '',
          starttime: '', // 开始日期
          endtime: '', // 结束日期
          startTimeOptions: {},
          endTimeOptions: {},
          activeTime: '',
          duration: null,
          maxNum: null,
          semester: null,
          grade: null
        },
        ruleInline: {
          title: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
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
        currentUser: JSON.parse(localStorage.getItem('currentUser'))
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
    },
    methods: {
      handleSubmit (name) {
        // alert(this.formInline.starttime)
        this.$refs[name].validate((valid) => {
          if (valid) {
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
      }
    }
  }
</script>

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
