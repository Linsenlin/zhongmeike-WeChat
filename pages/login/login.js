//logs.js
import api from '../common/api.js'
const app = getApp();
var interval = null;
Page({

  // 页面的初始数据
  data: {
    showView: false,
    note: "",
    phoneNember: "",
    click: false,
    max:6,
    current:0,
    codemessage:'获取验证码',
    currentTime:61,
    send:true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    showView: (options.showView == "true" ? true : false);
    click: (options.click == "true" ? true : false)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 手机号输入框
   */
  bindKeyInput1:function(e){
    var value = e.detail.value;
      this.data.phoneNember = value;
  },
  /**
   * 获取验证码
   */
  getVerifycode:function (){
    let that = this;
    if(this.data.phoneNember.length != 11){
      wx.showToast({
        title: '手机号不正确',
        icon:'none'
      })
      return;
    }
    if(!this.data.send){
      return;
    }
    api.sendCodeRequest({
      data:{
        phone:this.data.phoneNember
      },
      success: result =>{
        console.log(result);
        if(result.data.result == 'success'){
          this.data.send = false;
          this.getTime();
          
        }else{
          wx.showToast({
            title: '短信发送失败',
            icon:'none'
          })
        }
      }
    })
  },
  /**
   * 短信倒计时
   */
  getTime: function (){
    var that = this;
    interval = setInterval(function(){
      that.data.currentTime--;
      that.setData({
        codemessage: that.data.currentTime+'s重新发送',
      });
      if (that.data.currentTime <= 0){
        clearInterval(interval);
        that.setData({
          codemessage:'获取验证码',
          currentTime:61,
          send:true
        });

      }
    },1000);
  },
  /**
   * 验证码输入
   */
  bindKeyInput2: function(e) {
    var that = this;
    var value = e.detail.value;
    var length = parseInt(value.length);
    if(value){
      this.setData({
        click:true
      })
    }
    
  },


  /**跳转至测试页面的按钮事件 */
  formSubmit: function(e) {
    var warn = '';
    var flag = true;
    if (e.detail.value.phoneNember == "") {
      warn = "请填写您的手机号码！";
    } else if (e.detail.value.note == "") {
      warn = "请填写您的验证码！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phoneNember))) {
      warn = "手机号格式不正确";
    } else {
      flag = false;
      var that = this;
      console.log(app.globalData.userInfo.user_id);
        api.bindMobileRequest({
          data: {
            user_id: app.globalData.userInfo.user_id,
            phone: e.detail.value.phoneNember,
            code: e.detail.value.note
          },
          success: result => {
            console.log(result);
            if(result.data.result == 'success'){
              app.globalData.userInfo = result.data.data;
              app.globalData.backStep = 1;
              wx.navigateBack({
                url: '../index/index',
              })
            }else{
              wx.showToast({
                title: result.data.message,
              })
            }
          }
        })
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },

  /**获取验证码 */
  identifyingCode: function() {
    var that = this;
    that.setData({
      click: (!that.data.click)
    })
    this.getVerifycode();
  }
})