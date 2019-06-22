// pages/sort/sortProduct.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: [],
    menu: ["默认", "价格", "新品", "筛选"],
    currentIndex: '0',
    goodsSortList: [], //商品排序的数据

    keyword: '',
    range_type: '',
    goods_id: '',
    goods_capacity_id: '',
    brandName: '',
    list: '',
    up: true,
    productName: '',
    label_id: 0,
    search_word:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      productName: options.productName,
      label_id: options.label_id,
      range_type: options.range_type,
      keyword: options.keyword,
      search_word: options.search_word
    })
    console.log("label_id=" + that.data.label_id)
    wx.setNavigationBarTitle({
      title: that.data.productName
    })
    // 请求商品数据(默认)
    var datalists = {
      user_id: app.globalData.userInfo.user_id,
      label_id: that.data.label_id,
      range_type: that.data.range_type,
      keyword: that.data.keyword,
      search_word: that.data.search_word
      
    }
    api.goodsSortListRequest({
      data: datalists,
      success: function (res) {
        var datas = res.data.data.rows;
        console.log("商品moren排序的数据请求成功啦：")
        console.log(datas)
        console.log("success!")
        that.setData({
          goodsSortList: datas
        })
      },
      fail: function (res) {
        console.log("fail!")
      },
      complete: function (res) {
        console.log("complete!")
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
  /**
   * 选择标题
   */
  checkType: function(e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex,
      range_type: clickIndex + 1
    })
    /**
     * 选择标题后显示相关数据的事件
     * 
     */
    if (clickIndex == 0){
      var datalists = {
        user_id: app.globalData.userInfo.user_id,
        label_id: that.data.label_id,
      }
      api.goodsSortListRequest({
        data:datalists,
        success: function (res) {
          var datas = res.data.data.rows;
          console.log("商品moren排序的数据请求成功啦：")
          console.log(datas)
          console.log("success!")
          that.setData({
            goodsSortList: datas
          })
        },
        fail: function (res) {
          console.log("fail!")
        },
        complete: function (res) {
          console.log("complete!")
        }
      })

      
    }
    if (clickIndex == 1) {
      var range_types = that.data.range_type;
      console.log("range_type=" + range_types)
      var keywords = "1-200";
      var datalist = {
        user_id: app.globalData.userInfo.user_id,
        label_id: that.data.label_id,
        range_type: range_types,
        pageNo: 1,
        keyword: keywords
      };
      /**降序 */
      if (that.data.up == true) {
        api.goodsSortListRequest({
          data: datalist,

          success: function(res) {
            var datas = res.data.data.rows;
            console.log("商品降序的数据请求成功啦：")
            console.log(datas)
            console.log("success!")
            that.setData({
              goodsSortList: datas,
              up: !that.data.up
            })
          },
          fail: function(res) {
            console.log("fail!")
          },
          complete: function(res) {
            console.log("complete!")
          }
        })
      } else {
        var datalist = {
          user_id: app.globalData.userInfo.user_id,
          label_id: that.data.label_id,
          range_type: 1,
          pageNo: 1,
          keyword: keywords
        };
        api.goodsSortListRequest({
          data: datalist,

          success: function(res) {
            var datas = res.data.data.rows;
            console.log("商品升序的数据请求成功啦：")
            console.log(datas)
            console.log("success!")
            that.setData({
              goodsSortList: datas,
              up: !that.data.up
            })
          },
          fail: function(res) {
            console.log("fail!")
          },
          complete: function(res) {
            console.log("complete!")
          }
        })

      }
    }

    /**
     * 跳转至筛选页面
     */
    if (clickIndex == 3) {
      var that= this;
      var label_id = that.data.label_id;
      wx.navigateTo({
        url: 'filter?label_id=' + label_id,
      })
    }

  },
  /**
   * 跳转到订单详情页面
   */
  orderTrue: function(e) {
    var that = this;
    var datalist = that.data.goodsSortList;
    var clickIndex = e.currentTarget.dataset.currentid;
    console.log(clickIndex)
    var url = datalist[clickIndex].goods_detail_url;
    app.globalData.clickDetail = url
    wx.navigateTo({
      url: 'goodsDetail?goodsid=' + datalist[clickIndex].goods_id
    })
  },

})