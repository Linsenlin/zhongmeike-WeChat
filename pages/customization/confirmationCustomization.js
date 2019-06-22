// pages/customization/confirmationCustomization.js
import api from '../common/api.js'
const app = getApp();
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    hotWord: '',
    combo_thumb_image: '',
    combo_desc: '',
    combo_name: '',
    combo_total_price: '',
    freight: 0,
    currentIndex: '0',
    combo_id: '0',
    combo_goods: [],
    address: '请填写收货地址',
    order_create_time: '',
    /**热词 */
    hotWord: '',
    munbers: 0,
    total: 0,
    goods_id: '',
    order_type: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.freight = parseInt(that.data.freight);

    that.setData({
      hotWord: options.hotWord
    })
    that.setData({
      munbers: options.munbers
    })
    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        var user_wxids = datalist.user_wxid;
        var user_names = datalist.user_name;
        var user_phones = datalist.user_phone;


        that.setData({
          user_wxid: user_wxids,
          user_name: user_names,
          user_phone: user_phones
        })
        var user_wxids = that.data.user_wxid;
        console.log("user_wxid=" + user_wxids)
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })
    console.log("数据初始化")
    if (that.data.munbers == 0) {
      that.setData({
        combo_thumb_image: options.combo_thumb_image,
        combo_desc: options.combo_desc,
        combo_name: options.combo_name,
        combo_total_price: options.combo_total_price,
        freight: options.freight,
        combo_id: options.combo_id,
        combo_goods: JSON.parse(options.combo_goods)
      })
      var combo_goods = that.data.combo_goods;
      that.data.freight = parseInt(that.data.freight);
      console.log(that.data.freight)
      console.log(typeof that.data.freight)
    }
    /**来自首页——产品精选的数据 */
    if (that.data.munbers == 1) {
      that.setData({
        combo_thumb_image: options.combo_thumb_image,
        combo_desc: options.combo_desc,
        combo_name: options.combo_name,
        combo_total_price: options.combo_total_price,
        freight: options.freight,
        combo_id: options.combo_id,
        order_type: options.order_type,

      })
      that.data.freight = parseInt(that.data.freight);
      that.data.order_type = parseInt(that.data.order_type);
      that.data.combo_id = parseInt(that.data.combo_id);
    }


    /**显示价格 */
    var totals = that.data.combo_total_price * that.data.number + that.data.freight;
    this.setData({
      total: totals
    })
    /**显示地址 */
    console.log("app.globalData.addresssInfo:" + app.globalData.addresssInfo)
    that.setData({
      address: app.globalData.addresssInfo.address_city + app.globalData.addresssInfo.address_detail
    })
   
    wx.setNavigationBarTitle({
      title: '确认订单',
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

    if (app.globalData.addresssInfo) {
      var address_city = app.globalData.addresssInfo.address_city;
      var address_detail = app.globalData.addresssInfo.address_detail;
      var address_contact = app.globalData.addresssInfo.address_contact;
      var address_contact_mobile = app.globalData.addresssInfo.address_contact_mobile;

      that.setData({
        address_contact_mobile: address_contact_mobile,
        address_contact: address_contact,
        address_city: address_city,
        address_detail: address_detail
      })
      var address = address_city + address_detail;
      console.log("address=" + address)
      that.setData({
        address: address
      })


    }
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

  /**数据减一 */
  sub: function(e) {
    var that = this;
    if (this.data.number == 1) {
      console.log('传递的信息:');
    } else {
      this.setData({
        number: this.data.number - 1
      })
      var totals = that.data.combo_total_price * that.data.number + that.data.freight;
      this.setData({
        total: totals
      })
    }
  },
  /**数量减一 */
  add: function(e) {
    var that = this;
    this.setData({
      number: this.data.number + 1
    })
    var totals = that.data.combo_total_price * that.data.number + that.data.freight;
    this.setData({
      total: totals
    })
  },
  // 跳转至收货地址
  myNewAddress: function() {
    wx.navigateTo({
      url: '../mine/save_info',
    });

  },
  /**
   * 采用微信支付
   */
  clickPay: function() {
    var that = this;
    if (that.data.address == '请填写收货地址') {
      wx.showModal({
        title: '提示',
        content: '您的地址为空。',
      })
    }
    /**热词 */
    var hotWord = that.data.hotWord;

    var order_address_ids = app.globalData.addresssInfo.address_id;
    // var data_s = parseInt(order_address_ids)
    // console.log(typeof that.data.goods_id)
    var freights = that.data.freight;
    // var data_s = parseInt(freights)
    var numbers = that.data.number;
    var order_price = that.data.total;
    var openids = that.data.user_wxid;
    var order_addresss = that.data.address;
    var user_names = app.globalData.addresssInfo.address_contact;
    var user_phones = app.globalData.addresssInfo.address_contact_mobile;

    let nowTime = time.formatTime(that.data.order_create_time, 'Y-M-D');
    that.setData({
      order_create_time: nowTime
    })

    var datalist = {
      order_create_time: that.data.order_create_time,
      user_id: app.globalData.userInfo.user_id,
      order_address_id: order_address_ids,
      goods_id: that.data.combo_id,
      order_type: that.data.order_type,
      order_status: 0,
      goods_count: numbers,
      order_price: order_price,
      openid: openids,
      order_address: order_addresss,
      user_name: user_names,
      user_mobile: user_phones,
      freight: freights,
    }


    // 统一下单的接口
    api.addOrderRequest({
      data: datalist,
      method: 'POST',
      contentType: 'application/json',
      success(res) {
        console.log("下单的数据发送成功了！")
        /**库存不足的提示 */
        if (res.data.message == '商品库存不足') {
          wx.showModal({
            title: '前往支付失败',
            content: '抱歉，商品库存不足，请重新选择。',

          })
        }
        console.log(res)
        if (res.data.result == 'success') {
          var time = '' + res.data.data.timeStamp
          wx.requestPayment({
            timeStamp: time,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success(res) {
              console.log(res);
              var datapay = res.errMsg;
              console.log("你支付成功了，请继续支付后的操作：")
              wx.showModal({
                title: '成功',
                content: '您已经支付成功了。',
                success(res) {
                  if (res.confirm) {
                    var currentIndex = 2;
                    wx.navigateTo({
                      url: '../mine/order?currentIndex=' + currentIndex,
                    })

                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }

              })

            },
            fail: function(res) {
              console.log("下单的数据发送失败了！")
              wx.showToast({
                title: '成功',
                content: '您支付失败了！',
                duration: 2000
              })
            },
            complete: function(res) {
              console.log("下单的数据发送事件完成了！")
            }

          })
        }
      },
      fail: function(e) {
        console.log("下单失败")
      },
      complete: function(res) {
        console.log("下单事件完成！")
      }
    })

    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success(res) { },
    //   fail(res) { }
    // })
  }
})