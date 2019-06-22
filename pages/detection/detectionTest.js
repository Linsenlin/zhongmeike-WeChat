// pages/detection/detectionTest.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 肌肤测试题目 / 答案列表数组
    questionList: [],
    //肌肤检测答案列表
    answerList: [],
    currentIndex: 0,
    currentIndexTwo: -1,
    queIndex: 1,
    question_id: '',
    indexs: 1,
    question_id: '',
    question_desc: '',
    answer_id: '',
    user_id: '',
    que_id: '',
    answer_ids: '',
    answer_id: '',
    degree: '0',
    anList: [],
    length: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      que_id: options.que_id
    })
    var que_ids = this.data.que_id
    console.log("欢迎来到肌肤检测试题：您目前选择的检测ID=" + que_ids)
    // 肌肤测试题目 / 答案列表
    api.questionListRequest({
      data: {
        que_id: que_ids
      },
      success: function(res) {

        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        that.setData({
          questionList: datalist
        })
        console.log("数组的长度如下：")
        var lengths = that.data.questionList.length;
        that.setData({
          length: lengths
        })
        console.log(that.data.length)

      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }

    })

    /**
     * 改变标题
     */
    wx.setNavigationBarTitle({
      title: '我的肤质',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  // 选择题答案
  answer: function(e) {
    var that = this;
    var anLists = that.data.anList;
    var lengths = that.data.length;
    var clickIndex = e.currentTarget.dataset.currentid;
    console.log("clickIndex=" + clickIndex)
    var questionList = this.data.questionList;
    that.setData({
      currentIndexTwo: clickIndex
    })
    if (that.data.currentIndexTwo != -1) {
      if (this.data.currentIndex < questionList.length - 1) {
        this.setData({
          currentIndex: this.data.currentIndex + 1,
          currentIndexTwo:-1
        });
      }
      var answerId = questionList[this.data.currentIndex - 1].answers[clickIndex].answer_id;
      that.data.anList.push(answerId);
      console.log("answer_id=" + answerId)
      var is_serious = questionList[this.data.currentIndex - 1].answers[clickIndex].is_serious;
      console.log("degree=" + is_serious)
      if (is_serious == 1) {
        this.setData({
          degree: is_serious
        })
        console.log("肌肤的严重程度：degree=" + that.data.degree)
      }

    }
  },
  /**
   * 选择题提交答案
   */
  sumbit: function(e) {
    var that = this;

    var list = that.data.anList;
    console.log(list)
    var lists = list.toString(list)
    console.log("lists=" + lists)
    var que_id = that.data.que_id;
    console.log("传递的que_id=" + que_id)
    var degrees = that.data.degree;
    console.log("传递的degree=" + degrees)
    var datalist = {
      que_id: que_id,
      user_id: app.globalData.userInfo.user_id,
      degree: degrees,
      answer_ids: lists
    }
    api.saveTestRequest({
      data: datalist,
      success: function(res) {
        console.log("GOOD！答题的答案保存事件成功了！")
        console.log("==========================================")
        console.log(res)

      },
      fail: function(res) {
        console.log("sorry！答题的答案保存事件失败了！")
      },
      complete: function(res) {
        console.log("答题的答案保存事件完成了！")
      }
    })
    if (que_id == 1) {
      var that = this;
      var list = that.data.anList;
      console.log(list)
      app.globalData.chooseOne = true;
      wx.navigateBack({
        url: 'mySkin?que_id=' + que_id,
      })
    }
    if (que_id == 2) {
      var that = this;
      var list = that.data.anList;
      console.log(list)
      app.globalData.chooseTwo = true;
      wx.navigateBack({
        url: 'mySkin?que_id=' + que_id,
      })
    }
    if (que_id == 3) {
      var that = this;
      var list = that.data.anList;
      console.log(list)
      app.globalData.chooseThree = true;
      wx.navigateBack({
        url: 'mySkin?que_id=' + que_id,
      })
    }
    if (que_id == 4) {
      var that = this;
      var list = that.data.anList;
      console.log(list)
      app.globalData.chooseFour = true;
      wx.navigateBack({
        url: 'mySkin?que_id=' + que_id,
      })
    }

  }
})