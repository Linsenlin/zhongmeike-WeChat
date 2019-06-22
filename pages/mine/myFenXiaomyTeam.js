// pages/mine/myFenXiao_myTeam.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["二级", "三级"],
    // 我的团队列表
    myTeamList: [],
    user_second_teams: '0', //二级
    user_third_teams: '0', //三级-
    currentIndex: '0',
    empty: true,
    pageNo: 1,
    totalCountTwo: 0,
    totalCountThree: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var pageNo = that.data.pageNo;

    // 我的团队列表

    api.myTeamRequest({
      data: {
        user_id: app.globalData.userInfo.user_id,
        pageNo: pageNo,
        type: 1
      },
      success: function(res) {
        console.log(res)
        var datas = res.data;

        var datalist = datas.data;

        var datatwo = datalist.rows;
        var user_second_team = datalist.totalCount;
        console.log(datatwo)
        that.setData({
          myTeamList: datatwo,
          user_second_teams: user_second_team
        })
        console.log("myTeamList")
        if (that.data.myTeamList != null) {
          that.setData({
            empty: false,
          })
        }
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    })


    wx.setNavigationBarTitle({
      title: '我的团队',
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
    var that = this;
    var pageNoOne = 1;
    var pageNoTwo = 1;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })
    console.log(clickIndex)
    if (clickIndex == 0) {
      api.myTeamRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          pageNo: pageNoOne + 1,
          type: 1
        },
        success: function(res) {
          console.log(res)
          var datas = res.data;

          var datalist = datas.data;

          var datatwo = datalist.rows;
          console.log(datatwo)
          that.setData({
            myTeamList: datatwo
          })
        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("complete")
        }
      })

    } else if (clickIndex == 1) {
      api.myTeamRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          pageNo: pageNoTwo + 1,
          type: 2
        },
        success: function(res) {
          console.log(res)
          var datas = res.data;

          var datalist = datas.data;

          var datatwo = datalist.rows;
          console.log(datatwo)
          that.setData({
            myTeamList: datatwo
          })
        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("complete")
        }
      })

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  myFenXiaoOrder: function() {
    wx: wx.navigateTo({
      url: 'myFenXiaoOrder',

    })
  },
  /**
   * 切换标题
   */
  checkType: function(e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })
    console.log(clickIndex)
    if (clickIndex == 0) {
      api.myTeamRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          type: 1
        },
        success: function(res) {
          console.log(res)
          var datas = res.data;

          var datalist = datas.data;

          var datatwo = datalist.rows;
          var user_second_team = datalist.totalCount;

          console.log(datatwo)
          that.setData({
            myTeamList: datatwo,
            user_second_teams: user_second_team
          })
        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("complete")
        }
      })

    } else if (clickIndex == 1) {
      api.myTeamRequest({
        data: {
          user_id: app.globalData.userInfo.user_id,
          type: 2
        },
        success: function(res) {
          console.log(res)
          var datas = res.data;

          var datalist = datas.data;

          var datatwo = datalist.rows;
          var user_third_teams = datalist.totalCount;
          console.log(datatwo)
          that.setData({
            myTeamList: datatwo,
            user_third_teams: user_third_teams
          })
        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("complete")
        }
      })

    }
  }
})