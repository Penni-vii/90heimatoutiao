<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <el-menu background-color="#323745" text-color="#adafb5" active-text-color="#ffd04b">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          内容管理
        </template>
        <el-menu-item index="2-1">发布文章</el-menu-item>
        <el-menu-item index="2-2">文章列表</el-menu-item>
        <el-menu-item index="2-3">评论管理</el-menu-item>
        <el-menu-item index="2-4">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          粉丝管理
        </template>
        <el-menu-item index="3-1">图文数据</el-menu-item>
        <el-menu-item index="3-2">粉丝概况</el-menu-item>
        <el-menu-item index="3-3">粉丝画像</el-menu-item>
        <el-menu-item index="3-4">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-aside {
  width: 230px;
  .el-menu {
    border-right: none;
  }
  .title {
    background-color: #2e2f32;
    text-align: center;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
