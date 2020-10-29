<template>
<div>
  <h1>申请列表</h1>
  <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
</div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'CreateApply',
    data () {
      return {
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '申请教师',
            key: 'teacher'
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
            key: 'createDate',
            sortable: true,
            sortType: 'desc'
          },
          {
            title: '审核状态',
            key: 'status',
            width: '300px',
            render: (h, params) => {
              if (params.row.status === '已审核') {
                return h('span', {
                  'style': {
                    'color': '#2DC8B7'
                  }
                }, params.row.status)
              } else if (params.row.status === '待审核') {
                return h('div', [
                  h('span', {
                    'style': {
                      'color': '#FFB822'
                    }
                  }, params.row.status),
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
                        if (window.confirm('确认通过吗')) {
                          this.dealCreApply(params.row.courseId, 1)
                        } else {}
                      }
                    }
                  }, '同意'),
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
                        if (window.confirm('确认驳回吗')) {
                          this.dealCreApply(params.row.courseId, 2)
                        } else {}
                      }
                    }
                  }, '驳回')
                  ])
              } else if (params.row.status === '驳回') {
                return h('span', {
                  'style': {
                    'color': '#B2B2B2'
                  }
                }, params.row.status)
              }
            }
          },
          {
            title: '处理时间',
            key: 'finishDate',
            sortable: true,
            sortType: 'desc'
          }
        ],
        data1: []
      }
    },
    mounted: function () {
      this.updateTable()
    },
    methods: {
      dealCreApply (id, choice) {
        let data = {
          // "idd": "f6588b4d3a274d599c8696e3a2e89579",
          // "name":"水"
          id: id,
          choice: choice
        }
        this.$axios.post('/admin/dealCreApply', qs.stringify(data))
          .then((response) => {
            if (response.data.status === 0) {
              this.$Message.success('Success!')
            } else {
              this.$Message.error(response.data.msg)
            }
            this.updateTable()
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      updateTable () {
        this.data1 = []
        this.$axios.get('/admin/allApplyCreList')
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
                courseId: array[i].id,
                teacher: array[i].teacher,
                name: array[i].name,
                reason: array[i].reason,
                createDate: array[i].createDate,
                status: status,
                finishDate: array[i].finishDate
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
