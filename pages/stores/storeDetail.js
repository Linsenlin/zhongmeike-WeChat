// pages/stores/storeDetail.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    // 走马灯
    imgUrls: [],
    imgUrl:[],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: "rgba(204, 204, 204, 1)",
    indicatorActiveColor: "#333333",
    interval: 2000,
    duration: 1000,
    info:null,
    index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    this.setData({
      info:app.globalData.storeInfo
    })
    wx.setNavigationBarTitle({
      title: app.globalData.storeInfo.store_name,
    })
    var imgInfo = app.globalData.storeInfo.store_img;
    console.log("imgInfo="+imgInfo)
    let a = imgInfo.split(",");
    console.log("a="+a)
   
    that.setData({
      imgUrls: a
    })
    console.log(that.data.imgUrls)
   
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
  // 显示店铺详情页面
  newStore: function(e) {
    wx.navigateTo({
      url: 'newStore',

    })
  },
  /**点击位置的图标事件 */
  local: function(e) {
    wx.openLocation({
      latitude: Number(app.globalData.storeInfo.store_latitude),
      longitude: Number(app.globalData.storeInfo.store_longitude),
      scale: 18
    })
  },
  /**点击电话图标事件 */
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: app.globalData.storeInfo.store_mobile,
    })
  },
  /**与轮播图的下标获取有关的事件 */
  onSlideChangeEnd:function(e){
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
  }
})