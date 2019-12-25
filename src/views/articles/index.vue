<template>
 <el-card>
   <!-- 头部面包屑组件 -->
   <bread-crumb slot="header">
    <template slot="title">
      文章列表
    </template>
   </bread-crumb>
   <!-- 表单组件 -->
   <el-form style="padding-left: 50px">
     <el-form-item label="文章状态：">
       <!-- 单选按钮组件 -->
       <el-radio-group v-model="searchForm.status">
         <el-radio :label="5">全部</el-radio>
         <el-radio :label="0">草稿</el-radio>
         <el-radio :label="1">待审核</el-radio>
         <el-radio :label="2">审核通过</el-radio>
         <el-radio :label="3">审核失败</el-radio>
       </el-radio-group>
     </el-form-item>
     <el-form-item label="频道选择：">
       <!-- 选择器组件 -->
       <el-select v-model="searchForm.channel_id" placeholder="请选择频道">
         <el-option v-for="item in channel" :key="item.id"
          :label="item.name"
          :value="item.id"
         ></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="时间选择：">
       <!-- 日期组件 -->
       <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange"></el-date-picker>
     </el-form-item>
   </el-form>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认不选中任何一个频道
        dateRange: [] // 时间范围，因为默认生成的就是一个数组，所以拿一个空数组来接收它
      },
      channel: [] // 定义一个数组来接收文章频道的数据
    }
  },
  methods: {
    // 获取文章频道的方法
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>

</style>
