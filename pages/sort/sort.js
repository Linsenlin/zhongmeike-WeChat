// pages/sort/sort.js
import api from '../common/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    currentIndex2: 0,
    current: 0,
    list: ["商品", "品牌"],
    menu2: ["热门"],
    

   
    // 商品分类的数组
    labelList: [],
    // 商品的品牌数组
    brandList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '分类',
    });
    // 商品分类的数据请求
    api.labelListRequest({
      data: {},
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var dataList = datas.data;
        console.log(dataList)
        that.setData({
          labelList: dataList
        })
      },
      fail: function(res) {
        console.log("fail")
      },
      complete: function(res) {
        console.log("complete")
      }
    });
    // 商品的品牌数据请求
    api.brandListRequest({
      data: {},
      success: function(res) {
        var datas = res.data;
        console.log(datas)
        var dataList = datas.data;
        console.log(dataList)
        var brand = dataList.rows;
        console.log(brand)
        that.setData({
          brandList: brand
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

var that=this;
    var currentIndex = that.data.currentIndex
    if (currentIndex==0){
      // 商品分类的数据请求
      api.labelListRequest({
        data: {},
        success: function (res) {
          var datas = res.data;
          console.log(datas)
          var dataList = datas.data;
          console.log(dataList)
          that.setData({
            labelList: dataList
          })
        },
        fail: function (res) {
          console.log("fail")
        },
        complete: function (res) {
          console.log("complete")
        }
      })
    } else if (currentIndex==1){
      // 商品的品牌数据请求
      api.brandListRequest({
        data: {},
        success: function (res) {
          var datas = res.data;
          console.log(datas)
          var dataList = datas.data;
          console.log(dataList)
          var brand = dataList.rows;
          console.log(brand)
          that.setData({
            brandList: brand
          })
        },
        fail: function (res) {
          console.log("fail")
        },
        complete: function (res) {
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
  // 选择商品或者品牌页面
  checkType: function(e) {
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })

  },
  // 选择左边的菜单栏
  checkMenu: function(e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex2: clickIndex,
      current: clickIndex
    })
  },
  
  // 跳转至产品（如黑头仪）页面
  sortProduct: function(e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    var currentIndex = that.data.currentIndex2;
    var labelLists = that.data.labelList;
    var label_ids = labelLists[currentIndex].son_label;
    var productName = label_ids[clickIndex].label_name;
    var label_id = label_ids[clickIndex].label_id;

      var range_type='';
       var keyword='';
    var search_word='';

    console.log("label_id=" + label_id)
    wx.navigateTo({
      url: 'sortProduct?productName=' + productName + '&label_id=' + label_id + '&range_type=' + range_type + '&keyword=' + keyword + '&search_word=' + search_word,
    })
  },
  /**选择具体的品牌事件 */
  checkBrand:function(e){
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    var brandLists = that.data.brandList;
    var productName = brandLists[clickIndex].brand_name;
    var keyword = brandLists[clickIndex].brand_name;
    var range_type=3;
    var label_id='';
    var search_word='';
    wx.navigateTo({
      url: 'sortProduct?keyword=' + keyword + '&range_type=' + range_type + '&label_id=' + label_id + '&productName=' + productName + '&search_word=' + search_word,
    
    })
  }

})