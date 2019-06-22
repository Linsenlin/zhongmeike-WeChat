// pages/mine/myFenXiaoQRcode.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_code_url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    /**获取二维码 */
    api.shareCodeRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        console.log(datalist)
        var share_code_urls = datalist.share_code_url;
        that.setData({
          share_code_url: share_code_urls
        })
        var share_code_url = that.data.share_code_url;
        console.log("share_code_url=" + share_code_url)
      },
      fail: function(res) {
        console.log("二维码请求失败")
      },
      complete: function(res) {
        console.log("OK ")
      }
    });

    wx.setNavigationBarTitle({
      title: '二维码',
    })

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
  
})