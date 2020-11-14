<template>
  <div id="openCourse">
    <div class="content">
      <h1>申请记录</h1>
      <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowOpen',
    mounted: function () {
      this.updateTable()
    },
    data () {
      return {
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
    methods: {
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
</style>
