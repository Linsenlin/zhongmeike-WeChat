// pages/sort/filter.js
import api from '../common/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        label_id: '',
        range_type: '',
        sum: [],
        brandName: '',
        priceRange: '',
        isShow: "",
        isShowPrice: '',
        show: false,
        showPrices: false,
        keyword: '',
        showprice: -1,
        showBrand: -1,
        brandList: [],
        anList: [], //保存选择的品牌或者价格的数组
        price: [{
                "pri": "1-100",
                isSelected: false,
            },
            {
                "pri": "101-200",
                isSelected: false,
            },
            {
                "pri": "201-300",
                isSelected: false,
            },
            {
                "pri": "300以上",
                isSelected: false,
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var that = this;
        that.setData({
            label_id: options.label_id
        })
        api.brandListRequest({
            data: {},
            success: function(res) {
                var datas = res.data.data.rows;
                that.setData({
                    brandList: datas,
                })
                var brandList = that.data.brandList;
                for (var index in brandList) {
                    var selects = "brandList[" + index + "].select"
                    that.setData({
                        [selects]: "false",
                    })
                };

                console.log(brandList)
            },
            fail: function(res) {

            },
            complete: function(res) {

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
    // 品牌列表出现的事件
    showList: function() {
        this.setData({
            show: !this.data.show
        })
    },
    // 选中品牌
    choose: function(e) {
        var that = this;
        var clickIndex = e.currentTarget.dataset.currentid;
        that.setData({
            showBrand: clickIndex
        })
        var brand = that.data.brandList;
        var brands = brand[clickIndex].brand_name;
        console.log("选择的品牌是：" + brands)
        that.setData({
            brandName: brands
        })


        //清空价格
        // for (let i = 0; i < that.data.price.length; i++) {
        //   that.data.price[i].isSelected = false
        // };
        // that.setData({
        //   price: that.data.price,
        //   chooseP: false
        // })
        // var list = that.data.anList;
        // for (let i = 0; i <= list.length; i++) {
        //   list: list.splice(i, 1);
        // }
        // that.setData({
        //   anList: list
        // })
        // console.log(clickIndex)
        // var item = this.data.brandList[clickIndex];
        // item.select = !item.select;
        // this.setData({
        //   brandList: this.data.brandList,
        // });
        // var keywords = that.data.brandList[clickIndex].brand_name;
        // that.data.anList.push(keywords);

        // this.setData({
        //   isShow: clickIndex,
        //   keyword: keywords
        // })
    },
    // 显示选择价格范围
    choosePrice: function() {
        this.setData({
            showPrices: !this.data.showPrices
        })
    },
    // 选择价格
    choosePri: function(e) {
        var that = this;
        var showprice = e.currentTarget.dataset.currentid;
        that.setData({
            showprice: showprice
        })
        var prices = that.data.price;
        var pri = prices[showprice].pri;
        console.log("选择的价格是：" + pri)
        that.setData({
            priceRange: pri
        })

        //清空品牌
        // for (let i = 0; i < that.data.brandList.length; i++) {
        //   that.data.brandList[i].select = true
        // };
        // that.setData({
        //   brandList: that.data.brandList,
        //   chooseP: false
        // })
        // var list = that.data.anList;
        // for (let i = 0; i <= list.length; i++) {
        //   list: list.splice(i, 1);
        // }
        // that.setData({
        //   anList: list
        // })
        // var showprice = e.currentTarget.dataset.currentid;
        // var item = this.data.price[showprice];
        // that.data.anList.push(item.pri);
        // item.isSelected = !item.isSelected;
        // this.setData({
        //   price: this.data.price,
        // });

        // this.setData({
        //   isShowPrice: showprice
        // })
        // console.log("showprice=" + showprice)
    },
    /**
     * 确定的点击事件
     */
    sortProduct: function(e) {
        var that = this;
        var keyword = that.data.brandName + that.data.priceRange;
        var label_id = that.data.label_id;
        var range_type = 4;
        wx.navigateTo({
            url: 'sortProduct?range_type=' + range_type + '&label_id=' + label_id + '&keyword=' + keyword,

        })
        console.log("keyword=" + keyword)
    },
    /**
     * 清空事件
     */
    cancle: function(e) {
        var that = this;
        // 清空价格
        that.setData({
            showprice: -1,
            showBrand: -1
        })

        // var list = that.data.anList;
        // for (let i = 0; i <= list.length; i++) {
        //   list: list.splice(i, 1);
        // }
        // that.setData({
        //   anList: list
        // })
        // console.log(that.data.anList)
        //清空价格
        // for (let i = 0; i < that.data.price.length; i++) {
        //   that.data.price[i].isSelected = false
        // };
        //清空品牌
        // for (let i = 0; i < that.data.brandList.length; i++) {
        //   that.data.brandList[i].select = true
        // };
        // that.setData({
        //   price: that.data.price,
        //   brandList: that.data.brandList
        // })
    }
})