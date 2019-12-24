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
      <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
      <el-dropdown @command="xixi">
        <span>{{userInfo.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 定义一个用户对象
      defaultImg: require('../../assets/img/abc.jpg') // 如果用户信息中没有头像，默认使用这个头像。
    }
  },
  // 页面一上来先调用接口，将用户的信息展示到右上角的信息处
  created () {
    this.$axios({
      url: '/user/profile'
    }).then(res => {
      // debugger
      // console.log(res)
      this.userInfo = res.data
    })
  },
  methods: {
    xixi (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        location.href = 'https://github.com/Penni-vii/90heimatoutiao'
      } else {
        localStorage.removeItem('user-token') // 删除token
        this.$router.push('/login') // 回到登录页
      }
    }
  }
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
