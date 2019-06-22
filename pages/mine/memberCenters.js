// pages/mine/memberCenters.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 会员中心的数据请求
    myMemberCenterList: [],
    user_id: '',
    user_name: '',
    user_vip_level: '',
    next_vip_level: '',
    consume_money: '0',
    user_invite_count: '0',
    user_vip_discount: '0',
    need_consume_money: '',
    need_invite_num: '',
    user_avatar: '',
    myMemberCenterList: [],
    explain: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 会员中心的数据请求
    api.myMemberCenter({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var user_ids = datalist.user_info.user_id;
        var user_names = datalist.user_info.user_name;
        var consume_moneys = datalist.user_info.consume_money;
        var user_invite_counts = datalist.user_info.user_invite_count;
        var user_vip_discounts = datalist.user_info.user_vip_discount;
        var user_avatars = datalist.user_info.user_avatar;
        var need_consume_money = datalist.user_info.need_consume_money;
        var need_invite_num = datalist.user_info.need_invite_num;
        var user_vip_level = datalist.user_info.user_vip_level;
        var next_vip_level = datalist.user_info.next_vip_level;
        var explain = datalist.explain;
        that.setData({
          user_id: user_ids,
          user_name: user_names,
          consume_money: consume_moneys,
          user_invite_count: user_invite_counts,
          user_vip_discount: user_vip_discounts,
          user_avatar: user_avatars,
          need_consume_money: need_consume_money,
          need_invite_num: need_invite_num,
          user_vip_level: user_vip_level,
          next_vip_level: next_vip_level,
          explain: explain
        })




      },
      fail: function(res) {

      },
      complete: function(res) {

      }

    })
    wx.setNavigationBarTitle({
      title: '会员中心',
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
    var that = this;
    // 会员中心的数据请求
    api.myMemberCenter({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var user_ids = datalist.user_info.user_id;
        var user_names = datalist.user_info.user_name;
        var consume_moneys = datalist.user_info.consume_money;
        var user_invite_counts = datalist.user_info.user_invite_count;
        var user_vip_discounts = datalist.user_info.user_vip_discount;
        var user_avatars = datalist.user_info.user_avatar;
        var need_consume_money = datalist.user_info.need_consume_money;
        var need_invite_num = datalist.user_info.need_invite_num;
        var user_vip_level = datalist.user_info.user_vip_level;
        var next_vip_level = datalist.user_info.next_vip_level;
        var explain = datalist.explain;
        that.setData({
          user_id: user_ids,
          user_name: user_names,
          consume_money: consume_moneys,
          user_invite_count: user_invite_counts,
          user_vip_discount: user_vip_discounts,
          user_avatar: user_avatars,
          need_consume_money: need_consume_money,
          need_invite_num: need_invite_num,
          user_vip_level: user_vip_level,
          next_vip_level: next_vip_level,
          explain: explain
        })




      },
      fail: function (res) {

      },
      complete: function (res) {

      }

    })
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
  /**右上角的邀请 */
  /**
   * 跳转至我的二维码页面
   */
  myFenXiaoQRcode: function(e) {
    wx: wx.navigateTo({
      url: 'myFenXiaoQRcode'
    })
  },
  /**
   *  分享
   */
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
  }
})