// pages/detection/detectionShow.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 检测结果传递的2个参数
     */
    user_id: '',
    test_date: '',
    skintestRecordList:[],//肌肤检测返回得数据
    currentIndex: 0,
    currentIndex2: 0,
    currentIndex3: 0,
   
    list1: [
      {
        "imgn": "../../images/deThree.png",
        "imgy": "../../images/de1.png",
        "text": "油脂",
        "color": "#B9AAF2"
      
      },
      {
        "imgn": "../../images/den.png",
        "imgy": "../../images/de2.png",
        "text": "水分",
         "color": "#8BD4F1"
      },
      {
        "imgn": "../../images/deTwo.png",
        "imgy": "../../images/de3.png",
        "text": "敏感度",
        "color": "#FFCB9E"
      },
     
      {
        "imgn": "../../images/deFour.png",
        "imgy": "../../images/de4.png",
        "text": "色素分解度",
        "color": "#ADBDD1"
      },
      {
        "imgn": "../../images/deFive.png",
        "imgy": "../../images/de5.png",
        "text": "毛孔清洁度",
        "color": "#FFAED4"
      },

    ],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      test_date: options.test_date
    })
   
    var test_date = this.data.test_date;
    console.log("test_date=" + test_date)
    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      test_date: test_date
    };
    api.skintestRecordRequest({
      data: datalist,
      success: function(res) {
        console.log(res)
        var datas = res.data.data;
        console.log("肌肤检测的数据来啦~")
        console.log(datas)
        that.setData({
          skintestRecordList:datas
        })
       

      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    })
    wx.setNavigationBarTitle({
      title: '测肤报告',
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

  },
  // 成因分析的选择事件
  checkTipy: function(e) {
    var that = this;
    var skintestRecordList = that.data.skintestRecordList;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex2: clickIndex2,
     
    })
  },
  // 肤质问题的选择
  checkQuestion: function(e) {
    var that = this;
    var skintestRecordList = that.data.skintestRecordList;
    var clickIndex3 = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex3: clickIndex3
    })
  }
})