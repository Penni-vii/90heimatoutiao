<template>
<el-card>
  <!-- 头部 -->
  <bread-crumb slot="header">
    <template slot="title">
      发布文章
    </template>
  </bread-crumb>
  <!-- 表单组件 -->
  <el-form style="padding-left:50px" label-width="100px">
    <el-form-item label="标题">
      <el-input style="width:60%"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" :rows="4"></el-input>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group>
        <el-radio>单图</el-radio>
        <el-radio>三图</el-radio>
        <el-radio>无图</el-radio>
        <el-radio>自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select placeholder="请选择">
        <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">发布</el-button>
      <el-button>存入草稿</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channel: [] // 定义一个数组来接收频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
