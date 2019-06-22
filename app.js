
//app.js
import api from './pages/common/api.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    this.globalData.userInfo = wx.getStorageSync('info');
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //发送请求
        api.wxauthRequest({
          data: {
            user_channel: 0,//0 微信⽤户；1 QQ⽤户；2 微博⽤户
            code: res.code
          },
          success: result => { 
            wx.setStorageSync('info', result.data.data)
            this.globalData.userInfo = result.data.data;
            console.log('----------------');
            console.log(result.data.data);
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    configInfo: null,
    clickDetail: null,
    storeInfo: null,
    addresssInfo: null,
    addressidInfo: null,
    chooseOne: null,
    chooseTwo: null,
    chooseThree: null,
    chooseFour: null,
    defaultAddressId: null,
    comboUrl: null,
    backStep: null,
    otherid: null,
    isCancel: null,
    testDate: null,
    allChooseTest: null,
    currentIndexOne: null
  }
})