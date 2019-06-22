// pages/customization/schemeOne.js
import api from '../common/api.js'
// 引入utils.js
var time = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取推荐套餐
    recommendCombo: [],
    hotWord: '',
    currentIndex: '0',
    combo_id: '0',
    order_create_time: '',
    order_price: '',
    freight: '',
    user_name: '',
    user_mobile: '',
    user_wxid: '',
    combo_desc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        var user_ids = datalist.user_id;
        var user_names = datalist.user_name;
        var user_phones = datalist.user_phone;
        var user_wxids = datalist.user_wxid;
        that.setData({
          user_id: user_ids,
          user_name: user_names,
          user_phone: user_phones,
          user_wxid: user_wxids

        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })

    // 获取推荐套餐
    var that = this;
    that.setData({
      hotWord: options.hotWord
    })
    var hotWord = that.data.hotWord;
    console.log("接收到的hotWord=" + hotWord)
    api.recommendComboRequest({
      data: {
        combo_desc: hotWord
      },
      success: function(res) {
        console.log("=============================")
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data.rows;
        console.log(datalist)
        that.setData({
          recommendCombo: datalist,
          combo_id: datalist[0].combo_id,
          order_price: datalist[0].combo_total_price,
          freight: datalist[0].freight,
          combo_desc: datalist[0].combo_desc
        })
        var recommendCombo = that.data.recommendCombo
        console.log("recommendCombo的数据如下：")
        console.log(recommendCombo)
        wx.setNavigationBarTitle({
          title: datalist[0].combo_name,
        })
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
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
   * 立即购买的按钮事件
   */
  confirmationCustomization: function(e) {
    var that = this;
    var datalist = that.data.recommendCombo;
    console.log("datalist=")
    console.log(datalist)
    var combo_id = that.data.combo_id;
    var currentIndex = that.data.currentIndex;
    var combo_desc = datalist[currentIndex].combo_desc;
    var combo_name = datalist[currentIndex].combo_name;
    var combo_thumb_image = datalist[currentIndex].combo_thumb_image;
    var combo_total_price = datalist[currentIndex].combo_total_price;
    var freight = datalist[currentIndex].freight;
    var combo_goods = JSON.stringify(datalist[currentIndex].combo_goods);
    /**传递热词 */
    var munbers=0;
    var hotWord = that.data.hotWord;
    console.log("combo_goods:")
    console.log(combo_goods)

    wx.navigateTo({
      url: 'confirmationCustomization?combo_desc=' + combo_desc + '&combo_name=' + combo_name + '&combo_thumb_image=' + combo_thumb_image + '&combo_total_price=' + combo_total_price + '&freight=' + freight + '&combo_goods=' + combo_goods + '&combo_id=' + combo_id + '&hotWord=' + hotWord + '&munbers=' + munbers,
    })
  },
  /**
   * 选择套餐事件
   */
  chooseCombo: function(e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    var datalist = that.data.recommendCombo;
    this.setData({
      currentIndex: clickIndex
    })
    var currentIndex = that.data.currentIndex;
    console.log(" currentIndex=" + currentIndex)
    var combo_ids = datalist[clickIndex].combo_id;
    console.log(" combo_id=" + combo_ids)
    var order_prices = datalist[clickIndex].combo_total_price;
    var freights = datalist[clickIndex].freight;
    this.setData({
      combo_id: combo_ids,
      order_price: order_prices,
      freight: freights
    })
    wx.setNavigationBarTitle({
      title: datalist[clickIndex].combo_name,
    })
  },
  /**
   * 保存定制
   */
  addOrderRequest: function(e) {
    var that = this;
    var user_wxid = that.data.user_wxid;
    let nowTime = time.formatTime(that.data.order_create_time, 'Y-M-D');
    console.log("nowTime is:" + nowTime)
    var freights = that.data.freight;
    var order_prices = that.data.order_price;
    var order_price = freights + order_prices;
    var user_names = that.data.user_name;
    var user_mobiles = that.data.user_mobile;
    that.setData({
      order_create_time: nowTime
    })

    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      order_create_time: that.data.order_create_time,
      goods_id: that.data.combo_id,
      order_type: 1,
      order_status: 0,
      goods_count: 1,
      order_price: order_price,
      openid: user_wxid,
      freight: freights,
      user_name: user_names,
      user_mobile: user_mobiles

    };

    api.addOrderRequest({
      data: datalist,
      method: 'POST',
      contentType: 'application/json',
      success(res) {
        console.log("保存定制的数据发送成功了！")
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '您保存套餐成功了，您可前往"我的订单——待付款"页面付款。',
        })


      },
      fail: function(res) {
        console.log("保存定制的数据发送失败了！")
        wx.showModal({
          title: '提示',
          content: '您的操作失败，没有保存套餐，请再试一下吧。',
        })
      },
      complete: function(res) {
        console.log("保存定制的数据发送事件完成了！")
      }
    })
  },
  /**
   * 进一步了解
   */
  nextClick: function() {
    app.globalData.comboUrl = this.data.recommendCombo[this.data.currentIndex].combo_detail_url;
    wx.navigateTo({
      url: 'comboDetail',
    })
  }
})