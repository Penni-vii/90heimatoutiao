<template>
<div class="back">
  <el-card class="card">
    <div class="top">
      <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <!-- 手机号的表单域 -->
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入您的手机号"></el-input>
      </el-form-item>
    </el-form>
    <!-- 验证码的表单域 -->
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入您收到的验证码" style="width:68%"></el-input>
        <el-button plain style="float:right">发送验证码</el-button>
      </el-form-item>
    </el-form>
    <!-- 复选框的表单域 -->
    <el-form>
      <el-form-item>
        <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="width:100%">登录</el-button>
  </el-card>
</div>
</template>

<script>
export default {

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
