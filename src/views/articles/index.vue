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
        共找到{{page.total}}条符合条件的内容
      </span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
          <div class="date">{{item.pubdate}}</div>
        </div>
      </div>
      <div class="right">
        <span @click="toModify(item.id)"><i class="el-icon-edit">修改</i></span>
        <span @click="delMaterial(item.id)"><i class="el-icon-delete">删除</i></span>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage"
      >
      </el-pagination>
    </el-row>
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
      channel: [], // 定义一个数组来接收文章频道的数据
      list: [], // 获取文章列表的数据
      defaultImg: require('../../assets/img/xixi.jpg'), // 如果没有图片的话，显示这个默认图片
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // 根据文章状态选择tag标签的样式类型
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.changeCondition() // data中的searchForm对象中的数据一旦发生变化，就调用这个handler函数，就调用一次改变条件的函数changeCondition()
      }
    }
  },
  methods: {
    // 修改文章的功能
    toModify (id) {
      // 点击之后去到发布文章的页面
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除方法
    delMaterial (id) {
      this.$confirm('您确定要删除吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！！！'
          })
          this.getArticlesCondition()
        })
      })
    },
    // 用户点击页码时，获取到最新的页码，再重新请求数据
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getArticlesCondition()
    },
    // 改变条件
    changeCondition () {
      this.page.currentPage = 1
      this.getArticlesCondition()
    },
    // 根据筛选条件获取文章列表的方法
    getArticlesCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        per_page: this.page.pageSize, // 每页数量
        page: this.page.currentPage // 当前页数
      }
      this.getArticles(params)
    },
    // 获取所有的文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
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
    this.getArticles()
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
