import api from '../common/api.js'
var address = require('city.js')
const app = getApp();
var animation
Page({

  /**
   * 页面的初始数据
   *  provinces:所有省份
   * citys选择省对应的所有市,
   * areas选择市对应的所有区
   * provinces：当前被选中的省
   * city当前被选中的市
   * areas当前被选中的区
   */
  data: {
    green: false,
    name: '请填写您的姓名',
    tel: '请填写您的手机号',
    address: '地区信息',
    detail_address: '请填写您的详细地址',
    zip_code: '请填写您的邮政编码',
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    address_statu: 0,
    checkeds: false, //swith是否选中的事件
    newOrEdit: '', //判断页面时从哪个入口进入
    address_id:'',
    tiTle:''
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that= this;
   

    that.setData({
      newOrEdit: options.newOrEdit,
      tiTle: options.tiTle
    })
    wx.setNavigationBarTitle({
      title: that.data.tiTle,
    })

    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    

    /**初始化数据 */
    that.setData({
      address_id: options.address_id,
      name: options.address_contact,
      tel: options.address_contact_mobile,
      address: options.address_city,
      detail_address: options.address_detail,
      zip_code: options.address_code,


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

  // 点击所在地区弹出选择框
  selectDistrict: function(e) {
    var that = this
    console.log('111111111')
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function(isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function(e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function(e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var addres = that.data.provinces[value[0]].name + '' + that.data.citys[value[1]].name + '' + that.data.areas[value[2]].name
    that.setData({
      addres: that.data.provinces[value[0]].name + '' + that.data.citys[value[1]].name + '' + that.data.areas[value[2]].name,
      address: that.data.provinces[value[0]].name + '' + that.data.citys[value[1]].name + '' + that.data.areas[value[2]].name
    })
  },
  hideCitySelected: function(e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function(e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum],
       
      })
    }
    console.log(this.data)
  },

  /**
   * 
   * 
   *  表单数据提交*/

  formSubmit: function(e) {
    var that = this;
    var warn = '';
    var flag = true;
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请填写您的手机号！";
    }
    // else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel)))
    else if (!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(e.detail.value.tel))) {

      warn = "手机号格式不正确";
    } else if (e.detail.value.address == "") {
      warn = "请选择您所在的省份！";
    } else if (e.detail.value.detail_address == "") {
      warn = "请填写您的详细地址!";
    }
    // else if (e.detail.value.zip_code == "") {
    //   warn = "请填写您6位数字的邮编地址！";
    // }
    else {
      flag = false;
      var that = this;
      wx.navigateBack({
        url: '../mine/save_info',

      })
      console.log('form 表单传递的信息:', e.detail.value);
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
    console.log("=======detail=====");
    console.log(e.detail);
    if (that.data.newOrEdit==0){
    var address = {
      user_id: app.globalData.userInfo.user_id,
      address_contact: e.detail.value.name,
      address_contact_mobile: e.detail.value.tel,
      address_city: e.detail.value.address,
      address_detail: e.detail.value.detail_address,
      address_code: e.detail.value.zip_code,
      address_status: this.data.address_statu,
     
    };
    if ((/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(e.detail.value.tel))) {
      api.newAddressRequest({
        data: address,
        method: 'POST',
        contentType: 'application/json',
        success: function(res) {
          console.log("============================")
          console.log("数据传递成功")
          console.log(res)

        },
        fail: function(res) {
          console.log("error==" + res);
        },
        complete: function(res) {}
      })

    } else  {
      return

    }
    }
/**修改地址 */
    if (that.data.newOrEdit==1){
    var datalist = {
      user_id: app.globalData.userInfo.user_id,
      address_contact: e.detail.value.name,
      address_contact_mobile: e.detail.value.tel,
      address_city: e.detail.value.address,
      address_detail: e.detail.value.detail_address,
      address_code: e.detail.value.zip_code,
      address_status: this.data.address_statu,
      address_id: that.data.address_id
    };
    if ((/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(e.detail.value.tel))){
      if (that.data.address_id!=''){
        api.editAddressRequest({
          data:datalist,
          method: 'POST',
          contentType: 'application/json',
          success:function(res){
            console.log("修改地址成功")
            console.log(res);
            wx.showModal({
              title: '提示',
              content: '修改地址成功！'
            })
            // wx.navigateBack({
            //   url: '../mine/save_info',

            // })
          },
          fail:function(res){
            console.log("fail")
          },
          complete:function(res){
            console.log("OK")
          }

        })
      }
    }
    }
  },
  // 按钮变色
  choose: function(e) {
    var that = this;
    if (e.detail.value.name != "" || e.detail.value.tel != "" || e.detail.value.address != "" || e.detail.value.detail_address != "" || e.detail.value.zip_code != "") {

      that.setData({
        green: true
      })
    }
  },
  // 设置 / 取消常用地址
  save_info_to: function(e) {
    var that = this;
    that.setData({
      checkeds: !that.data.checkeds
    })
    if (that.data.checkeds) {
      that.setData({
        address_statu: 1
      })
      console.log("address_statu=" + that.data.address_statu)
      console.log("您将该新地址设置为默认地址了。")
    } else {
      that.setData({
        address_statu: 0
      })
      console.log("address_statu=" + that.data.address_statu)
      console.log("没有默认地址。")
    }
  }
})