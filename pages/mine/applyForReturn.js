// pages/mine/applyForReturn.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //退货详情的数据
    freight: '',
    goods_count: '',
    order_img_url: '',
    order_label: '',
    order_title: '',
    order_price: '',
    photo: ['../../images/photo.png'],
    order_ids: '',
    order_status: '',

    inputValue: '',
    order_desc: '',
    show: false,
    show2: false,
    currentIndex: 0,
    currentIndex2: 0,
    content: "请选择 >",
    content2: "请选择 >",
    list: ["我不想要了", "商品描述的颜色与实物不符", "商品描述的颜色与实物不符", "商品描述的颜色与实物不符"],
    list2: ["未收到", "已收到"],
    orderList: [],
    pictureNum: 0,
    array:[],






    imageSrc: ['../../images/photo.png'], // 初始显示预设图片
    imageNum: 0,
    imageUploadFlag: true,
    imageErr: '图片提交失败',
    total: ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /**
     * 查看退货详情的数据
     */
    var that = this;
    that.setData({
      order_ids: options.order_ids,
      freight: options.freight,
      goods_count: options.goods_count,
      order_img_url: options.order_img_url,
      order_label: options.order_label,
      order_title: options.order_title,
      order_price: options.order_price,
      order_status: options.order_status,
    })

    that.data.freight = parseInt(that.data.freight);

    that.data.order_price = parseInt(that.data.order_price);

    var total = that.data.freight + that.data.order_price;
    that.setData({
      total: total
    })
    wx.setNavigationBarTitle({
      title: '申请退货',
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
   * 选择退货原因
   */
  click: function(e) {
    var clickIndex = e.currentTarget.dataset.currentid;

    this.setData({
      currentIndex: clickIndex
    })

  },
  /**
   * 关闭退货原因的选择层
   */
  close: function(e) {
    var that = this
    that.setData({
      show: false
    });
    var datalist = this.data.list;

    var clickIndex = this.data.currentIndex;

    var datacon = datalist[clickIndex];

    that.setData({
      content: datalist[clickIndex],

    })

  },

  /**
   * 打开退货原因的选择层
   */
  open: function(e) {
    this.setData({
      show: true
    })
  },
  /**
   * 打开货物状态的选择层
   */
  open2: function(e) {
    this.setData({
      show2: true
    });
  },
  /**
   *选择货物状态
   */
  click2: function(e) {
    var clickIndex = e.currentTarget.dataset.currentid;
    this.setData({
      currentIndex2: clickIndex
    })

  },
  /**
   * 关闭选择货物状态的选择层
   */
  close2: function(e) {
    var that = this
    that.setData({
      show2: false
    });
    var datalist = this.data.list2;

    var clickIndex = this.data.currentIndex2;

    var datacon = datalist[clickIndex];

    that.setData({
      content2: datalist[clickIndex],

    })

  },
  /**
   * 退款说明事件
   */
  reason: function(e) {
    var reason = e.detail.value;
    console.log("reason=" + reason)
    this.setData({
      inputValue: reason
    })
    console.log("inputValue=" + this.data.inputValue)
  },
  /**
   * 提交按钮事件
   */
  returnGoods: function(e) {
    var that = this;

    var order_reason = this.data.content;
    var order_desc = this.data.inputValue;
    console.log("order_desc=" + order_desc)
    var datasend = {

      user_id: app.globalData.userInfo.user_id,
      order_id: that.data.order_ids,
      order_status: this.data.order_status,
      order_reason: this.data.content,
      order_desc: this.data.inputValue,
    }

    api.returnGoodsRequest({
      data: datasend,
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        console.log(res)
        if (res.data.message == "成功") {
          console.log("申请退货成功！")
          console.log(res)
          wx.showModal({
            title: '成功',
            content: '您已经申请退货成功了。',
            success(res) {





              api.orderListRequest({
                data: {
                  user_id: app.globalData.userInfo.user_id,
                },
                success: function(res) {
                  if (res.data.message = "成功") {
                    var totalCount = res.data.data.totalCount;
                    var pageCount = res.data.data.pageCount;
                    if (totalCount == 0) {
                      return
                    } else {
                      for (let i = 1; i <= pageCount; i++) {
                        api.orderListRequest({
                          data: {
                            user_id: app.globalData.userInfo.user_id,
                            pageNo: i
                          },
                          success: function(res) {
                            that.setData({
                              orderList: that.data.orderList.concat(res.data.data.rows)
                            })
                            app.globalData.isCancel = that.data.orderList;
                          },
                          fail: function(res) {
                            console.log("数据接收失败！")
                          }
                        })
                      }
                    }
                  }
                  console.log("数据接收完毕。")
                },
                fail: function(res) {
                  console.log("fail")
                },
                complete: function(res) {
                  console.log("complete")
                }
              })


              var currentIndex = 4;
              if (res.confirm) {
                wx.navigateBack({
                  url: 'order?currentIndex=' + currentIndex,
                })
              }
            }
          })
        } else if (res.data.message == "此订单已申请退货") {
          wx.showModal({
            title: '失败',
            content: res.data.message,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  url: 'order'
                })
              }
            }
          })
        }
      },
      fail: function(res) {
        console.log("sorry!申请退货失败！")
      },
      complete: function(res) {
        console.log("申请退货事件完成！")
      }
    })

    /**上传图片到服务器部分 */
    console.log("开始上传图片了")
    var count = 0;
    var finish = 0;

    for (var index in this.data.photo) {
      var source = this.data.photo[index];
      console.log(source);
      console.log(source.indexOf('wxfile'));
      // continue;
      if (this.data.photo[index].indexOf('wxfile') >= 0) {
        var file = this.data.photo[index];
        count = count + 1;
        wx.uploadFile({
          url: 'https://www.zhongmeike.com/scibea/order/order_return_fileUpload',
          filePath: file,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            user_id: app.globalData.userInfo.user_id,
            order_id: that.data.order_ids
          },
          success: res => {

            console.log(res.data);
            var result = JSON.parse(res.data);
            finish = finish + 1;
            if (finish == count) {
              console.log("图片已经上传成功了。")
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
            }
          },
          fail: res => {
            console.log("抱歉，上传失败，信息如下：")
            console.log(res)

          }
        })
      }
    }

    

  },
  /**
   * 选择图片上传的事件
   */
  choosePhoto: function(e) {

    var that = this;
    that.setData({
      pictureNum: that.data.pictureNum + 1
    })
    if (that.data.photo.length <= 3) {
      // 图片选择
      wx.chooseImage({
        count: 1,
        // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          console.log("这是图片选择的信息")
          console.log(res)
          const tempFilePaths = res.tempFilePaths;
          // var photos='';
          that.setData({
            photo: that.data.photo.concat(res.tempFilePaths),
            // imageNum: res.tempFilePaths.length
          })
          console.log("imageSrc=" + that.data.photo)
          console.log("图片选择成功！")
        },
        fail: function(res) {
          app.showErr('提示', '上传失败，请重新上传图片');
        }
      })
      if (that.data.photo.length==3){
        that.data.photo.splice(0, 1);
      }
      console.log("that.data.photo.length=" + that.data.photo.length)
     
    }
   
  },


})