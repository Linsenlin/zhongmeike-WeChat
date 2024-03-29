// pages/sort/goodsDetail.js
import api from '../common/api.js'
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    path: null,
    goods_id: null,
    isLike: true,
    // banner
    imgUrls: [
      "../../jsondata/images/1.png",
      "../../jsondata/images/2.png",
      "../../jsondata/images/3.png",
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "../../jsondata/images/1.png",
      "../../jsondata/images/2.png",
      "../../jsondata/images/3.png",
    ],
    html: "<img src='../../jsondata/images/goods.jpg' style='width:375rpx,height:auto;display:block;'>"
  },
  //预览图片
  previewImage: function (e) {
    console.log(e);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  // addLike() {
  //   this.setData({
  //     isLike: !this.data.isLike
  //   });
  // },
  // 跳到购物车
  // toCar() {
  //   wx.switchTab({
  //     url: '/pages/cart/cart'
  //   })
  // },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })

    this.setData({
      // path: app.globalData.clickDetail,
    });
    // this.data.goods_id = options.goodsid;
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
  },

  //生命周期函数--监听页面显示
  onShow: function () {
  },

  //生命周期函数--监听页面隐藏
  onHide: function () {
  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {
  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
  }
})