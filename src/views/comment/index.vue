<template>
  <!-- 整个是一个卡片 -->
  <el-card>
    <!-- 用自己封装的面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">
        评论管理
      </template>
    </bread-crumb>
    <!-- 表格部分 -->
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="fomatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button @click="openOrClose(obj.row)" type="text" size="small">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 定义一个空数组来接收请求回来的表格的数据
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        // console.log(res.data.results)
        this.list = res.data.results
      })
    },
    fomatterBoolean (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    },
    // 打开或者关闭评论
    openOrClose (row) {
      // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定要${mess}评论吗`, '提示').then(res => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment() // 页面一上来先获取到表格的数据
  }
}
</script>

<style>

</style>
