<template>
  <el-card>
    <!-- 头部组件 -->
    <bread-crumb slot="header">
      <template slot="title">
        账户信息
      </template>
    </bread-crumb>
    <!-- 表单组件 -->
    <el-form style="padding-left:100px" label-width="100px">
      <el-form-item label="用户名">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload class='head-upload' action="" :show-file-list="false">
      <img src="../../assets/img/abc.jpg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  methods: {
    uploadImg () {

    }
  }
}
</script>

<style lang="less" scoped>
.head-upload {
   position: absolute;
   right: 300px;
   top:200px;
    img {
       width: 200px;
       height: 200px;
        border-radius: 50%;
    }
}
</style>
