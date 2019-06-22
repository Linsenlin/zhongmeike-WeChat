// pages/mine/myFenXiaoRequestWithdrawal.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_profit_money: '',
    input_money: "输入提现金额",
    name: "请输入正确的姓名",
    showView: false,
    crash_count: '',
    crash_channel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      total_profit_money: options.total_profit_money
    })

    wx: wx.setNavigationBarTitle({
      title: '申请提现',

    })
    showView: (options.showView == "true" ? true : false)
  },


  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
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
    var that = this;
    var user_vip_statu = app.globalData.userInfo.user_vip_status;
    if (user_vip_statu == 1) {
      wx.navigateBack({
        url: 'myDistribution', 
      })
      console.log("已成功返回")
    } 
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
  /**选择支付的方式 */
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
  },
  /**输入提现金额 */
  bindKeyInput(e) {
    this.setData({
      crash_count: e.detail.value
    })
  },


  /**申请提现的点击事件 */
  myFenXiaoWithdrawDetail: function() {
    var that = this;
    var total_profit_money = that.data.total_profit_money;

    var crash_count = that.data.crash_count;

    var crash_channel = that.data.crash_channel;

    if (crash_count <= total_profit_money) {
      // 提现申请数据请求
      api.withdrawCashRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          crash_count: crash_count,
          crash_channel: crash_channel

        },
        success: function(res) {
          console.log(res)
          console.log("success")
          wx.showModal({
            title: '成功',
            content: '您已经提现成功了。',
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

        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("complete")
        }
      })
    }
  }
})