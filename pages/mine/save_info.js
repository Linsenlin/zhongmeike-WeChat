// pages/mine/save_info.js
import api from '../common/api.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

    currentIndex: '',

    addressList: [], //收货地址列表

    /**返回订货单页面的数据 */



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
        title: '我的地址',
      }),
      api.addressListRequest({
        data: {
          user_id: app.globalData.userInfo.user_id
        },
        success: function(res) {
          console.log("地址的数据请求成功啦：")
          console.log(res)
          var datas = res.data.data;
          console.log(datas)
          that.setData({
            addressList: datas
          })

          /**选择默认地址 */
          for (let i = 0; i < that.data.addressList.length; i++) {
            if (that.data.addressList[i].address_status == 1) {
              app.globalData.addresssInfo = that.data.addressList[i];
              console.log("app.globalData.addresssInfo=" + app.globalData.addresssInfo)
            }
          }

          console.log("app.globalData.addresssInfo:" + app.globalData.addresssInfo)
        },
        fail: function(res) {
          console.log("fail")
        },
        complete: function(res) {
          console.log("OK")
        }
      })
    if (that.data.addressList=='') {
      app.globalData.addresssInfo = null;
      console.log("app.globalData.addresssInfo=" + app.globalData.addresssInfo)
    }
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
    // wx.showModal({
    //   title: '提示',
    //   content: "是否放弃此次编辑？"
    // })
    var that = this;

    // if()
    api.addressListRequest({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res) {
        console.log("地址的数据重新请求成功啦：")
        console.log(res)
        var datas = res.data.data;
        console.log(datas)
        that.setData({
          addressList: datas
        })
        for (let i = 0; i < that.data.addressList.length; i++) {
          if (that.data.addressList[i].address_status == 1) {
            app.globalData.addresssInfo = that.data.addressList[i];
            console.log("app.globalData.addresssInfo=" + app.globalData.addresssInfo)
          }
        }
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("OK")
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {

    }
  },
  /** 新增地址*/
  myNewAddress: function(e) {
    var address_id = '';
    var address_contact = '';
    var address_contact_mobile = '';
    var address_city = '';
    var address_detail = '';
    var address_code = '';
    var newOrEdit=0;
    var tiTle="新增地址";
    wx.navigateTo({
      url: 'myNewAddress?address_id=' + address_id + '&address_contact=' + address_contact + '&address_contact_mobile=' + address_contact_mobile + '&address_city=' + address_city + '&address_detail=' + address_detail + '&address_code=' + address_code + '&newOrEdit=' + newOrEdit + '&tiTle=' + tiTle,
    })
  },
  // 设置/取消常用地址
  setting: function(e) {
    var that = this;

    var datalist = that.data.addressList;
    var clickIndex = e.currentTarget.dataset.currentid;
    that.setData({
      currentIndex: clickIndex
    })
    // var address_statuss = datalist[clickIndex].address_status;
    var address_ids = datalist[clickIndex].address_id;
    app.globalData.addresssInfo = datalist[clickIndex];
    // that.setData({
    //   address_statuss: 1
    // })
    // if (clickIndex == clickIndex) {
    api.updateFrequentAddressRequest({
      data: {
        user_id: app.globalData.userInfo.user_id,
        address_id: address_ids,
        address_status: 1
      },
      success: function(res) {
        console.log("success")
        console.log(res)
        console.log("设置常用地址成功")
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
        api.addressListRequest({
          data: {
            user_id: app.globalData.userInfo.user_id
          },
          success: function(res) {
            console.log("地址的数据请求成功啦：")
            console.log(res)
            var datas = res.data.data;
            console.log(datas)
            that.setData({
              addressList: datas
            })
            for (let i = 0; i < that.data.addressList.length; i++) {
              if (that.data.addressList[i].address_status == 1) {
                app.globalData.addresssInfo = that.data.addressList[i];
                console.log("app.globalData.addresssInfo=" + app.globalData.addresssInfo)
              }
            }
          },
          fail: function(res) {
            console.log("fail")
          },
          complete: function(res) {
            console.log("OK")
          }
        })
      }
    })

    // }

  },
  /**修改地址 */
  editAddress:function(e){
    var that = this;
    var datalist = that.data.addressList;
    var clickIndex = e.currentTarget.dataset.currentid;
    var address_id = datalist[clickIndex].address_id;
    var address_contact = datalist[clickIndex].address_contact;
    var address_contact_mobile = datalist[clickIndex].address_contact_mobile;
    var address_city = datalist[clickIndex].address_city;
    var address_detail = datalist[clickIndex].address_detail;
    var address_code = datalist[clickIndex].address_code;
    var newOrEdit = 1;
    var tiTle ='修改地址';
    wx.navigateTo({
      url: 'myNewAddress?address_id=' + address_id + '&address_contact=' + address_contact + '&address_contact_mobile=' + address_contact_mobile + '&address_city=' + address_city + '&address_detail=' + address_detail + '&address_code=' + address_code + '&newOrEdit=' + newOrEdit + '&tiTle=' + tiTle,
     
      
    })

    console.log("数据传递成功")



  },
  /**删除地址 */
  delAddress:function(e){
    var that = this;
    var datalist = that.data.addressList;
    var clickIndex = e.currentTarget.dataset.currentid;
    var address_id = datalist[clickIndex].address_id;
    api.editAddressRequest({
      data:{
        address_id: address_id,
        address_del:1
      },
      method: 'POST',
      contentType: 'application/json',
      success:function(res){
        console.log("地址已删除")
        console.log(res)
        /**重新请求地址 */
        api.addressListRequest({
          data: {
            user_id: app.globalData.userInfo.user_id
          },
          success: function (res) {
            console.log("地址的数据重新请求成功啦：")
            console.log(res)
            var datas = res.data.data;
            console.log(datas)
            that.setData({
              addressList: datas
            })
            if (that.data.addressList == '') {
              app.globalData.addresssInfo = null;
              console.log("app.globalData.addresssInfo=" + app.globalData.addresssInfo)
            }
          },
          fail: function (res) {
            console.log("fail")
          },
          complete: function (res) {
            console.log("OK")
          }
        })
        wx.showModal({
          title: '提示',
          content: '您的地址已删除。',
        })
        
      },
      fail:function(e){
        console.log("fail")
      },
      complete:function(e){
        console.log("OK")
      }

    })

  }
})