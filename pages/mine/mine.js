import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    user_avatar:'',
    user_phone:'',
    user_name:'',
    user_vip_level:'',//等级值
    user_award_worth:'',//成长值


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {      
        var datalist = res.data.data; 
        console.log(datalist)   
        var user_ids = datalist.user_id;
        var user_names = datalist.user_name;
        var user_avatars = datalist.user_avatar;
        var user_phones = datalist.user_phone;
        var user_vip_level = datalist.user_vip_level;
        var user_award_worth = datalist.user_award_worth;
        that.setData({
          user_id: user_ids,
          user_name: user_names,
          user_avatar: user_avatars,
          user_phone: user_phones,
          user_vip_level: user_vip_level,
          user_award_worth: user_award_worth
         
        })
      },
      fail: function (res) {
console.log("会员中心的数据请求失败！")
      },
      complete: function (res) {
        console.log("会员中心的数据请求事件完成！")
      }
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
    app.globalData.currentIndexOne = 0;
    this.setData({
      user_id: app.globalData.userInfo.user_ids,
      user_name: app.globalData.userInfo.user_name,
      user_avatar: app.globalData.userInfo.user_avatar,
      user_phone: app.globalData.userInfo.user_phone,
      user_vip_level: app.globalData.userInfo.user_vip_level,
      user_award_worth: app.globalData.userInfo.user_award_worth

    })
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
    this.onLoad()

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

  },
  /** 查看特权*/
  spe:function(e){
    wx.navigateTo({
      url: 'memberCenters',
    })
  },
  
  /**
   * 待付款页面
   */
  waitPay:function(e){
    var currentIndex=1;
    wx.navigateTo({
      url: 'order?currentIndex=' + currentIndex,
    })
  },
  /**
   * 待发货页面
   */
  waitFaHuo:function(e){
    var currentIndex = 2;
    wx.navigateTo({
      url: 'order?currentIndex=' + currentIndex,
    }) 
  },
  /**
   * 待收货页面
   */
  waitShouHuo:function(e){
    var currentIndex = 3;
    wx.navigateTo({
      url: 'order?currentIndex=' + currentIndex,
    }) 
    
  },
  /**
   * 退货清单
   */
  rebacklist: function (e){
    wx.navigateTo({
      url: 'rebacklist',
    })
  },
  /**
   * 我的分销
   */
  myDistribution: function (e){
    var that = this;
    var user_vip_statu = app.globalData.userInfo.user_vip_status;
    if (user_vip_statu==1){
      wx.navigateTo({
        url: 'myDistribution',
      })
    }else
    wx.navigateTo({
      url: 'subSale',
    })
  },
  /**
   * 收货地址
   */
  myAddressList: function(e){
    wx.navigateTo({
      url: 'save_info',
  })
},
  memberCenters:function(e){
    wx.navigateTo({
      url: 'memberCenters',
    })
  },
  /**关于我们 */
  aboutUs:function(e){
    wx.navigateTo({
      url: 'aboutUs',
      
    })
  },
  /**流程说明 */
  aboutProcess:function(){
    wx.navigateTo({
      url: 'aboutProcess',
    })

  }
})