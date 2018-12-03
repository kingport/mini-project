<template>
  <div class="address-container">
    <!-- 进度条 -->
    <progressBar :value='3'></progressBar>
    <!-- 选择城市 -->
    <div class="select-city-container">
      <div class="city-item-container">
          <div 
            style="width: 100%"
            class="city-item-container"
            @click="onSelectCity">
            <text class="select-title-container">选择城市</text>
              <div  class="city-select-container">
                <text>{{cityName}}</text>
                <image src='/static/右箭头.png' />
              </div>
          </div>
          <mpvue-picker 
            ref="mpvuePicker" 
            :mode="mode" 
            :pickerValueDefault="pickerValueDefault" 
            @onChange="onChange" 
            @onConfirm="onConfirmSelectType" 
            @onCancel="onCancel" 
            :pickerValueArray="pickerValueArray">
          </mpvue-picker>
      </div>
    </div>
    <!-- 选择区镇 -->
    <div class="select-city-container">
      <div class="city-item-container">
          <div 
            style="width: 100%"
            class="city-item-container"
            @click="onSelectArea">
            <text class="select-title-container">区/镇</text>
              <div  class="city-select-container">
                <text>{{areaName}}</text>
                <image src='/static/右箭头.png' />
              </div>
          </div>
          <mpvue-picker 
            ref="mpvuePickerArea" 
            :mode="mode" 
            :pickerValueDefault="pickerValueDefault" 
            @onChange="onChange" 
            @onConfirm="onConfirmSelectArea" 
            @onCancel="onCancel" 
            :pickerValueArray="pickerValueArray">
          </mpvue-picker>
      </div>
    </div>
    <!-- 默认地址 -->
    <div class="select-city-container">
      <div class="city-item-container">
          <div 
            style="width: 100%"
            class="city-item-container"
            @click="onSelectAddress">
            <text class="select-title-container">默认地址</text>
              <div  class="city-select-container">
                <text>{{areaName}}</text>
                <image src='/static/右箭头.png' />
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressBar'
import mpvuePicker from 'mpvue-picker';

export default {
  components: {
    progressBar,
    mpvuePicker
  },

  data () {
    return {
      cityName: '请选择',
      areaName: '请选择',
      mode: 'selector',
      pickerValueDefault: [], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerCityArray: [
        {
          label: '深圳市',
          value: 1
        },
        {
          label: '上海市',
          value: 2
        },
        {
          label: '重庆市',
          value: 3
        },
        {
          label: '北京市',
          value: 4
        }
      ],
      pickerAreaArray: [
        {
          label: '罗湖区',
          value: 1
        },
        {
          label: '福田区',
          value: 2
        },
        {
          label: '龙华区',
          value: 3
        },
        {
          label: '宝安区',
          value: 4
        }
      ]
    }
  },

  methods: {
    // 点击选择城市
    onSelectCity() {
      this.pickerValueArray = this.pickerCityArray
      this.pickerValueDefault = []
      this.$refs.mpvuePicker.show()
    },
    onConfirmSelectType(e) {
      this.cityName = e.label
      console.log(e)
    },
    // 选择区镇
    onSelectArea () {
      this.pickerValueArray = this.pickerAreaArray
      this.pickerValueDefault = []
      this.$refs.mpvuePickerArea.show()
    },
    onConfirmSelectArea(e) {
      this.areaName = e.label
      console.log(e)
    }
  },

  onLoad () {
     wx.setNavigationBarTitle({
       title: '确认收货地址'
     })
  },

  created () {
  }
}
</script>

<style>
  .address-container {
    width: 100%;
    min-height: 100vh;
  }
  .select-city-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .city-item-container {
    width: 90%;
    height: 20vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .select-title-container {
    font-size: 3.6vw;
  }
  .city-select-container {
    display: flex;
    flex-direction: row;
  }
  .city-select-container text {
    font-size: 3.6vw;
  }
  .city-select-container image {
    width: 5vw;
    height: 5vw;
  }
  
</style>
