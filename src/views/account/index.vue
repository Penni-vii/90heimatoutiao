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
        <el-input v-model="formData.name" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.intro" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <!-- 上传组件 -->
    <el-upload class='head-upload' action="" :show-file-list="false">
      <img :src="this.formData.photo ? this.formData.photo : this.default" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        email: '', // 邮箱
        mobile: '', // 手机号
        photo: '' // 头像
      },
      default: require('../../assets/img/abc.jpg')
    }
  },
  methods: {
    // 获取用户数据信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
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
