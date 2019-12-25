<template>
 <el-card class="articles">
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
   <!-- 下面的手写页面 -->
    <el-row class="total" type="flex" align="middle">
      <span>
        共找到10000条符合条件的内容
      </span>
    </el-row>
    <div class="article-item" v-for="item in 10" :key="item">
      <div class="left">
        <img src="../../assets/img/abc.jpg" alt="">
        <div class="info">
          <span>哈哈哈哈</span>
          <el-tag>已发表</el-tag>
          <div class="date">2019-12-24 15:07:01</div>
        </div>
      </div>
      <div class="right">
        <span><i class="el-icon-edit">修改</i></span>
        <span><i class="el-icon-delete">删除</i></span>
      </div>
    </div>
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

<style lang="less" scoped>
.articles {
  .total {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #f2f3f5;
      .left {
          display: flex;
          img {
              width: 180px;
              height: 100px;
              border-radius: 4px;
          }
          .info {
              height: 100px;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .date {
                  color: #999;
                  font-size:12px;
              }
              .tag {
                  text-align: center;
                  width:60px;
              }
          }
      }
      .right {
          span {
              font-size:14px;
              margin-right: 8px;
              cursor: pointer;
          }
      }
  }
}
</style>
