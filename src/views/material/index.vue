<template>
 <el-card>
   <!-- 头部内容 -->
   <bread-crumb slot="header">
    <template slot="title">
      素材管理
    </template>
   </bread-crumb>
   <!-- 标签页选项卡 -->
   <el-tabs v-model="activeName" @tab-click="changeTab">
     <el-tab-pane label="全部图片" name="all">
       <div class="hehe">
         <el-card class="img-card" v-for="item in list" :key="item.id">
           <img :src="item.url" alt="">
           <el-row class="haha" type="flex" align="middle" justify="space-around">
             <i class="el-icon-star-on"></i>
             <i class="el-icon-delete-solid"></i>
           </el-row>
         </el-card>
       </div>
     </el-tab-pane>
     <el-tab-pane label="收藏图片" name="collect">收藏</el-tab-pane>
   </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [] // 接收素材数据
    }
  },
  methods: {
    changeTab () {
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.hehe {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 220px;
    position: relative;
    margin: 20px 50px;
    img {
      width: 100%;
      height: 100%;
    }
    .haha {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 36px;
      background-color: #f4f5f6;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
