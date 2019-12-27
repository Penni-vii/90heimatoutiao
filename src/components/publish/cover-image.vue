<template>
  <div class="cover-image">
    <div @click="openDialog" v-for="(item, index) in list" :key="index" class="cover-image-item">
      <img :src="item ? item : defalutImg" alt="">
    </div>
    <el-dialog @close="closeDialog" :visible="dialogVisible">
      <!-- 放置另外一个组件 素材库组件 和上传组件 -->

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defalutImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
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
