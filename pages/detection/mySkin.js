// pages/detection/mySkin.js
import api from '../common/api.js'
const app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: '',
    titleShow: '完成下面的测试找到自己适合的护肤产品,完成下面的测试找到自己适合的护肤产品',
    // 肌肤测试题问卷列表
    questionnaireList: [],
    que_id: '',
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    showTitle1: "进入测试",
    showTitle2: "重新测试",
    testDate: ''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      testDate: app.globalData.testDate
    })

    console.log("que_id=" + that.data.que_id);
    wx.setNavigationBarTitle({
      title: '我的肤质',
    });
    // 肌肤测试题问卷列表请求
    api.questionnaireListRequest({
      data: {
        category: 0,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas);
        var dataList = datas.data;
        console.log(dataList);
        that.setData({
          questionnaireList: dataList
        })
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
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
    if (app.globalData.chooseOne) {
      that.setData({
        show1: true
      })
    }
    if (app.globalData.chooseTwo) {
      that.setData({
        show2: true
      })
    }
    if (app.globalData.chooseThree) {
      that.setData({
        show3: true
      })
    }
    if (app.globalData.chooseFour) {
      that.setData({
        show4: true
      })
      if (that.data.show4 == true && that.data.show3 == true && that.data.show2 == true && that.data.show1 == true) {
        app.globalData.testDate = util.formatTime(new Date());
        app.globalData.allChooseTest = true
        console.log("app.globalData.allChooseTest=" + app.globalData.allChooseTest)
      }
    }
    // 肌肤测试题问卷列表请求
    api.questionnaireListRequest({
      data: {
        category: 0,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas);
        var dataList = datas.data;
        console.log(dataList);
        that.setData({
          questionnaireList: dataList
        })
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    })
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
    wx.navigateTo({
      url: 'detection',
      
    })
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
  /**选择测试题 */
  detectionTest: function(e) {
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })
    console.log(clickIndex)
    var datalist = this.data.questionnaireList;
    console.log(datalist)
    var que_id = datalist[clickIndex].que_id;
    console.log("que_id=" + que_id)
    wx.navigateTo({
      url: 'detectionTest?que_id=' + que_id,

    })
  }
})