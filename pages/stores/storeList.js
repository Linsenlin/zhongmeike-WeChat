// pages/stores/storeList.js

import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList: [],
    pageNo: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 门店列表请求
    var pageNos = that.data.pageNo;
    console.log("pageNo=" + pageNos)
    api.storeListRequest({
        data: {
          pageNo: 1
        },
        success: function(res) {
          var datas = res.data;
          var storedatas = datas.data.rows;
          that.setData({
            storeList: storedatas
          });
        },
        fail: function(res) {
          console.log("error==" + res);
        },
        complete: function(res) {
          console.log("complete==" + res);
        }
      }),

      wx.setNavigationBarTitle({
        title: '实体店',
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
    var that = this;
    // 门店列表请求
    var pageNos = that.data.pageNo;
    console.log("pageNo=" + pageNos)
    api.storeListRequest({
      data: {
        pageNo: pageNos
      },
      success: function(res) {
        var datas = res.data;
        var storedatas = datas.data.rows;
        that.setData({
          storeList: storedatas
        });
      },
      fail: function(res) {
        console.log("error==" + res);
      },
      complete: function(res) {
        console.log("complete==" + res);
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    // 门店列表请求

    that.setData({
      pageNo: pageNos + 1
    })
    var pageNos = that.data.pageNo;
    console.log("pageNo=" + pageNos)
    api.storeListRequest({
      data: {
        
      },
      success: function(res) {
        console.log(res)
        var datas = res.data;
        var storedatas = datas.data.rows;
        that.setData({
          storeList: storedatas
        });
      },
      fail: function(res) {
        console.log("error==" + res);
      },
      complete: function(res) {
        console.log("complete==" + res);
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 跳转至店铺详情页面
  storeDetail: function(e) {
    var index = e.currentTarget.dataset.current;
    app.globalData.storeInfo = this.data.storeList[index];
    wx.navigateTo({
      url: 'storeDetail',
      
    })
  }

})