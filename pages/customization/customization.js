import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: true,
    // 定制-最想解决的数组
    hotWordList:[],
    empty :false,
    currentIndex:0,
    // 肌肤检测报告数据
    create_time:'',
    problem_desc: '',
    skin_desc: '',
    skin_test_score: '',
    hotWord:'',
    showPrice: false,
    anList:[],//多选暂放置的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this;
    // 定制 - 最想解决的数据请求
    api.hotWordListRequest({
      data: {},
      success: function (res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        that.setData({
          hotWordList: datalist,
          hotWord: datalist[0].word_title
        })
        var hotWordList = that.data.hotWordList;
        for (var index in hotWordList) {
          var selects = "hotWordList[" + index + "].select"
          that.setData({
            [selects]: "false",
          })
        };
        console.log(hotWordList)

      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      }
    });

  
    // 肌肤检测结果
    api.skinTestResultRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log("这是定制页面的肌肤检测结果显示:")
        console.log(datas)
        var datalist = datas.data;
        var create_times = datalist.create_time;
        var problem_descs = datalist.problem_desc;
        var skin_descs = datalist.skin_desc;
        var skin_test_scores = datalist.skin_test_score;

        console.log(datalist)
        that.setData({
          create_time: create_times,
          problem_desc: problem_descs,
          skin_desc: skin_descs,
          skin_test_score: skin_test_scores,
          showModal:false,
          empty: true

        })
        console.log("create_time=" + that.data.create_time)
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
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
    var that=this;
    app.globalData.currentIndexOne = 0;
    // 肌肤检测结果
    api.skinTestResultRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log("这是定制页面的肌肤检测结果显示:")
        console.log(datas)
        var datalist = datas.data;
        var create_times = datalist.create_time;
        var problem_descs = datalist.problem_desc;
        var skin_descs = datalist.skin_desc;
        var skin_test_scores = datalist.skin_test_score;

        console.log(datalist)
        that.setData({
          create_time: create_times,
          problem_desc: problem_descs,
          skin_desc: skin_descs,
          skin_test_score: skin_test_scores,
          showModal: false,
          empty: true

        })
        console.log("create_time=" + that.data.create_time)
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      }
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
  /**
   * 立即检测的跳转事件
   */
  mySkin:function(e){
    var that = this;
    var currentIndex=1;
    wx.navigateTo({
      url: '../detection/mySkin?currentIndex=' + currentIndex,
     
    })
  },
  /**
   *蒙层的删除事件
   */
  hidentMask:function(e){
    this.setData({
      showModal:false
    })
  },
  /**
   * 开始定制的按钮部分
   */
  schemeOne:function(e){
    var that = this;
    var lists = that.data.anList;
    var hotWord = lists.toString(lists);
    console.log("hotWord=" + hotWord)
    // var hotWord = that.data.hotWord;
    console.log("开始定制传递的hotWord=" + hotWord)
    if(hotWord!=''){
    wx.navigateTo({
      url: 'schemeOne?hotWord=' + hotWord,
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择您要解决的问题。',
      })
    }
  },
  // 快去检测
  mySkin:function (e){
    wx.navigateTo({
      url: '../detection/mySkin',
     
    })
  },

// 最想解决
  checkIndex:function(e){
    var that = this;
    var hotWordList = that.data.hotWordList;
    var clickIndex = e.currentTarget.dataset.currentid;
    //多选部分
    var item = this.data.hotWordList[clickIndex];
    that.data.anList.push(item.word_title);
    item.select = !item.select;
    this.setData({
      hotWordList: this.data.hotWordList,
    });

    // this.setData({
    //   isShowPrice: showprice
    // })


    this.setData({
      currentIndex: clickIndex
    })
    this.setData({
      showPrice: !this.data.showPrice
    })
  

    var hotWord = hotWordList[clickIndex].word_title;
    console.log("hotword=" + hotWord)
    that.setData({
      hotWord: hotWord
    })
  },
  /**历史检测的跳转事件 */
  detection:function(e){
    app.globalData.currentIndexOne=1;
    wx.switchTab({
      url: '../detection/detection',
     
    })
  }
})