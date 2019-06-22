// pages/detection/takePhoto.js
import api from '../common/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: ['../../images/tp.png', '../../images/tp.png', '../../images/tp.png', '../../images/tp.png'],
    name: ['正脸', '左脸', '右脸', '局部'],
    currentIndex: null,
    status: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '拍照检测',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 拍照
   */
  takePhoto: function (e) {
    var click = e.currentTarget.dataset.current;
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.data.photo.splice(click, 1, tempFilePaths[0]);
        that.setData({
          currentIndex: click,
          photo: that.data.photo,
          status: false
        })
      },
    })
  },
  /**
   * 上传检测照片
   */
  uploadPhoto: function (e) {
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
          url: 'https://www.zhongmeike.com/scibea/skintest/skin_test_fileUpload',
          filePath: file,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            user_id: app.globalData.userInfo.user_id
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


  }
})