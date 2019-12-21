<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://pic1.win4000.com/wallpaper/c/55c80eff72467.jpg', 'http://img.zcool.cn/community/0106955dc24dbca8012163badb792b.jpg@2o.jpg', 'http://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f9198618367adab4b15a20ac8ed4b31c8601e453.jpg']
    }
  }
}
</script>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
