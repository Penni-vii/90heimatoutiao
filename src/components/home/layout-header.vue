<template>
<!-- 根据页面的情况自由组合布局 -->
<!-- 一行 -->
<el-row class="layout-header" type="flex" align="middle">
  <!-- 一行里面有两列 -->
  <el-col class="left" :span="12">
    <i class="el-icon-s-fold"></i>
    <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <!-- 右边的这一列里又有一行 -->
  <el-col class="right" :span="12">
    <el-row type="flex" justify="end" align="middle">
      <img src="../../assets/img/abc.jpg" alt="">
      <el-dropdown>
        <span>Penni-vii</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 20px;
    span {
      font-size: 16px;
      color: #2c3e50;
      margin-left: 4px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
}
</style>
