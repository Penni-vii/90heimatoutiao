<template>
<el-container>
  <el-aside>
    <layout-aside style="height:100vh;background-color:#353b4e;width:230px;"></layout-aside>
  </el-aside>
  <el-container>
    <el-header>右侧头部</el-header>
    <el-main>右侧主体</el-main>
  </el-container>
</el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
