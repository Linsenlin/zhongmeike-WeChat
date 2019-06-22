// pages/mine/myFenXiao_Order.js
import api from '../common/api.js'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    // 我的分销提成订单
    distributionOrderList:[],
    total_money:0,//总提成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 我的分销提成订单
    api.distributionOrderListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
     
      },
      success: function (res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var datatwo = datalist.page;
        var total_money = datalist.total_money;//总提成
        console.log(datatwo)
        var datathree = datatwo.rows;
        console.log(datathree)
        that.setData({
          distributionOrderList: datathree,
          total_money: total_money

        })
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      }
    })



    wx.setNavigationBarTitle({
      title: '分销订单',
    })
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
  // 我的奖励
  /**进入我的奖励页面 */
  myFenXiaoRewardList: function (e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })

    wx.navigateTo({
      url: 'myFenXiaoRewardList',

    })
  }
})