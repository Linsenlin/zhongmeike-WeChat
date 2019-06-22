// pages/mine/rebacklist.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArr: ["全部", "申请中", "被拒绝", "已退款"],
    currentIndex: 0,
    currentIndex1: 0,
    user_id: '',
    empty: true,
    // 退货订单数据
    returnOrderList: [],
    pageNo: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 退货订单数据
    var pageNo = that.data.pageNo;
    api.returnOrderListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id,
        pageNo: pageNo
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var datadetail = datalist.rows;
        console.log(datadetail)
        that.setData({
          returnOrderList: datadetail
        })
        if (that.data.returnOrderList != null) {
          that.setData({
            empty: false
          })
        }
        console.log("success")
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    })

    wx.setNavigationBarTitle({
      title: '退货',
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
    // 退货订单数据
    api.returnOrderListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var datadetail = datalist.rows;
        console.log(datadetail)
        that.setData({
          returnOrderList: datadetail
        })
        if (that.data.returnOrderList != null) {
          that.setData({
            empty: false
          })
        }
        console.log("success")
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var pageNo = that.data.pageNo;
    console.log("pageNo=" + pageNo)
    that.setData({
      pageNo: pageNo + 1
    })

    // 退货订单数据
    api.returnOrderListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id,
        pageNo: pageNo
      },
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var datalist = datas.data;
        console.log(datalist)
        var datadetail = datalist.rows;
        console.log(datadetail)
        that.setData({
          returnOrderList: datadetail
        })
        if (that.data.returnOrderList != null) {
          that.setData({
            empty: false
          })
        }
        console.log("success")
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 切换标题
   */
  checkType: function(e) {
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })

  },
  /**
   *申请中- 取消退款
   */
  checkDetail: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log(clickIndex2);
    var list = this.data.returnOrderList;
    console.log(list)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)


    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      order_id: order_ids,

    }

    // 取消退款申请的数据请求
    api.returnGoodsDetailRequest({
      data: datalist,
      success: function(res) {
        if (res.data.message == "成功") {
          console.log(res)
          console.log("取消退款成功")
          wx.showModal({
            title: '成功',
            content: '您已经取消退款成功了。',
          })
          /**刷新页面数据 */
          api.returnOrderListRequest({
            data: {
              user_id: app.globalData.userInfo.user_id
            },
            success: function(res) {
              var datas = res.data;
              console.log(datas)
              var datalist = datas.data;
              console.log(datalist)
              var datadetail = datalist.rows;
              console.log(datadetail)
              that.setData({
                returnOrderList: datadetail
              })
              if (that.data.returnOrderList != null) {
                that.setData({
                  empty: false
                })
              }
              console.log("success")
            },
            fail: function(res) {
              console.log("fail")
            },
            complete: function(res) {
              console.log("complete")
            }
          })

        }
        // api.returnOrderListRequest({
        //   data: {
        //     user_id: app.globalData.userInfo.user_id,

        //   },
        //   success: function (res) {
        //     var datas = res.data;
        //     console.log(datas)
        //     var datalist = datas.data;
        //     console.log(datalist)
        //     var datadetail = datalist.rows;
        //     console.log(datadetail)
        //     that.setData({
        //       returnOrderList: datadetail
        //     })
        //     if (that.data.returnOrderList != null) {
        //       that.setData({
        //         empty: false
        //       })
        //     }
        //     console.log("success")
        //   },
        //   fail: function (res) {
        //     console.log("fail")
        //   },
        //   complete: function (res) {
        //     console.log("complete")
        //   }
        // })

      },
      fail: function(res) {
        console.log("fail")

      },
      complete: function(res) {
        console.log("complete")
      }

    })

  },

  // 被拒绝-查看详情
  refundDetail: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2)
    var list = this.data.returnOrderList;
    console.log("现在处于被拒绝——查看详情的位置，主要的数据为orderList=" + list)
    console.log(list)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)
    var return_statu = list[clickIndex2].return_status;
    wx.navigateTo({
      url: 'refundDetail?user_ids=' + user_ids + "&order_ids=" + order_ids + "&clickIndex2=" + clickIndex2 + "&return_status=" + return_statu

    })
    console.log("user_ids 传递成功=" + user_ids + "nowId=" + order_ids)





    // wx.navigateTo({
    //   url: 'refundDetail',
    // })
  },
  /**
   * 已退款-查看详情
   */
  refundDetail2: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2)
    var list = this.data.returnOrderList;
    console.log("现在处于被拒绝——查看详情的位置，主要的数据为orderList=" + list)
    console.log(list)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)
    var return_statu = list[clickIndex2].return_status;
    wx.navigateTo({
      url: 'refundDetail?user_ids=' + user_ids + "&order_ids=" + order_ids + "&clickIndex2=" + clickIndex2 + "&return_status=" + return_statu

    })
    console.log("user_ids 传递成功=" + user_ids + "nowId=" + order_ids)





  }
})