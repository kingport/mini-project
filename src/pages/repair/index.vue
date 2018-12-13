<template>
  <div class="repair-container">
    <!-- 进度条 -->
    <progressBar :value='1'></progressBar>
    <!-- 类型选择列表 -->
    <div class="repair-type-container">
      <!-- 修复类型 -->
      <div class="repair-item-container">
        <div 
          style="width: 100%"
          class="repair-item-container"
          @click="onSelectType">
          <text class="select-title-container">修复类型</text>
            <div  class="repair-select-container">
              <text>{{repairType}}</text>
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
        
      <!-- 材料选择 -->
      <div class="repair-item-container">
        <div 
          style="width: 100%"
          class="repair-item-container"
          @click="onSelectMaterials">
          <text class="select-title-container">材料选择</text>
            <div  class="repair-select-container">
              <text>{{MaterialsType}}</text>
              <image src='/static/右箭头.png' />
            </div>
        </div>
        <mpvue-picker 
          ref="mpvuePickerMaterials" 
          :mode="mode" 
          :pickerValueDefault="pickerValueDefault" 
          @onChange="onChange" 
          @onConfirm="onConfirmMaterials" 
          @onCancel="onCancel" 
          :pickerValueArray="pickerValueArray">
        </mpvue-picker>
      </div>
      <!-- 牙位图 -->
      <div class="repair-item-container">
        <div 
          style="width: 100%"
          class="repair-item-container"
          @click="onSelectLocation">
          <text class="select-title-container">牙位</text>
            <div  class="repair-select-container">
              <text>请选择</text>
              <image src='/static/右箭头.png' />
            </div>
        </div>
      </div>
      <!-- 模型方式 -->
      <div class="repair-item-container">
        <div 
          style="width: 100%"
          class="repair-item-container"
          @click="onSelectModel">
          <text class="select-title-container">模型方式</text>
            <div  class="repair-select-container">
              <text>{{ModelType}}</text>
              <image src='/static/右箭头.png' />
            </div>
        </div>
        <mpvue-picker 
          ref="mpvuePickerModel" 
          :mode="mode" 
          :pickerValueDefault="pickerValueDefault" 
          @onChange="onChange" 
          @onConfirm="onConfirmModel" 
          @onCancel="onCancel" 
          :pickerValueArray="pickerValueArray">
        </mpvue-picker>
      </div>
    </div>
    <!-- 下一步按钮 -->
    <button class="next-container" type="primary" @click="onSelectTimePage">下一步</button>
    <!-- 牙齿位置选择容器 -->
    <div :style="{display: display}" class="tooth-loctaion-container">
      <!-- 牙位置图 -->
      <!-- <div class="tooth-image-container">
        <image src='/static/WX20181130-142853.png' />
      </div> -->
      <!-- 单个牙齿位置用div模拟 -->
      <div
      v-for="(item,index) in toothImgData"
      @click="onSelectImgtooch(index)"
      :key="index"
      :index="index"
      :style="{top: item.top,left: item.left}"
      class="tooth-item-container">

        <image 
        :style="{width: 
        item.selectToothIndex === 13  ? '10vw'
        :item.selectToothIndex === 23 ? '10vw' 
        :item.selectToothIndex === 45 ? '10vw'
        :item.selectToothIndex === 44 ? '9vw'
        :item.selectToothIndex === 43 ? '9vw' 
        :item.selectToothIndex === 42 ? '9vw' 
        :item.selectToothIndex === 41 ? '9vw' 
        :item.selectToothIndex === 32 ? '9vw' 
        :item.selectToothIndex === 33 ? '9vw' 
        :item.selectToothIndex === 31 ? '8vw' : '12vw'
        }"
        :src="pitchOnIndex[index] ? item.selectImgSrc : item.imgSrc" />
        <text :style="{color: pitchOnIndex[index] ? '#fff' : '#333'}" >{{item.selectToothIndex}}</text>
      </div>
      <!-- 中线横条 -->
      <div class="line-container"></div>
      <!-- 竖直横线 -->
      <div class="cloumn-container"></div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressBar'
import mpvuePicker from 'mpvue-picker'
import toochData from './toothImgData.json'


