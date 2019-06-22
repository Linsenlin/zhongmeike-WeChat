// pages/mine/rebacklist.js
import api from '../common/api.js'
const app = getApp();
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArr: ["全部", "待付款", "待发货", "待收货", "已完成"],
    currentIndex: 0,
    currentIndex2: 0,
    empty: true,
    order_statu: '',
    // 查询用户订,单的数据
    orderList: [],
    user_wxid: '',
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.setData({
      currentIndex: options.currentIndex
    })

    // 会员中心的数据请求
    api.userInfoRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        var datalist = res.data.data;
        var user_wxids = datalist.user_wxid;
        that.setData({
          user_wxid: user_wxids
        })
        var user_wxids = that.data.user_wxid;
        console.log("user_wxid=" + user_wxids)
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })



    // 查询用户订单的请求

    that.orderRequest();

    wx.setNavigationBarTitle({
      title: '我的订单',
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
    console.log("app.globalData.isCancel过来了：")
    if (app.globalData.isCancel) {
      that.setData({
        currentIndex:4
      })
      that.onLoad();
      console.log("app.globalData.isCancel过来了：")
      that.orderRequest()
    }
   
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
  /**订单数据请求 */
  orderRequest: function() {
    var that = this;
    

    if (that.data.currentIndex == 0) {
      that.setData({
        status: ''
      })

    } else if (that.data.currentIndex == 1) {
      that.setData({
        status: 0
      })
    } else if (that.data.currentIndex == 2) {
      that.setData({
        status: 4
      })
    } else if (that.data.currentIndex == 3) {
      that.setData({
        status: 1
      })
    } else if (that.data.currentIndex == 4) {
      that.setData({
        status: 2
      })
    }

    api.orderListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id,
        status: that.data.status,

      },
      success: function(res) {
        console.log(res)
        that.setData({
          orderList: res.data.data.rows
               })
        if (res.data.message = "成功") {
          var totalCount = res.data.data.totalCount;
          var pageCount = res.data.data.pageCount;
          if (totalCount == 0) {
            that.setData({
              empty: true,
            })
          } else {
            // for (let i = 1; i <= pageCount; i++) {
            //   api.orderListRequest({
            //     data: {
            //       user_id: app.globalData.userInfo.user_id,
            //       pageNo: i
            //     },
            //     success: function(res) {
            //       console.log(res)
            //       that.setData({
            //         orderList: that.data.orderList.concat(res.data.data.rows)
            //       })
            //       console.log("orderList:")
            //       console.log(that.data.orderList)
            //     },
            //     fail: function(res) {
            //       console.log("数据接收失败！")
            //     }
            //   })
            // }
          }

          console.log("pageCount=" + pageCount)

        }

        console.log("数据接收完毕。")
        if (that.data.orderList != null) {
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
    this.orderRequest()

  },
 




  /**待付款——立即付款 */
  payNow: function(e) {
    var that = this;
    var user_wxids = that.data.user_wxid;
    console.log("user_wxid=" + user_wxids)
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2);
    var datalist = that.data.orderList;
    var order_ids = datalist[clickIndex2].order_id;
    var list = {
      openid: user_wxids,
      order_id: order_ids
    };
    /**立即付款的数据请求（53） */
    /**需要使用微信支付接口，待处理！！！！！！！！！！！！！！！ */
    api.againOrderRequest({
      data: list,
      success: function(res) {
        console.log(res)
        console.log("立即付款成功了！")
        if (res.data.result == 'success') {
          var time = '' + res.data.data.timeStamp
          wx.requestPayment({
            timeStamp: time,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success(res) {
              console.log(res);
              var datapay = res.errMsg;
              if (datapay = "requestPayment:ok") {
                console.log("恭喜你支付完成！")

                api.orderListRequest({
                  data: {
                    user_id: app.globalData.userInfo.user_id,
                    pageNo: 1
                  },
                  success: function(res) {
                    var datas = res.data;
                    console.log(datas);
                    var datalist = datas.data;
                    console.log(datalist);
                    var datadetail = datalist.rows;
                    console.log("datadetail=")
                    console.log(datadetail)
                    that.setData({
                      orderList: datadetail,

                    })
                    console.log("数据刷新成功了！")
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
            fail(res) {
              console.log(res);
            }
          })
        } else {
          wx.showToast({
            title: '支付失败',
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  /**
   * 待付款——取消订单
   */
  cancelOrder: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2);
    var datalist = that.data.orderList;
    console.log("datalist=" + datalist)
    var user_ids = datalist[clickIndex2].user_id;
    console.log("datalist[clickIndex2].user_id=" + user_ids)
    var order_ids = datalist[clickIndex2].order_id;
    console.log("datalist[clickIndex2].order_id=" + order_ids)
    var list = {
      user_id: app.globalData.userInfo.user_id,
      order_id: order_ids
    }
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单？',
      success(res) {
        if (res.confirm) {
          

          // 取消订单的数据请求
          api.cancelOrderRequest({
            data: list,
            success: function (res) {
              console.log("=================")
              console.log(res)
              console.log("取消订单的请求成功！")
              api.orderListRequest({
                data: {
                  user_id: app.globalData.userInfo.user_id,
                  pageNo: 1
                },
                success: function (res) {
                  var datas = res.data;
                  console.log(datas);
                  var datalist = datas.data;
                  console.log(datalist);
                  var datadetail = datalist.rows;
                  console.log(datadetail)
                  that.setData({
                    orderList: datadetail,

                  })
                  console.log("数据刷新成功了！")
                  
                },
                fail: function (res) {
                  console.log("fail")
                },
                complete: function (res) {
                  console.log("complete")
                }
              })

            },
            fail: function (res) {
              console.log("fail")
            },
            complete: function (res) {
              console.log("complete")
            }

          })
        

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  },
   
  // 查看物流
  logistics: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    var list = this.data.orderList;
    var user_ids = list[clickIndex2].user_id;
    var order_ids = list[clickIndex2].order_id;
    var order_img_url = list[clickIndex2].order_info.order_img_url;
    var order_title = list[clickIndex2].order_info.order_title;
    var order_label = list[clickIndex2].order_info.order_label;
    var order_num = list[clickIndex2].order_num;
    var goods_count = list[clickIndex2].goods_count;

    wx.navigateTo({
      url: 'logistics?order_ids=' + order_ids + '&order_img_url=' + order_img_url + '&order_title=' + order_title + '&order_label=' + order_label + '&order_num=' + order_num + '&goods_count=' + goods_count,
    })
  },

  // 查看待发货-查看订单详情
  orderDetail: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2)
    var list = this.data.orderList;
    console.log("现在处于待发货-查看订单详情的位置，主要的数据为orderList=" + list)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)
    /**显示货物信息 */
    var user_name = list[clickIndex2].user_name;
    var user_mobile = list[clickIndex2].user_mobile;
    var order_img_url = list[clickIndex2].order_info.order_img_url;
    var order_title = list[clickIndex2].order_info.order_title;
    var order_label = list[clickIndex2].order_info.order_label;
    var goods_count = list[clickIndex2].goods_count;
    var order_price = list[clickIndex2].order_price;
    var freight = list[clickIndex2].freight;
    var order_create_time = list[clickIndex2].order_create_time;
    var order_express_num = list[clickIndex2].order_express_num;
    var order_address = list[clickIndex2].order_address;
    var order_num = list[clickIndex2].order_num;
    var order_express_company = list[clickIndex2].order_express_company;
    var order_express_phone = list[clickIndex2].order_express_phone;
    var order_status = list[clickIndex2].order_status;


    var status = 0;
    console.log("order_create_time=")
    console.log(typeof order_create_time)
    wx.navigateTo({
      url: '../mine/orderDetail?user_ids=' + user_ids + "&order_ids=" + order_ids + "&clickIndex2=" + clickIndex2 + "&status=" + status + '&user_name=' + user_name + '&user_mobile=' + user_mobile + '&order_img_url=' + order_img_url + '&order_title=' + order_title + '&order_label=' + order_label + '&goods_count=' + goods_count + '&order_price=' + order_price + '&freight=' + freight + '&order_create_time=' + order_create_time + '&order_express_num=' + order_express_num + '&order_address=' + order_address + '&order_num=' + order_num + '&order_express_company=' + order_express_company + '&order_express_phone=' + order_express_phone + '&order_status=' + order_status,

    })
    console.log("user_ids 传递成功=" + user_ids + "nowId=" + order_ids)

  },

  // 已完成-查看详情
  orderDetail2: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2)
    var list = this.data.orderList;
    console.log("现在处于已完成——查看详情的位置，主要的数据为orderList=" + list)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)
    /**显示货物信息 */
    var user_name = list[clickIndex2].user_name;
    var user_mobile = list[clickIndex2].user_mobile;
    var order_img_url = list[clickIndex2].order_info.order_img_url;
    var order_title = list[clickIndex2].order_info.order_title;
    var order_label = list[clickIndex2].order_info.order_label;
    var goods_count = list[clickIndex2].goods_count;
    var order_price = list[clickIndex2].order_price;
    var freight = list[clickIndex2].freight;
    var order_create_time = list[clickIndex2].order_create_time;
    var order_express_num = list[clickIndex2].order_express_num;
    var order_address = list[clickIndex2].order_address;
    var order_num = list[clickIndex2].order_num;
    var order_express_company = list[clickIndex2].order_express_company;
    var order_express_phone = list[clickIndex2].order_express_phone;
    var order_status = list[clickIndex2].order_status;


    var status = 1;
    wx.navigateTo({
      url: '../mine/orderDetail?user_ids=' + user_ids + "&order_ids=" + order_ids + "&clickIndex2=" + clickIndex2 + "&status=" + status + '&user_name=' + user_name + '&user_mobile=' + user_mobile + '&order_img_url=' + order_img_url + '&order_title=' + order_title + '&order_label=' + order_label + '&goods_count=' + goods_count + '&order_price=' + order_price + '&freight=' + freight + '&order_create_time=' + order_create_time + '&order_express_num=' + order_express_num + '&order_address=' + order_address + '&order_num=' + order_num + '&order_express_company=' + order_express_company + '&order_express_phone=' + order_express_phone + '&order_status=' + order_status,

    })
    console.log("user_ids 传递成功=" + user_ids + "nowId=" + order_ids)
  },

  // 已完成-申请退货
  applyForReturn: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log("clickIndex2=" + clickIndex2)
    var list = this.data.orderList;
    console.log("现在处于已完成-申请退货的位置，主要的数据为orderList=" + list)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)
    /**显示货物信息 */

    var order_img_url = list[clickIndex2].order_info.order_img_url;
    var order_title = list[clickIndex2].order_info.order_title;
    var order_label = list[clickIndex2].order_info.order_label;
    var goods_count = list[clickIndex2].goods_count;
    var order_price = list[clickIndex2].order_price;
    var freight = list[clickIndex2].freight;
    var order_status = list[clickIndex2].order_status;



    wx.navigateTo({
      url: 'applyForReturn?user_ids=' + user_ids + "&order_ids=" + order_ids + '&order_img_url=' + order_img_url + '&order_title=' + order_title + '&order_label=' + order_label + '&goods_count=' + goods_count + '&order_price=' + order_price + '&freight=' + freight + '&order_status=' + order_status,

    })

  },

  /** 
   * 待收货——确认收货
   */
  checkDetail: function(e) {
    var that = this;
    var clickIndex2 = e.currentTarget.dataset.currentid;
    console.log(clickIndex2);
    var list = this.data.orderList;
    console.log(list)

    var statu = "list[" + clickIndex2 + "].order_status";
    console.log("statu=" + statu)
    console.log("order_status=" + list[clickIndex2].order_status)
    var user_ids = list[clickIndex2].user_id;
    console.log("list[clickIndex2].user_id=" + user_ids)
    var order_ids = list[clickIndex2].order_id;
    console.log("list[clickIndex2].order_id=" + order_ids)


    var datalist = {
      user_id: user_ids,
      order_id: order_ids,

    }

    api.receivingGoodsRequest({
      data: datalist,

      success: function(res) {
        console.log("==============")
        console.log(res)
        console.log("确认收货成功！")
        api.orderListRequest({
          data: {
            user_id: app.globalData.userInfo.user_id,
            pageNo: 1
          },
          success: function(res) {
            var datas = res.data;
            console.log(datas);
            var datalist = datas.data;
            console.log(datalist);
            var datadetail = datalist.rows;
            console.log(datadetail)
            that.setData({
              orderList: datadetail,

            })
            console.log("数据刷新成功了！")
          },
          fail: function(res) {
            console.log("fail")
          },
          complete: function(res) {
            console.log("complete")
          }
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
})