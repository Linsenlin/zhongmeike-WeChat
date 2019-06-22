//index.js
import api from '../common/api.js'
// 引入utils.js
var time = require("../../utils/util.js");
const app = getApp();

Page({
  data: {
    // 轮播
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: "rgba(204, 204, 204, 1)",
    indicatorActiveColor: "#333",
    interval: 2000,
    duration: 1000,
    // 品牌退货换货
    brandsReturn: [{
      imgUrl: '../../images/index01.png',
      text: '品牌商品',
      wh: 'width: 34rpx; height: 34rpx;'
    },
    {
      imgUrl: '../../images/index02.png',
      text: '七天退货',
      wh: 'width: 39rpx; height: 34rpx;'
    },
    {
      imgUrl: '../../images/index03.png',
      text: '30天换货',
      wh: 'width: 37rpx; height: 32rpx;'
    }
    ],
    // 宣传图片
    propagate_img1: '',
    propagate_img2: '',
    propagate_img3: '',
    // 每周分享
    shareweeklyInfo: [],
    // 用户登录使用的user_top_belong_id
    user_top_belong_id: '',
    currentIndex: 0,
    // 精选产品
    featuredproInfo: []
    // selectedProducts: []
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log("33333333");
    // console.log(options.q);
    // if (options.q) {
    //   var resurl = decodeURIComponent(options.q);
    //   var reg = resurl.match(/\d+/);
    //   app.globalData.otherid = reg[0];
    //   console.log('+++++++++');
    //   console.log(reg[0]);
    // }
    // if (options.shareid) {
    //   app.globalData.otherid = options.shareid;
    // }

    var that = this;
    /*首页 轮播图片请求*/
    api.bannerImgRequest({
      data: {
        channel: 0  //0：⼩程序;1：⽹站
      },
      success: function (res) {
        console.log("首页轮播图片请求:", res);
        that.setData({//轮播图片
          imgUrls: res.data.data
        })
      }
    })

    /*首页 宣传图片*/
    api.propagateImg({
      success: function (res) {
        console.log("首页宣传图:", res);
        var datalist = res.data.data;
        var propagate_img1s = datalist[0].propagate_img;
        var propagate_img2s = datalist[1].propagate_img;
        var propagate_img3s = datalist[2].propagate_img;
        // console.log("propagate_img1=" + propagate_img1s);
        that.setData({ //宣传图片
          propagate_img1: propagate_img1s,
          propagate_img2: propagate_img2s,
          propagate_img3: propagate_img3s
        })
      }
    })

    /*首页 每周分享*/
    api.shareWeekly({
      data: {},
      success: function (res) {
        console.log("首页每周分享:", res);
        that.setData({//每周分享
          shareweeklyInfo: res.data.data.rows,
        });
      },
    });
  },

  //用户相关请求
  loadRequestWithUser: function () {
    var that = this;
    /*首页 精选产品 */
    api.featuredPro({
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log("首页精选产品：", res);
        that.setData({//精选产品
          featuredproInfo: res.data.data
        });
      },
    });
  },

  //判断用户信息授权
  judgeAuth: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log("判断用户信息授权:", res);
        if (app.globalData.userInfo) {
          if (!app.globalData.userInfo.user_avatar) {
            wx.navigateTo({
              url: '../login/wxLogin',
            })
            return;
          }
          if (!app.globalData.userInfo.user_phone) {
            wx.navigateTo({
              url: '../login/login',
            })
            return;
          }
          that.loadRequestWithUser();
        }
      }
    })
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () { },

  //生命周期函数--监听页面显示
  onShow: function () {
    console.log("222222222222");
    this.judgeAuth();
    app.globalData.currentIndexOne = 0;
    console.log(" app.globalData.currentIndexOne=" + app.globalData.currentIndexOne)
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () { },

  // 生命周期函数--监听页面卸载
  onUnload: function () { },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // this.onLoad()
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res);
      },
      // fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })
  },

  /*每周分享信息 */
  shareweeklyInfo: function (e) {
    var that = this;
    var shareweeklyInfos = that.data.shareweeklyInfo;
    var clickIndex = e.currentTarget.dataset.currentid;
    // console.log("clickIndex=" + clickIndex);
    var path = shareweeklyInfos[clickIndex].article_detail_url;
    app.globalData.clickDetailTitle = path;
    var article_id = shareweeklyInfos[clickIndex].article_id;
    /*更新文章浏览量 */
    api.readArticleRequest({
      data: {
        article_id: article_id //⽂章id
      },
      success: function (res) {
        console.log("更新文章浏览量", res);
        /*更新——首页 每周分享 */
        console.log("path=" + path);
        wx.navigateTo({
          url: 'productD?article_id=' + article_id,
        })
        api.shareWeekly({
          success: function (res) {
            console.log("点击后的分享：",res);
            that.setData({
              shareweeklyInfo: res.data.data.rows,
            });
          }
        });
      }
    })
  },

  /*精选产品——选中产品 */
  checkType: function (e) {
    console.log("精选产品点击事件：", e);
    var that = this;
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex: clickIndex
    })
    var featuredproInfos = that.data.featuredproInfo;
    console.log("点击精选产品：", featuredproInfos);
    var goods_detail_url = featuredproInfos[clickIndex].goods_detail_url;
    app.globalData.clickDetail = goods_detail_url;
    // var freight = featuredproInfos[clickIndex].freight;
    var combo_id = featuredproInfos[clickIndex].goods_id;
    // var combo_desc = featuredproInfos[clickIndex].goods_intro;
    // var combo_name = featuredproInfos[clickIndex].goods_name;
    // var combo_total_price = featuredproInfos[clickIndex].goods_sale_price;
    // var combo_thumb_image = featuredproInfos[clickIndex].goods_thumb_image;
    // var combo_goods = featuredproInfos[clickIndex].goods_thumb_image;
    // var munbers = 1;
    // var order_type = 0;
    // var hotWord = '产品精选';
    wx.navigateTo({
      url: '../sort/goodsDetail?goodsid=' + combo_id,
      // success: function (res) {
      //   console.log(res);
      // },
    })

    // wx.navigateTo({
    //   url: '../customization/confirmationCustomization?combo_goods=' + combo_goods + '&freight=' + freight + '&combo_id=' + combo_id + '&combo_desc=' + combo_desc + '&combo_name' + combo_name + '&combo_total_price=' + combo_total_price + '&combo_thumb_image=' + combo_thumb_image + '&munbers=' + munbers + '&order_type=' + order_type,
    // })
  },

  // 搜索框
  searches: function (e) {
    wx.navigateTo({
      url: "../common/search/search"
    })
  },
  // // 门店
  // checkStore: function (e) {
  //   wx.navigateTo({
  //     url: 'store',
  //   })
  // },
  // // 产品
  // checkProduct: function (e) {
  //   wx.navigateTo({
  //     url: 'product',
  //   })
  // },
  // // 页面上拉触底事件的处理函数
  // onReachBottom: function () {
  // },

  // //用户点击右上角分享
  // onShareAppMessage: function () {
  // },
})




    // wx.scanCode({
    //   success(res){
    //     console.log('------------');
    //     console.log(res.result);
    //     // console.log(res.result.match(/"(^|&)id=([^&]*)(&|$)"/));
    //   }
    // })

     // let nowTime; 
        // for (let i = 0; i < res.data.data.rows.length;i++){
        //   let nowTime = time.formatTime(res.data.data.rows[i].article_create_time, 'Y-M-D ');
        //   res.data.data.rows[i].article_create_time = nowTime;

       // fail: function (res) {
      //   console.log("error==", res);
      // },
      // complete: function (res) {
      //   console.log("complete==", res);
      // }