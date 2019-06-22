// pages/mine/refundDetail.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    failRefund:"申请退款失败",
    failReason:"您申请的退款, 商家拒绝您的退款请求",
    refundShow:"您的退款证据不足已驳回申请",
    refund:"失败原因",
    order_img_url:'',
    order_label:'',
    order_title:'',
    goods_count:'',
    order_price:'',
    freight:'',
    return_status:'',
    order_reason:'',
    order_desc:'',
    order_status:'',
    order_image:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("欢迎来到被拒绝-查看详情页面")
    this.setData({
      user_ids: options.user_ids,
      order_ids: options.order_ids,
      clickIndex2: options.clickIndex2,
      return_status: options.return_status
    })
    console.log("order_ids=" + this.data.user_ids)
    var user_id = this.data.user_ids;
    console.log("user_id=" + user_id)
    var order_id = this.data.order_ids;
    console.log("order_id=" + order_id)
    var nowindex = this.data.clickIndex2;
    console.log("index=" + nowindex);
    var statu = this.data.return_status;
    console.log("statu=" + statu)

    // 退货订单-被拒绝-查看详情数据
    if (statu == 2) {
      api.orderReturnGoodsDetailRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          order_id: order_id
        },
        success: function (res) {
          console.log("数据发送成功：")
          console.log("order_id=" + order_id)
          var datas = res.data;
          console.log(datas)
          console.log("============================");
          console.log(datas);
          var dataOne = datas.data;
          var order_img_urls = dataOne.goods_info.order_img_url;
          console.log("order_img_urls=" + order_img_urls)
          var order_titles = dataOne.goods_info.order_title;
          var order_labels = dataOne.goods_info.order_label;
          var goods_counts = dataOne.goods_count;
          var order_prices = dataOne.order_price;
          var order_statuss = dataOne.return_status;
          var freights = dataOne.freight;
          var goods_counts = dataOne.goods_count;
          var order_prices = dataOne.order_price;
          var order_reasons = dataOne.order_reason;
          var order_descs = dataOne.order_desc;
          var order_statuss = dataOne.order_status;
          var order_images= dataOne.order_image;
          that.setData({
            order_img_url: order_img_urls,
            order_title: order_titles,
            order_label: order_labels,
            goods_count: goods_counts,     
            freight: freights,
            goods_count: goods_counts,
            order_price: order_prices,
            order_reason: order_reasons,
            order_desc: order_descs,
            order_status: order_statuss,
            order_image: order_images,
            failRefund: "申请退款失败",
            failReason: "您申请的退款, 商家拒绝您的退款请求",
            refundShow: "您的退款证据不足已驳回申请",
           
            // showcolor: true

          })
          console.log("这是您的订单详情信息！")
        },
        fail: function (res) {
          console.log("fial");
        },
        complete: function (res) {
          console.log("complete");
        }

      })
    } else if (statu == 1) {
      api.orderReturnGoodsDetailRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          order_id: order_id
        },
        success: function (res) {
          console.log("数据发送成功：")
          console.log("order_id=" + order_id)
          var datas = res.data;
          console.log(datas)
          console.log("============================");
          console.log(datas);
          var dataOne = datas.data;
          var order_img_urls = dataOne.goods_info.order_img_url;
          console.log("order_img_urls=" + order_img_urls)
          var order_titles = dataOne.goods_info.order_title;
          var order_labels = dataOne.goods_info.order_label;
          var goods_counts = dataOne.goods_count;
          var order_prices = dataOne.order_price;
          var order_statuss = dataOne.return_status;
          var freights = dataOne.freight;
          var goods_counts = dataOne.goods_count;
          var order_prices = dataOne.order_price;
          var order_reasons = dataOne.order_reason;
          var order_descs = dataOne.order_desc;
          var order_statuss = dataOne.order_status;
          var order_images = dataOne.order_image;
         
          that.setData({
            order_img_url: order_img_urls,
            order_title: order_titles,
            order_label: order_labels,
            goods_count: goods_counts,
            freight: freights,
            goods_count: goods_counts,
            order_price: order_prices,
            order_reason: order_reasons,
            order_desc: order_descs,
            order_status: order_statuss,
            order_image: order_images,
            failRefund: "申请退款成功",
            failReason: "您申请的退款, 商家已经帮您处理完成",
            refundShow: "您的退款商家已受理",
            refund: "退款成功",
            // showcolor: true

          })
          console.log("这是您的订单详情信息！")
        },
        fail: function (res) {
          console.log("fial");
        },
        complete: function (res) {
          console.log("complete");
        }

      })
    } 


    wx.setNavigationBarTitle({
      title: '申请退货',
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