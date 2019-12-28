<template>
  <div class="cover-image">
    <div @click="openDialog(index)" v-for="(item, index) in list" :key="index" class="cover-image-item">
      <img :src="item ? item : defalutImg" alt="">
    </div>
    <el-dialog @close="closeDialog" :visible="dialogVisible">
      <!-- 放置另外一个组件 素材库组件 和上传组件 -->
      <select-image @selectImgUrl="coverGetUrl"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defalutImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      index: -1 // 选中第几张图片的索引，默认为-1 就是哪张索引都不选中
    }
  },
  methods: {
    // 通过这个方法来获取到子组件select-image传递过来的数据
    coverGetUrl (url) {
      // alert(url)
      // 因为props选项获取到的父组件传递过来的数据都是只读，不可更改的，
      // 所以要回到最原先的父组件上修改，再次进行一次子传父
      this.$emit('selectImgUrl', url, this.index)
      this.closeDialog()
    },
    openDialog (index) {
      this.index = index // 将获取到的图片的索引给到data中的响应数据index
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
  margin: 20px 100px;
  display: flex;
  .cover-image-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
      padding: 20px;
    }
  }
}
</style>