export default {
  config: {
    "navigationBarTitleText": "填写修复类型"
  },
  data () {
    return {
      display: 'none',
      mode: 'selector',
      repairType: '请选择',
      MaterialsType: '请选择',
      ModelType: '请选择',
      pickerValueDefault: [], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerRepairTypeArray: [
        {
          label: '嵌体',
          value: 1
        },
        {
          label: '高嵌体',
          value: 2
        },
        {
          label: '冠',
          value: 3
        },
        {
          label: '桥（仅限3个单位）',
          value: 4
        }
      ],
      pickerRepairMaterialsArray: [
        {
          label: '烤瓷牙',
          value: 1
        },
        {
          label: '18K纯金',
          value: 2
        },
        {
          label: '10克拉钻',
          value: 3
        },
        {
          label: '陨石',
          value: 4
        }
      ],
      pickerRepairModelArray: [
        {
          label: '上门扫描',
          value: 1
        },
        {
          label: '医生来',
          value: 2
        }
      ],
      pickerValueDefault: [],
      selectToothIndex: null,
      selectToothStatus: false,
      toothImgData: null,
      pitchOnTooths: [], //选中的多个牙齿
      pitchOnIndex: [] //选择牙齿
    }
  },

  components: {
    progressBar,
    mpvuePicker
  },

  methods: {
    // 点击选择修复类型
    onSelectType () {
      this.pickerValueArray = this.pickerRepairTypeArray
      this.pickerValueDefault = []
      this.$refs.mpvuePicker.show()
    },
    // 选择修复类型回调
    onConfirmSelectType(e) {
      // 更改选择值
      this.repairType = e.label
    },
    // 点击选择材料
    onSelectMaterials () {
      this.pickerValueArray = this.pickerRepairMaterialsArray
      this.pickerValueDefault = []
      this.$refs.mpvuePickerMaterials.show()
    },
    // 选择材料后回调
    onConfirmMaterials(e) {
      this.MaterialsType = e.label
    },
    // 点击选择模型方式
    onSelectModel () {
      this.pickerValueArray = this.pickerRepairModelArray
      this.pickerValueDefault = []
      this.$refs.mpvuePickerModel.show()
    },
    onConfirmModel (e) {
      this.ModelType = e.label
    },
    // 点击选择牙齿位置
    onSelectLocation() {
      // 显示牙位图
      this.display = 'block'
    },
    // 点击选中的牙齿图
    onSelectImgtooch(i) {
      if(this.pitchOnIndex[i] === true) {
        this.pitchOnTooths.splice(i,1)
        this.pitchOnIndex[i] = false
      }else{
        this.pitchOnTooths.unshift(i)
        this.pitchOnIndex[i] = true
      }
      console.log(this.pitchOnTooths)
      console.log(this.pitchOnIndex)
    },
    // 点击下一步
    onSelectTimePage () {
      // 判断用户有没有填写必选项
      if((this.repairType&&this.MaterialsType&&this.ModelType) !== '请选择') {
        const url = `../selectTime/main`
        wx.navigateTo({ url })
      } else {
        // 提示
        wx.showModal({
          title: '提示',
          content: '请填写完整的信息'
        })
      }
    },
    onChange(e) {
      console.log(e);
    },
    onCancel(e) {
      console.log(e);
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },

  onLoad () {
    this.toothImgData = toochData
     wx.setNavigationBarTitle({
       title: '填写丽刻修复类型'
     })
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .repair-container{
    width: 100%;
    min-height: 100vh;
  }
  .repair-type-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .repair-item-container {
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
  .repair-select-container {
    display: flex;
    flex-direction: row;
  }
  .repair-select-container text {
    font-size: 3.6vw;
  }
  .repair-select-container image {
    width: 5vw;
    height: 5vw;
  }
  .tooth-loctaion-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
  .tooth-image-container {
    width: 100%;
    height: 70vw;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tooth-image-container image {
    width: 50vw;
    height: 100%;
  }
  .next-container {
    width: 50vw;
    height: 8vw;
    margin-top: 3vw;
    background: #48b8c5;
    border-radius: 10vw;
    line-height: 8vw;
    font-size: 3.4vw;
  }
  .tooth-item-container {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
  }
  .tooth-item-container image {
    width: 12vw;
    height: 10vw;
  }
  .tooth-item-container text {
    padding-left: 1vw;
    font-size: 3.8vw;
    position: absolute;
  }
  .line-container {
    height: 1px;
    background: #000;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -45%;
    margin-top: -0.5vw;
  }
  .cloumn-container {
    height: 20%;
    background: #000;
    width: 1px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -15%;
  }
</style>
