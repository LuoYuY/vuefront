<template>
  <div>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'SelectClass',
    data () {
      return {
      columns1: [
          {
            title: '课程编号',
            key: 'id'
          },
          {
            title: '课程',
            key: 'courseName'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '开课学期',
            key: 'semesterName'
          },
          {
            title: '开始日期',
            key: 'startDate'
          },
          {
            title: '结束日期',
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
            title: '已选人数',
            key: 'num'
          },
          {
            title: '课程状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === '未开课') {
                return h('span', {
                  'style': {
                    'color': '#2DC8B7'
                  }
                }, params.row.status)
              } else if (params.row.status === '已开课') {
                return h('span', {
                  'style': {
                    'color': '#FFB822'
                  }
                }, params.row.status)
              }
            }
          },
          {
            title: '选课',
            key: 'select',
            width: '300px',
            render: (h, params) => {
              if (this.isSelected(params.row.id)) {
                return h('div', [
                  h('span', {
                    'style': {
                      'color': '#FFB822'
                    }
                  }, '已选'),
                  h('Button', {
                    props: {
                      type: 'primary'
                    },
                    style: {
                      display: 'inline',
                      marginLeft: '20px',
                      'justify-content': 'center'
                    },
                    on: {
                      click: () => {
                        if (window.confirm('确认退选吗')) {
                          this.disSelect(params.row.id)
                        } else {}
                      }
                    }
                  }, '退选')
                ])
              } else {
                if (params.row.num >= params.row.maxNum) {
                  return h('span', {
                    'style': {
                      'color': '#2DC8B7'
                    }
                  }, '人数已满')
                } else {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary'
                      },
                      style: {
                        display: 'inline',
                        marginLeft: '20px',
                        'justify-content': 'center'
                      },
                      on: {
                        click: () => {
                          this.selectClass(params.row.id)
                        }
                      }
                    }, '选课')
                  ])
                }
              }
            }
          }
        ],
        data1: [],
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        selectedList: []
      }
    },
    mounted: function () {
      this.getSelectedCourses()
      this.updateTable()
    },
    methods: {
      getSelectedCourses () {
        this.selectedList = []
        this.$axios.get('/stu/getSelectedCourses?studentId=' + this.currentUser.id)
          .then((response) => {
            console.log(response)
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              this.selectedList.push(array[i].classId)
            }
            console.log(this.data1)
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      selectClass (id) {
        // alert('classId: ' + id)
        let data = {
          classId: id,
          studentId: this.currentUser.id
        }
        this.$axios.post('/stu/selectClass', qs.stringify(data))
          .then((response) => {
            if (response.data.status === 0) {
              this.$Message.success('Success!')
            } else {
              this.$Message.error(response.data.msg)
            }
            this.getSelectedCourses()
            this.updateTable()
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      disSelect (id) {
        // alert('classId: ' + id)
        // alert('classId: ' + id)
        let data = {
          classId: id,
          studentId: this.currentUser.id
        }
        this.$axios.post('/stu/disSelectClass', qs.stringify(data))
          .then((response) => {
            if (response.data.status === 0) {
              this.$Message.success('Success!')
            } else {
              this.$Message.error(response.data.msg)
            }
            this.getSelectedCourses()
            this.updateTable()
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      isSelected (classId) {
        let res = false
        for (let i = 0; i < this.selectedList.length; i++) {
          if (classId === this.selectedList[i]) {
            res = true
            break
          }
        }
        return res
      },
      updateTable () {
        this.data1 = []
        this.$axios.get('/stu/selectClassList')
          .then((response) => {
            console.log(response)
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data))
            for (let i = 0; i < array.length; i++) {
              // new Date().getDay()
              let status = ''
              switch (array[i].status) {
                case 0:
                  status = '未开课'
                  break
                case 1:
                  status = '已开课'
                  break
              }
              const obj = { // 关键！ 创建一个新对象
                id: array[i].id,
                name: array[i].name,
                courseName: array[i].courseName,
                teacherName: array[i].teacherName,
                startDate: array[i].startDate,
                endDate: array[i].endDate,
                createDate: array[i].createDate,
                semesterName: array[i].semesterName,
                gradeName: array[i].gradeName,
                maxNum: array[i].maxNum,
                num: array[i].num,
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

</style>
