// pages/mine/myFenXiaoRewardList.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //我的奖励列表
    myBountyList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 我的奖励请求
    api.myBountyRequest({
      data:{
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var datathree = datalist.rows;
        console.log(datathree)
        that.setData({
          myBountyList: datathree
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
      title: '我的奖励',
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

  }
})