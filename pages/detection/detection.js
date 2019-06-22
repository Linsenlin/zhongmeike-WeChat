import api from '../common/api.js'
const app = getApp();
Page({
  //页面的初始数据
  data: {
    // 肌肤检测结果
    showResult: [], //历史检测的数组
    skintestItemsList: [], //线下检测的数据
    create_time: '',
    problem_desc: '',
    skin_desc: '',
    skin_test_score: '',
    show: false,
    empty: false,
    currentIndex: 0,
    list: ["智能检测", "历史检测"],
    test_date: '',
    skintestRecordList: [],
    noshow: true,
    allChooseTests: false,
    swiperIndex: 0,//基因包首次加载下标
    img_url: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //基因检测
    that.setData({
      swiperIndex
    })

    var that = this;
    console.log("currentIndex=" + that.data.currentIndex)
    // 肌肤检测结果
    api.skinTestResultRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log("肌肤检测结果:")
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
          show: true

        })
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      },
    })
    // 检测结果的数据显示
    this.setData({
      test_date: app.globalData.testDate
    })

    var test_date = this.data.test_date;
    console.log("test_date=" + test_date)
    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      test_date: test_date
    };
    api.skintestRecordRequest({
      data: datalist,
      success: function (res) {
        console.log(res)
        var datas = res.data.data;
        console.log("肌肤检测的数据来啦~")
        console.log(datas)
        that.setData({
          skintestRecordList: datas
        })
        if (that.data.skintestRecordList != null) {
          that.setData({
            noshow: false
          })
        }
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      }
    });

    // 智能检测-线下检测部分
    api.skintestItemsRequest({
      data: {
        num: 4
      },
      success: function (res) {
        var datas = res.data.data;
        console.log("这是线下检测的数组：")
        console.log(datas)
        that.setData({
          skintestItemsList: datas
        })
      }
    })
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },

  // 生命周期函数--监听页面显示
  onShow: function () {
    console.log(" app.globalData.currentIndexOne=" + app.globalData.currentIndexOne)
    var that = this;
    if (app.globalData.currentIndexOne == 1) {
      that.setData({
        currentIndex: 1
      })
    } else {
      that.setData({
        currentIndex: 0
      })
    }
    if (app.globalData.testDate) {
      test_date: app.globalData.testDate
    }
    if (app.globalData.testDate) {
      that.setData({
        allChooseTests: true
      })
    }
    console.log("that.data.allChooseTests=" + that.data.allChooseTests)
    // 肌肤检测结果
    api.skinTestResultRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        var datas = res.data;
        console.log("肌肤检测结果:")
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
          show: true

        })
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        console.log("complete")
      },
    })
    app.globalData.currentIndexOne = 0;
  },


  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.onLoad()
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })
  },


  //基因包轮播切换
  //滑动切换
  swiperChange(e) {//轮播滑动时，获取当前的轮播id
    console.log(e);
    const that = this;
    that.setData({
      Images: that.data.img_url,
      swiperIndex: e.detail.current,
    })
  },
  //点击切换
  // swichNav: function (e) {
  //   console.log(e);
  //   var that = this;
  //   if (this.data.swiperIndex === e.target.dataset.current) {
  //     console.log("11111");
  //     return false;
  //   } else {
  //     console.log("222222");
  //     that.swiperChange(e);
  //     that.setData({
  //       swiperIndex: e.target.dataset.current
  //     })
  //   }
  // },

  // 选择智能检测或者检测历史
  checkType: function (e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })
    /**历史检测非空部分的数据请求 */
    if (clickIndex == 1) {
      api.historyRecordDateRequest({
        data: {
          user_id: app.globalData.userInfo.user_id
        },
        success: function (res) {
          var datas = res.data.data;
          console.log(datas)
          that.setData({
            showResult: datas
          })
          console.log("GOOD!你的历史测试数据请求成功了。")
        },
        fail: function (res) {
          console.log("sorry!你的历史测试数据请求失败了。")
        },
        complete: function (res) {
          console.log("你的历史测试数据请求事件完成了。")
        }
      })
    } else if (clickIndex == 0) { }
  },
  // 跳转至检测结果显示页面
  detectionShow: function (e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    console.log(clickIndex)
    var datas = that.data.showResult;
    console.log("当前的showResult数据如下：")
    console.log(datas)
    var test_date = app.globalData.testDate;
    console.log("当前的test_date数据如下：")
    console.log(test_date)
    wx.navigateTo({
      url: 'detectionShow?test_date=' + test_date,
    })
  },
  // 跳转至“我的肤质”页面上
  mySkin: function () {
    wx.navigateTo({
      url: 'mySkin',
    })
  },
  //拍照页面
  goPhoto: function () {
    wx.navigateTo({
      url: 'takePhoto',
    })
  },
  // 线下检测——前去体验
  storeList: function (e) {
    wx.navigateTo({
      url: '../stores/storeList',
    })
  },
  /**查看完整报告 */
  detectionShows: function (e) {
    var test_date = app.globalData.testDate;
    wx.navigateTo({
      url: 'detectionShow?test_date=' + test_date,
    })
  }
})