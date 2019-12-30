<template>
  <el-card v-loading="loading">
    <!-- 头部组件 -->
    <bread-crumb slot="header">
      <template slot="title">
        账户信息
      </template>
    </bread-crumb>
    <!-- 表单组件 -->
    <el-form :model="this.formData" :rules="this.rules" ref="myform" style="padding-left:100px" label-width="100px">
      <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="简介">
        <el-input v-model="formData.intro" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input disabled v-model="formData.mobile" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <!-- 上传组件 -->
    <el-upload :http-request="uploadImg" class='head-upload' action="" :show-file-list="false">
      <img :src="this.formData.photo ? this.formData.photo : this.default" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        email: '', // 邮箱
        mobile: '', // 手机号
        photo: '' // 头像
      },
      default: require('../../assets/img/abc.jpg'), // 默认图片
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名长度在1-7位字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    // 上传头像
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: 'user/photo',
        method: 'patch',
        data: data
      }).then(res => {
        this.loading = false
        this.formData.photo = res.data.photo
      })
    },
    // 保存用户信息
    saveInfo () {
      this.$refs.myform.validate().then(res => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
          // data: { name: this.formData.name, email: this.formData.email }
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存信息成功'
          })
        })
      })
    },
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
