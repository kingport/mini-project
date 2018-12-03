<template>
  <div class="appointment-contaienr">
    <!-- 进度条 -->
    <progressBar :value='2'></progressBar>
    <!-- 预约 -->
    <div class="appointment-all-container">
      <!-- 上门扫描 -->
      <div class="appointment-scan-container">
        <text>预约上门扫描</text>
      </div>
      <!-- 来货时间 -->
      <div class="appointment-cargo-container">
        <text>预约来货时间</text>
      </div>
    </div>
    <!-- 选择表格 -->
    <div class="table-container">
      <div class="table table-theme table-flex">
        <div 
          class="item" 
          v-for="(item,index) in themeArr" 
          :key="item.id"
          :index="index">
          <text>{{item.title}}</text>
          <text>{{item.text}}</text>
        </div>
      </div>

      <radio-group class="radio-group" @change="radioChange">
      <div 
        v-for="(item,index1) in itemArr" 
        :key="item.id"
        :index="index1"
        class="table table-item table-flex" >
        <div class="item">
          {{item.time}}
        </div>
        <div :style="{color: item.one === '不可选' ? '#999' : '#58beb6'}" class="item">
          <radio 
          @click="test(1)"
          :value="item.time" 
          :disabled="item.one === '不可选' ? true : false" />
          {{item.one}}
        </div>
        <div :style="{color: item.two === '不可选' ? '#999' : '#58beb6'}" class="item">
          <radio 
          @click="test(2)"
          :value="item.time" 
          :disabled="item.two === '不可选' ? true : false" />
          {{item.two}}
        </div>
        <div :style="{color: item.three === '不可选' ? '#999' : '#58beb6'}" class="item">
          <radio 
          @click="test(3)"
          :value="item.time" :disabled="item.three === '不可选' ? true : false" />
          {{item.three}}
        </div>
        <div :style="{color: item.four === '不可选' ? '#999' : '#58beb6'}" class="item">
          <radio 
          @click="test(4)"
          :value="item.time" :disabled="item.four === '不可选' ? true : false" />
          {{item.four}}
        </div>
      </div>
      </radio-group>
    </div>
    <!-- 下一步按钮 -->
    <button class="next-container" type="primary" @click="onSelectAddressPage">下一步</button>
  </div>
</template>

<script>
import progressBar from '@/components/progressBar'

export default {
  components: {
    progressBar
  },

  data () {
    return {
      themeArr: [
        {
          id: 1,
          title: '时间'
        },
        {
          id: 2,
          title: '上午',
          text: '08:00-10:00'
        },
        {
          id: 3,
          title: '上午',
          text: '10:00-12:00'
        },
        {
          id: 4,
          title: '下午',
          text: '13:00-15:00'
        },
        {
          id: 5,
          title: '下午',
          text: '15:00-17:00'
        }
      ],
      itemArr: [
        {
          time: '今天（11.08）',
          one: '可选', 
          two: '可选', 
          three: '不可选', 
          four: '可选'
        },
        {
          time: '明天（11.09）',
          one: '不可选', 
          two: '可选', 
          three: '不可选', 
          four: '可选'
        },
        {
          time: '后天（11.10）',
          one: '不可选', 
          two: '可选', 
          three: '可选', 
          four: '可选'
        }
      ],
      selectDay: '',
      selectTime: ''
    }
  },

  methods: {
    radioChange (e) {
      // 选择哪一天
      this.selectDay = e.target.value
      console.log((e.target.value))
    },
    test(index) {
      // 选择哪个时间段
      switch (index) {
        case 1:
          this.selectTime = '08:00-10:00'
          break;
        case 2:
          this.selectTime = '10:00-12:00'
          break;
        case 3:
          this.selectTime = '13:00-15:00'
          break;
        case 4:
          this.selectTime = '15:00-17:00'
          break;
      
        default:
          break;
      }
      
      console.log(index)
    },
    onSelectAddressPage () {
      const selectDayHour = this.selectDay + this.selectTime
      if(selectDayHour !== '') {
        const url = `../selectAddress/main`
        wx.navigateTo({ url })
      }else {
        // 提示
        wx.showModal({
          title: '提示',
          content: '请选择预约时间'
        })
      }
      console.log(selectDayHour)
    }
  },
  created () {
  },

  onLoad () {
     wx.setNavigationBarTitle({
       title: '预约上门扫描'
     })
  },
}
</script>

<style>
  .appointment-contaienr {
    width: 100%;
    min-height: 100vh;
  }
  .appointment-all-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8vw;
  }
  .appointment-scan-container text{
    color: #58beb6;
    font-size: 3.8vw;
    text-decoration: underline;
  }
  .appointment-cargo-container text{
    color: #999;
    font-size: 3.8vw;
  }
  .table-container {
    display: flex;
    flex-direction: column;
    padding: 10rpx 10rpx 0;
    flex: 1;
  }
  .table {
    height: 100rpx;
    color: rgb(26, 23, 23);
    border-top: 1rpx solid #5f677a;
    border-bottom: 1rpx solid #5f677a;
    text-align: center;
  }
  .table-flex {
    display: flex;
  }
  .item {
    border-right: 1rpx solid #5f677a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    font-size: 3.2vw;
    font-weight: 700;
  }
  .item text {
    padding: 0;
    font-size: 3.2vw;
  }

  .scroll-view {
    flex: 1;
  }
  .next-container {
    width: 50vw;
    height: 8vw;
    margin-top: 3vw;
    background: #48b8c5 !important;
    border-radius: 10vw;
    line-height: 8vw;
    font-size: 3.4vw;
  }

</style>
