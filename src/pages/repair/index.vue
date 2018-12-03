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
      <div class="tooth-image-container">
        <image src='/static/WX20181130-142853.png' />
      </div>
      <!-- 单个牙齿位置用div模拟 -->
      <div 
      :style="{
        top: 30.5 - index *5 + 'vw',
        left: 28 + index * 1 + 'vw'
         }"
      v-for="(item,index) in 4"
      :key="index"
      :index="index"
      class="tooth-item-container">

      </div>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/progressBar'
import mpvuePicker from 'mpvue-picker'

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
      pickerValueDefault: []
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
      console.log('显示牙齿位置图')
      // 显示牙位图
      this.display = 'block'
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
          content: '请填写完成的信息'
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
    top: 30vw;
    left: 0;
    width: 100%;
    min-height: 60vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width: 3vw;
    height: 3vw;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
