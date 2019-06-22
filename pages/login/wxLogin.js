// pages/login/wxLogin.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.backStep == 1) {
      wx.navigateBack({
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 跳转至登录页面
  login: function (e) {
    console.log(e.detail.userInfo);
    console.log(e.detail.errMsg);
    if (e.detail.errMsg != "getUserInfo:ok") {
      return;
    }
    var pdata = null;
    console.log(app.globalData.otherid);

    if (app.globalData.otherid) {
      console.log("11");

      pdata = {
        user_avatar: e.detail.userInfo.avatarUrl,
        user_name: e.detail.userInfo.nickName,
        user_id: app.globalData.userInfo.user_id,
        user_top_belong_id: app.globalData.otherid,
      }
    } else {
      console.log("22");
      console.log(app.globalData.userInfo);
      pdata = {
        user_avatar: e.detail.userInfo.avatarUrl,
        user_name: e.detail.userInfo.nickName,
        user_id: app.globalData.userInfo.user_id,
      }
    }
    console.log(pdata);

    api.updateRequest({
      data: pdata,
      success: result => {
        console.log(pdata);
        console.log(result);
        if (result.data.result == 'success') {
          if (!result.data.data.user_phone) {
            wx.navigateTo({
              url: 'login',
            })
          } else {
            wx.navigateBack({
              url: '../index/index',
            })
          }
        }
      }
    })
  }
})