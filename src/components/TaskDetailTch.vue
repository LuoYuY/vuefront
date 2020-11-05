<template>
<div>
  <h1>{{ this.title }} </h1>
  <h1>{{ this.content }} </h1>
  <h1>{{ this.startTime }} </h1>
  <h1>{{ this.endTime }} </h1>
  <h1>{{ this.sum }} </h1>
  <h1>{{ this.finishedSum }} </h1>
  <h1>完成情况</h1>
    <div>
      <Table :columns="historyColumns" :data="historyData"></Table>
      <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage"></Page>
    </div>
</div>
</template>

<script>
  let testData = {
    'histories': [
      {
        'username': '智能审批',
        'shenpistatus': '审批已通过',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 18:11'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批已通过',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 18:11'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批已通过',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 10:04'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201',
        'time': '2017-07-24 10:03'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201',
        'time': '2017-07-24 10:02'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批已通过',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 10:02'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 10:01'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-24 09:56'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:23'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000',
        'time': '2017-07-21 14:23'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:23'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000',
        'time': '2017-07-21 14:23'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000',
        'time': '2017-07-21 14:23'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000',
        'time': '2017-07-21 14:21'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:21'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:20'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000',
        'time': '2017-07-21 14:20'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:14'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:13'
      },
      {
        'username': '智能审批',
        'shenpistatus': '审批被拒绝',
        'shenpicomments': '自动审批通过',
        'time': '2017-07-21 14:11'
      }
      ]
  }
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
        students: [],
        ajaxHistoryData:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:10,
        historyColumns: [
          {
            title: '人员',
            key: 'username'
          },
          {
            title: '操作',
            key: 'shenpistatus'
          },
          {
            title: '意见',
            key: 'shenpicomments'
          },
          {
            title: '时间',
            key: 'time'
          }

        ],
        historyData: []
      }
    },
    mounted: function () {
      this.getTaskDetail()
      this.handleListApproveHistory()
      this.getTaskStatus()
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
            this.sum = task.sum
            this.finishedSum = task.finishedSum
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      },
      getTaskStatus () {
      },
      // 获取历史记录信息
      handleListApproveHistory () {
        // 保存取到的所有数据
        this.ajaxHistoryData = testData.histories
        this.dataCount = testData.histories.length
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (testData.histories.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      changepage (index) {
        let _start = (index - 1) * this.pageSize
        let _end = index * this.pageSize
        this.historyData = this.ajaxHistoryData.slice(_start, _end)
      }
    }
  }
</script>

<style scoped>

</style>
