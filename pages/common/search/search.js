import api from '../api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: true,
    storeList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  // 搜索框用户输入值
  inputTyping(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**点击回车键的事件 */
  search: function(e) {
    var that = this;
    var inputValue = that.data.inputValue;
    api.storeListRequest({
      data: {
        key_word: inputValue
      },
      success: function(res) {
        console.log("搜索的请求数据回来了。")
        console.log(res)
        var datas = res.data;
        var storedatas = datas.data.rows;
        that.setData({
          storeList: storedatas
        });
      }
    })
    if (that.data.storeList != null) {
      that.setData({
        empty: false
      });
    }
  },
  /**点击店铺 */
  storeDetail: function(e) {
    var index = e.currentTarget.dataset.current;
    app.globalData.storeInfo = this.data.storeList[index];
    wx.navigateTo({
      url: '../../stores/storeDetail',

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