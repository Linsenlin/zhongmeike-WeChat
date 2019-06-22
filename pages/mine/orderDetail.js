
// pages/mine/orderDetail.js
import api from '../common/api.js'
var time = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcolor: false,
    clickIndex2: '',
    user_ids: '',
    applyTitle: '待发货',
    detailTitle: '商家正在打包发货,请耐心等待',
    user_name: '',
    user_mobile: '',
    order_img_url: '',
    order_title: '',
    order_label: '',
    goods_count: '',
    order_price: '',
    order_status: '未发货',
    order_express_company: '暂无信息',
    order_express_phone: '暂无信息',
    freight: '',
    order_express_num: '',
    order_create_time: '',
    order_num: '',
    order_prices: '',
    status: '',
    order_address:'',
    order_num:'',
    total:0,
    order_create_times:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("欢迎来到已完成-订单详情页面")
    this.setData({
      
      status: options.status
    })
    

    // 已完成---订单详情数据请求
    if (that.data.status == 1) {
     
          that.setData({
            user_name: options.user_name,
            user_mobile: options.user_mobile,
            order_img_url: options.order_img_url,
            order_title: options.order_title,
            order_label: options.order_label,
            goods_count: options.goods_count,
            order_status: options.order_status,
            order_express_company: options.order_express_company,
            order_express_phone: options.order_express_phone,
            freight: options.freight,
            order_express_num: options.order_express_num,
            order_create_time: options.order_create_time,
            order_num: options.order_num,
            order_price: options.order_price,
            order_address: options.order_address,
            applyTitle: "已完成",
            detailTitle: "订单已完成交易",
            showcolor: true

          })
    } else if(that.data.status==0) {
     
          that.setData({
            user_name: options.user_name,
            user_mobile: options.user_mobile,
            order_img_url: options.order_img_url,
            order_title: options.order_title,
            order_label: options.order_label,
            goods_count: options.goods_count,
            order_status: options.order_status,
            order_express_company: options.order_express_company,
            order_express_phone: options.order_express_phone,
            freight: options.freight,
            order_express_num: options.order_express_num,
            order_create_time: options.order_create_time,
            order_num: options.order_num,
            order_price: options.order_price,
            order_address: options.order_address,
            applyTitle: "待发货",
            detailTitle: "商家正在打包发货，请耐心等待",
          

          })
         

    }
   
    console.log("order_create_time=" + that.data.order_create_time)
    console.log(typeof that.data.order_create_time)
    that.data.order_create_time = parseInt(that.data.order_create_time);
    console.log("order_create_time=" + that.data.order_create_time)
    console.log(typeof that.data.order_create_time)
    that.data.freight = parseInt(that.data.freight);
   
    that.data.order_price = parseInt(that.data.order_price);
    
    var total = that.data.freight + that.data.order_price;
    that.setData({
      total:total,
      order_create_times: that.data.order_create_time
    })

    wx.setNavigationBarTitle({
      title: '订单详情',
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
   * 页面相关事件处理函数--监听用
   * 作
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