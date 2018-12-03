
const host = `https://www.google.com`

const host = 'http://event-blood-recruitment.sharing8.cn/backend/';
const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJldmVudC1ibG9vZC1yZWNydWl0bWVudC5zaGFyaW5nOC5jbiIsImV4cCI6MTU0MzQzMTkzMCwidXNyIjoib09tQjd3alFSNnozZTlNWThNRi1NZVkyeXFwZyIsInNjcCI6Ind4X3VzZXIifQ.I9sjqtSmpJHIUwvuCFEdRneuCOHvOGa-DpEHgNp2r0X1-Wqlq6Q7yflMmzjVcDcIy1iO6hxEOgYKz5iAIlDVDA'
export {
  host
}
// /sms/:phone/verifyCode
//请求封装
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token 
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}