<template>
<div class="back">
  <el-card class="card">
    <div class="top">
      <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <!-- 表单容器 -->
    <el-form :model="ruleForm" :rules="rules" ref="hehe">
      <!-- 手机号的表单域 -->
      <el-form-item prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <!-- 验证码的表单域 -->
      <el-form-item prop="code">
        <el-input v-model="ruleForm.code" placeholder="请输入您收到的验证码" style="width:68%"></el-input>
        <el-button plain style="float:right">发送验证码</el-button>
      </el-form-item>
      <!-- 复选框的表单域 -->
      <el-form-item prop="check">
        <el-checkbox v-model="ruleForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <!-- 最下面的登录按钮 -->
      <!-- <el-form-item> -->
        <el-button type="primary" style="width:100%" @click="myformLogin">登录</el-button>
      <!-- </el-form-item> -->
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 需要校验的表单数据对象
      ruleForm: {
        mobile: '',
        code: '',
        check: false
      },
      // 需要校验的表单规则
      rules: {
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入您收到的验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您还未勾选我们的条款哦~'))
          }
        } }]
      }
    }
  },
  methods: {
    myformLogin () {
      this.$refs.hehe.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.ruleForm
          }).then(res => {
            console.log(res)
            // 往本地存储localStorage里存储一下用户的token信息
            window.localStorage.setItem('user-token', res.data.data.token)
            // 跳转到主页
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '您的手机号或者验证码填写错误哦~',
              type: 'warning'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.back {
  // background-image: ../../assets/img/backgroundImage.jpg;
  background-image: url('../../assets/img/fj3.jpg');
  // background: url('../../assets/img/backgroundImage.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 420px;
    height: 380px;
    .top {
      text-align: center;
      margin-bottom: 35px;
      img {
        width: 250px;
      }
    }

  }
}
</style>
