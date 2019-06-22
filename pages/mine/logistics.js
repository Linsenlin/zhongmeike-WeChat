// pages/mine/logistics.js
import api from '../common/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_ids: '',
    goods_count:'',
    order_title:'',
    order_img_url:'',
    order_num:'',
    iSuccess:false,
    tracesList:[],
    shipperCode:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var that = this;
    that.setData({
      order_ids: options.order_ids,
      goods_count: options.goods_count,
      order_title: options.order_title,
      order_img_url: options.order_img_url,
      order_num: options.order_num
    })
    api.queryExpressRequest({
      data: {
        order_id: that.data.order_ids
      },
      success: function(res) {
        console.log("这是物流数据：")
        console.log(res)
        if(res.data.message="成功"){
          var traces = res.data.data.Traces;
          var shipperCode = res.data.data.ShipperCode;
          console.log("Traces:")
          console.log(traces)
          that.setData({
            tracesList: traces.reverse(),
            shipperCode: shipperCode
          })
        }
      },
      fail: function(res) {
        console.log("fail")

      },
      compete: function(res) {
        console.log("OK")

      }
    })


    wx: wx.setNavigationBarTitle({
      title: '物流详情',
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

  }
})