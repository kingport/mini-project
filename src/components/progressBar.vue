<template>
  <div class="progress-bar-container">
    <div class="progress-all-container">
      <div 
      v-for="(item,index) in progressData" 
      :index="index"
      :key="item.id"
      class="progress-bar">
        <div class="progress-container">
          <image :src=" value >= index ? '/static/对号.png' : '' "/>
        </div>
        <text class="progress-text">{{item.text}}</text>
         <!-- 横条样式 -->
        <div :style="{display: index === 3 ? 'none' : 'block' }" class="trabecula-contianer"></div>
      </div>
    </div>
  </div>
</template>
//
<script>
export default {
  props: ['value'],
  data () {
    return {
      progressData: [
        {
          id: 1,
          text: '填写基本信息'
        },
        {
          id: 2,
          text: '完善修复类型'
        },
        {
          id: 3,
          text: '预约提交时间'
        },
        {
          id: 4,
          text: '确认收获地址'
        }
      ]
    }
  },

  onload () {

  }
}
</script>

<style>
.progress-bar-container {
  width: 100%;
  height: 30vw;
  background: #58beb6;
  display: flex;
  align-items: center;
  position: relative;
}
.progress-all-container {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
}
.progress-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.progress-container {
  width: 8vw;
  height: 8vw;
  background: #fff;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.progress-container image{
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
}
.progress-text {
  font-size: 3.4vw;
  color: #fff;
  margin-top: 2vw;
}
.trabecula-contianer {
  width:17vw;
  height:4rpx;
  background:#fff;
  position:absolute;
  top:11.5vw;
  left:12vw;
  z-index: 1;
}
</style>
