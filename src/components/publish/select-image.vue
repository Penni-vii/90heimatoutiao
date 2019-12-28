<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <!-- 外层容器 -->
      <div class="select-image-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img @click="selectImg(item.url)" :src="item.url" alt="">
        </el-card>
      </div>
      <!-- 放置一个分页组件 -->
      <el-row type="flex" justify="center" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        >
        </el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中素材库选项
      list: [], // 定义一个空数组来接收获取到的所有的图片素材
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    selectImg (url) {
      // alert(1)
      // 点击图片的时候调用这个方法，触发this.$emit函数，将url传递到cover-image组件中
      this.$emit('selectImgUrl', url)
    },
    // 点击改变页码时触发的事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取到的所有的图片素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
     width: 150px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
