// pages/mine/myDistribution.js
import api from '../common/api.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    share_code_url: '',
    user_name: '',
    user_avatar: '',
    user_belong_name: '',
    total_profit_money: '',
    user_post_crash: '',
    user_balance: '',
    user_vip_status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var that = this;
    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        var user_vip_statu = datalist.user_vip_status;
        that.setData({
          user_vip_status: user_vip_statu
        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })

    // 会员分销信息的数据请求
    api.userDistributionInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {

        var datalist = res.data.data;

        var total_profit_moneys = datalist.total_profit_money;
        var user_names = datalist.user_name;
        var user_avatars = datalist.user_avatar;
        var user_belong_names = datalist.user_belong_name;
        var user_post_crashs = datalist.user_post_crash;
        var user_balances = datalist.user_balance;
        that.setData({
          total_profit_money: total_profit_moneys,
          user_name: user_names,
          user_avatar: user_avatars,
          user_belong_name: user_belong_names,
          user_post_crash: user_post_crashs,
          user_balance: user_balances

        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })


    wx.setNavigationBarTitle({
      title: '我的分销',
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
  /**
   * 跳转至我的团队页面
   */
  myFenXiaomyTeam: function() {
    wx: wx.navigateTo({
      url: 'myFenXiaomyTeam',

    })
  },

  /**
   * 跳转至我的二维码页面
   */
  myFenXiaoQRcode: function(e) {
    wx: wx.navigateTo({
      url: 'myFenXiaoQRcode'
    })
  },

  /**邀请好友 */
  share: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: '中美科',
      path: '/pages/index/index?shareid=' + app.globalData.userInfo.user_id
    }
  },

  /**
   * 跳转至提现页面
   */
  myFenXiaoRequestWithdrawal: function() {
    var that = this;
    var total_profit_money = that.data.total_profit_money;
    wx: wx.navigateTo({
      url: 'myFenXiaoRequestWithdrawal?total_profit_money=' + total_profit_money,

    })
  }
})