// pages/mine/subSale.js
import api from '../common/api.js'
const app = getApp();
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    crash_channel: '',
    ser_order_price: 99,
    ser_order_type: 1,
    tip: "你还没有分销特权,请先开通",
    user_wxid: '',
    ser_order_status: 0,
    threshold_consume:0,//分销会员价格

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        var user_wxids = datalist.user_wxid;
        that.setData({
          user_wxid: user_wxids
        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })

    /**查询会员价格 */
    api.distributionConfigRequest({
      data: {},
      success: function(res) {
        console.log("这是会员价格：")
        console.log(res)
        var datalist = res.data.data;
        var threshold_consumes = datalist.threshold_consume;
        that.setData({
          threshold_consume: threshold_consumes
        })
        console.log(datalist)
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("OK")
      }
    })

    wx.setNavigationBarTitle({
      title: '开通分销',
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
var that =this;
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
  /**提交按钮 */
  myDistribution: function(e) {
    var that = this;
    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      ser_order_price: that.data.threshold_consume,
      openid: that.data.user_wxid,
      ser_order_status: that.data.ser_order_status,
      ser_order_type: that.data.ser_order_type

    }

    api.addDistributionMemberRequest({
      data: datalist,
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        console.log(res)
        if (res.data.message == "成功") {
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
              if (datapay = "requestPayment:ok") {
                console.log("恭喜你支付完成！")


                wx.showModal({
                  title: '支付成功',
                  content: '您已经是分销会员了。',
                  success(res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: 'myDistribution',
                      })

                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }

                })
              }
            },
            fail(res) {
              console.log(res);
            }
          })
        }
      }
    })


    // wx:wx.navigateTo({
    //   url: 'myDistribution',

    // })
  },
  /**选择支付方式 */
  choose: function(e) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
    var showView = that.data.showView;
    if (showView == true) {
      that.setData({
        crash_channel: 0
      })
    }
  }
})