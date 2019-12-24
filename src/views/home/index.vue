<template>
<!-- 整个页面的大容器 -->
<el-container>
  <!-- 左侧导航 -->
  <el-aside style="min-height:100vh;background-color:#353b4e;width:230px;">
    <layout-aside></layout-aside>
  </el-aside>
  <!-- 右侧容器 -->
  <el-container>
    <!-- 右侧头部 -->
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <!-- 右侧主体 -->
    <el-main>
      <!-- 二级路由容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
