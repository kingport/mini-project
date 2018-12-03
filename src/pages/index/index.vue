<template>
  <div class="home-container">
    <!-- 首页广告图片容器 -->
    <homeBanner></homeBanner>
    <!-- 客户基本信息 -->
    <div class="user-container">
      <form @submit="submitForm">
        <!-- 医院名称 -->
        <div class="hospital-container"> 
          <input name="hospitalName" placeholder="医院名称"/>
        </div>
        <!-- 医生名称 -->
        <div class="doctor-container"> 
          <input name="doctorName" placeholder="医生名称"/>
        </div>
        <!-- 医生电话 -->
        <div class="doctor-tel-container"> 
          <input 
            name="tel" 
            type='number'
            maxlength="11"
            placeholder="医生电话"/>
        </div>
        <!-- 下一步按钮 -->
        <button class="next-container" type="primary" form-type="submit">下一步</button>
      </form>
    </div>
  </div>
</template>

<script>
import homeBanner from '@/components/homeBanner'
import WxValidate from '../../utils/WxValidate.js'

export default {

  data () {
    return {
    }
  },

  components: {
    homeBanner
  },

  methods: {
    // 表单验证字段
    initValidate () {
      const rules = {
        hospitalName: {
          required: true,
          rangelength: [3, 50],
        },
        doctorName: {
          required: true,
          rangelength: [2, 4]
          },
        tel: {
          required: true,
          tel: true,
        }
      }
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        hospitalName: {
          required: '请输入医院名称',
          rangelength: '请输入正确的医院名称',
        },
        doctorName: {
          required: '请输入姓名',
          rangelength: '请输入2~4个汉字个汉字'
        },
        tel: {
          required: '请输入11位手机号码',
          tel: '请输入正确的手机号码',
        }
      }
      // 创建实例对象
      this.WxValidate = new WxValidate(rules, messages)
    },
    // 显示错误提示
    showModal(error) {
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
    },
    // 点击提交 校验
    submitForm(e) {
      const params = e.target.value
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }
      this.submitInfo(params);
    },
    submitInfo(params) {
      // form提交
      let form = params;
      console.log('将要提交的表单信息：', form);
      // TODO 保存这一部分的信息
      const url = `../repair/main`
      wx.navigateTo({ url })
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
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
    this.initValidate()
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    align-items: center;
  }
  .user-container {
    width: 95%;
    margin: 4vw 0;
  }
  .user-container input {
    border: 1px solid #ccc;
    height: 8vw;
    font-size: 3.4vw;
    padding-left: 2vw;
    margin-bottom: 3vw;
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
</style>
