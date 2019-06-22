// pages/sort/orderTrue.js
import api from '../common/api.js';
const app = getApp();
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    hotWord: '',
    recommendCombo: '',
    goods_thumb_image: '',
    goods_name: '',
    goods_intro: '',
    goods_sale_price: '',
    goods_capacity: '',
    freight: '',
    folding_price: '',
    currentIndex: '',
    user_vip_status: '', //会员类型
    percent: '', //折扣
    goods_sale_status: '', //是否是打折的商品
    showMask: false,
    address_detail: '',
    address_city: '',
    address: '请填写收货地址',
    user_name: '',
    user_phone: '',
    order_create_time: '',
    openids: '',
    user_wxid: '',
    goods_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      user_id: app.globalData.userInfo.user_id,
      goods_id: options.goods_id,
      // goods_capacity_id: options.goods_capacity_id
    })
    var goods_ids = that.data.goods_id;
    // var goods_capacity_ids = that.data.goods_capacity_ids;
    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      goods_id: goods_ids,


    }
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

    /**
     * 数据请求
     */
    api.goodsOrderDetailRequest({
      data: datalist,
      success: function(res) {
        console.log("=============================")
        var datas = res.data.data;
        console.log(datas)

        that.setData({
          recommendCombo: datas
        })
        var recommendCombo = that.data.recommendCombo;
        var goods_thumb_images = recommendCombo.goods_thumb_image;
        var goods_names = recommendCombo.goods_name;
        var goods_intros = recommendCombo.goods_intro;
        var goods_sale_prices = recommendCombo.goods_sale_price;
        var goods_capacitys = recommendCombo.goods_capacity;
        var freights = recommendCombo.freight;
        var folding_prices = recommendCombo.folding_price;
        var user_vip_statuss = recommendCombo.user_vip_status;
        var percents = recommendCombo.percent;
        var goods_sale_statuss = recommendCombo.goods_sale_status;
        that.setData({
          goods_thumb_image: goods_thumb_images,
          goods_name: goods_names,
          goods_intro: goods_intros,
          goods_sale_price: goods_sale_prices,
          goods_capacity: goods_capacitys,
          freight: freights,
          folding_price: folding_prices,
          user_vip_status: user_vip_statuss,
          percent: percents,
          goods_sale_status: goods_sale_statuss
        })
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    })
    /**显示地址 */
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
    if (this.data.number == 1) {
      console.log('传递的信息:');
    } else {
      this.setData({
        number: this.data.number - 1
      })
    }
  },
  /**数量减一 */
  add: function(e) {
    this.setData({
      number: this.data.number + 1
    })

  },
  // 跳转至收货地址
  myNewAddress: function() {
    var that = this;
    wx.navigateTo({
      url: '../mine/save_info',
    });


  },
  /**
   * 显示会员折扣的事件
   */
  tip: function(e) {
    var that = this;
    that.setData({
      showMask: true
    })
  },
  /**
   * 取消显示蒙层的事件
   */
  cancleMask: function(e) {
    var that = this;
    that.setData({
      showMask: false
    })
  },
  /**
   * 支付
   */
  payOrder: function() {

    var that = this;
    if (that.data.address == '请填写收货地址') {
      wx.showModal({
        title: '提示',
        content: '您的地址为空。',
      })
    }

    
    var order_address_ids = app.globalData.addressidInfo;
    var goods_ids = that.data.goods_id;
    var data_s = parseInt(goods_ids)
    console.log(typeof that.data.goods_id)
    var numbers = that.data.number;
    var order_price = that.data.goods_sale_price * that.data.number + that.data.freight - that.data.folding_price;
    var openids = that.data.user_wxid;
    var order_addresss = that.data.address;
    var user_names = app.globalData.addresssInfo.address_contact;
    var user_phones = app.globalData.addresssInfo.address_contact_mobile;
    var freights = that.data.freight;
    let nowTime = time.formatTime(that.data.order_create_time, 'Y-M-D');
    that.setData({
      order_create_time: nowTime
    })

    var datalist = {
      order_create_time: that.data.order_create_time,
      user_id: app.globalData.userInfo.user_id,
      order_address_id: order_address_ids,
      goods_id: data_s,
      order_type: 0,
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
          console.log(res)
          /**库存不足的提示 */
          if (res.data.message == '商品库存不足') {
            wx.showModal({
              title: '前往支付失败',
              content: '抱歉，商品库存不足，请重新选择。',

            })
          }


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

                })

              },
              fail: function(res) {
                console.log("下单的数据发送失败了！")
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
    
    
  },



  // wx.requestPayment({
  //   timeStamp: '',
  //   nonceStr: '',
  //   package: '',
  //   signType: 'MD5',
  //   paySign: '',
  //   success(res) {
  //     console.log(res);
  //    },
  //   fail(res) {

  //    }
  // })

})