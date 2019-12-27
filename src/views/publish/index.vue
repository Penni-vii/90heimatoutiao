<template>
<el-card v-loading="loading">
  <!-- 头部 -->
  <bread-crumb slot="header">
    <template slot="title">
      发布文章
    </template>
  </bread-crumb>
  <!-- 表单组件 -->
  <el-form ref="form" :model="formData" :rules="rules" style="padding-left:50px" label-width="100px">
    <el-form-item prop="title" label="标题">
      <el-input v-model="formData.title" style="width:60%"></el-input>
    </el-form-item>
    <el-form-item prop="content" label="内容">
      <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
    </el-form-item>
    <el-form-item style="margin-top:120px" prop="cover" label="封面">
      <el-radio-group @change="changeType" v-model="formData.cover.type">
        <!-- // 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- {{formData.cover.images}} -->
    <el-form-item prop="channel_id" label="频道">
      <el-select v-model="formData.channel_id" placeholder="请选择">
        <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="publishArticle()" type="primary">发布</el-button>
      <el-button @click="publishArticle(true)">存入草稿</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channel: [], // 定义一个数组来接收频道数据
      formData: { // 要校验的表单数据对象
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 放置封面地址的数组
        },
        channel_id: null // 频道id
      },
      rules: { // 要校验的规则
        // 校验规则 title/content/channel_id 必填项
        title: [{ required: true, message: '文章标题不能为空' }, { min: 5, max: 30, message: '标题的长度在5到30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章内容不能为空' }]
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发表
        this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: { // 封面
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 放置封面地址的数组
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    // 监听 封面类型的改变
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 一张图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三张图
      }
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.form.validate(isOK => {
        if (isOK) {
          // 首先先判断一下是修改还是发布文章
          let articleId = this.$route.params.articleId // 获取到动态路由参数
          // 调用发布接口
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft },
            data: this.formData
          }).then(res => {
            this.$message({
              type: 'success',
              message: '发布文章成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    },
    // 根据文章id获取文章信息
    getArticleById (articleId) {
      this.loading = true // 开启加载
      this.$axios({
        url: `/articles/${articleId}`,
        params: { target: articleId }
      }).then(res => {
        this.loading = false // 关闭加载
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels()
    // 页面一上来就先获取到传过来的文章id
    let articleId = this.$route.params.articleId // 获取动态路由参数
    articleId && this.getArticleById(articleId)// 如果文章id存在，直接根据这个id查询文章信息
  }
}
</script>

<style>

</style>
