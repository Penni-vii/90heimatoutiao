<template>
 <el-card v-loading="loading">
   <!-- 头部内容 -->
   <bread-crumb slot="header">
    <template slot="title">
      素材管理
    </template>
   </bread-crumb>
   <!-- 上传 -->
   <el-row type="flex" justify="end">
     <el-upload :show-file-list="false" action="" :http-request="uploadImg">
       <el-button type="primary" size="small" >上传图片</el-button>
     </el-upload>
   </el-row>
   <!-- 标签页选项卡 -->
   <el-tabs v-model="activeName" @tab-click="changeTab">
     <el-tab-pane label="全部图片" name="all">
       <div class="hehe">
         <el-card class="img-card" v-for="item in list" :key="item.id">
           <img :src="item.url" alt="">
           <el-row class="haha" type="flex" align="middle" justify="space-around">
             <i class="el-icon-star-on"></i>
             <i class="el-icon-delete-solid"></i>
           </el-row>
         </el-card>
       </div>
     </el-tab-pane>
     <el-tab-pane label="收藏图片" name="collect">
       <div class="hehe">
         <el-card class="img-card" v-for="item in list" :key="item.id">
           <img :src="item.url" alt="">
         </el-card>
       </div>
     </el-tab-pane>
   </el-tabs>
   <!-- 公共分页组件 -->
   <el-row type="flex" justify="center" height="80px">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage"
      ></el-pagination>
    </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材数据
      loading: false,
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    // 上传文件的方法
    uploadImg (params) {
      this.loading = true
      let fd = new FormData()
      fd.append('image', params.file) // 把文件加到参数中
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: fd // 将fd兑现传给接口文档中需要的参数对象data中
      }).then(res => {
        this.loading = false
        this.getMaterial()
      })
    },
    // 点击分页时的方法
    changePage (newPage) {
      this.page.currentPage = newPage // 将最新获取到的页码给当前页
      this.getMaterial() // 重新获取数据
    },
    // 切换选项时的方法
    changeTab () {
      this.page.currentPage = 1 // 每次切换选项时，都将页码重置为1
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage, // 页数
          per_page: this.page.pageSize // 每页数量
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.hehe {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 220px;
    position: relative;
    margin: 20px 50px;
    img {
      width: 100%;
      height: 100%;
    }
    .haha {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 36px;
      background-color: #f4f5f6;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
