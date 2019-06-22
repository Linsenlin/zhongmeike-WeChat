// 暴露url接口地址
const urlServer = {
    ApiUrl: 'https://www.zhongmeike.com/scibea/'
    // ApiUrl:'https://192.167.157.13:8080/scibea/'
}

// 全局处理wx.request请求方法
const wxRequest = (params, path) => {
    // params = params.data;
    // console.log('all=====' + JSON.stringify(params));
    let ishow = !params.isshow || false;
    ishow && wx.showToast({
        title: '加载中...', //加载中的文案
        icon: 'loading', //显示loading图标
        mask: true //显示透明蒙层，防止触摸穿透
    });
    wx.request({
        url: urlServer.ApiUrl + path,
        method: params.method || 'POST',
        data: params.data,
        header: params.contentType || {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
            params.success && params.success(res);
        },
        fail: (res) => {
            wx.showToast({
                title: '网络链接失败！'
            });
            params.fail && params.fail(res);
        },
        complete: (res) => {
            params.complete && params.complete(res);
            wx.hideToast(); //关闭toast提示层
        }
    })
}

// 请求
const bannerImgRequest = (params) => wxRequest(params, 'home/banner') //首页 banner走马灯的图片请求（1）
const propagateImg = (params) => wxRequest(params, 'home/propagate_list') //首页 宣传图片(38)
const shareWeekly = (params) => wxRequest(params, 'article/skin_care_experience') //首页 每周分享(2)
const featuredPro = (params) => wxRequest(params, 'goods/selected_products') //首页 精选产品(3)
const huFuXinDeRequest = (params) => wxRequest(params, 'article/skin_care_experience'); //首页护肤心的数据请求（2）
const selectedProductsRequest = (params) => wxRequest(params, 'goods/selected_products'); //首页精选产品的数据请求（3）
const storeListRequest = (params) => wxRequest(params, 'common/store_list') //店铺列表的数据请求（4）
// 门店搜索(没有发现关于搜索门店的页面)(5)
const wxauthRequest = (pramas) => wxRequest(pramas, 'user/sp_login'); //用户登录（6）
const updateRequest = (params) => wxRequest(params, 'user/update_user'); //修改用户信息（6）
const bindMobileRequest = (params) => wxRequest(params, 'user/phone_binding'); //绑定手机号（7）
const sendCodeRequest = (params) => wxRequest(params, 'user/sentMsg'); //发送验证码（8）
const labelListRequest = (params) => wxRequest(params, 'goods/label_list') //商品分类的数据请求（9）
const goodsSortListRequest = (params) => wxRequest(params, 'goods/goods_sort_list') // 商品排序（10)
//(11)作废
// 12.个人定制获取检测报告列表【未完成】（12）
const recommendComboRequest = (params) => wxRequest(params, 'goods/recommend_combo') //获取推荐套餐（13）
const newAddressRequest = (params) => wxRequest(params, 'common/new_address') //14.用户新增地址[pages/mine/myNewAddress.wxml]（已解决）
const updateFrequentAddressRequest = (params) => wxRequest(params, 'common/update_frequent_address') //设置/取消常用地址的请求(15)[pages/mine/save_info][pages/mine/myNewAddress]
const userInfoRequest = (params) => wxRequest(params, 'user/user_info') // 16.查询用户信息
const orderListRequest = (params) => wxRequest(params, 'order/order_list') // 查询用户订单的请求（17）
// 查询订单发货地址【不知道在哪个页面应用】（18）
const addOrderRequest = (params) => wxRequest(params, 'order/add_order') //统一下单的数据接口 （19）
const cancelOrderRequest = (params) => wxRequest(params, 'order/cancel_order') //取消订单的数据请求（20）
const returnGoodsRequest = (params) => wxRequest(params, 'order/return_goods') // 申请退货（21）[pages/mine/applyForReturn]
const receivingGoodsRequest = (params) => wxRequest(params, 'order/receiving_goods') //确认收货的数据请求（22）
const orderReturnFileUpload = (params) => wxRequest(params, 'order/order_return_fileUpload') //退货图片上传的数据请求 （23）
const orderReturnGoodsDetailRequest = (params) => wxRequest(params, 'order/return_goods_detail') //查看退货详情的数据请求（24）[pages/mine/applyForReturn] 
const returnGoodsDetailRequest = (params) => wxRequest(params, 'order/cancel_return_goods') //取消退款申请的数据请求（已完成）(25)[pages/mine/rebacklist]
const addDistributionMemberRequest = (params) => wxRequest(params, 'user/add_distribution_member') // 开通分销会员（26）
const userDistributionInfoRequest = (params) => wxRequest(params, 'user/user_distribution_info') //会员分销信息的数据请求 （28）
const withdrawCashRequest = (params) => wxRequest(params, 'user/withdraw_cash') //提现申请数据请求（29）[pages/mine/myFenXiaoRequestWithdrawal]
const shareCodeRequest = (params) => wxRequest(params, 'user/share_code') //推广二维码的数据请求（30）
const myTeamRequest = (params) => wxRequest(params, 'user/my_team') //获取我的团队列表（31）
const distributionOrderListRequest = (params) => wxRequest(params, 'order/distribution_order_list') //获取我的分销提成订单（32）
const myBountyRequest = (params) => wxRequest(params, 'user/my_bounty') //我的奖励（33）
const myMemberCenter = (params) => wxRequest(params, 'user/my_member_center') //会员中心的数据请求(34)
const hotWordListRequest = (params) => wxRequest(params, 'common/hot_word_list') //定制-最想解决的数据请求(35)
const brandListRequest = (params) => wxRequest(params, 'home/brand_list') //商品的品牌数据请求（36）
const orderDetailRequest = (params) => wxRequest(params, 'order/order_detail') //订单详情数据请求(37)
const propagateListRequest = (params) => wxRequest(params, 'home/propagate_list') //首页宣传图片（38）

// 39.商品子分类查询(因为与9产品分类有所重复，所以该接口可不引用)
const questionnaireListRequest = (params) => wxRequest(params, 'skintest/questionnaire_list') //肌肤测试题问卷列表（40）
const questionListRequest = (params) => wxRequest(params, 'skintest/question_list') //肌肤测试题目/答案列表（41）
const saveTestRequest = (params) => wxRequest(params, 'skintest/save_test') //答题保存的数据请求 （42）
const skinTestResultRequest = (params) => wxRequest(params, 'skintest/skin_test_result') //肌肤检测结果(43)
const uploadmf = urlServer.ApiUrl + 'scibea/skintest/skin_test_fileUpload'; //肌肤检测图片上传的数据请求 （46）
const returnOrderListRequest = (params) => wxRequest(params, 'order/return_order_list') //退货订单数据请求（47）
const skintestItemsRequest = (params) => wxRequest(params, 'skintest/skintest_items') //肌肤检测项的数据请求  （48）
const historyRecordDateRequest = (params) => wxRequest(params, 'skintest/history_record_date') //历史检测的数据请求 （49）
const skintestRecordRequest = (params) => wxRequest(params, 'skintest/skintest_record') //检测结果的数据请求  （50）
const goodsOrderDetailRequest = (params) => wxRequest(params, 'goods/goods_order_detail') //单品下单详情的数据请求（51）
const addressListRequest = (params) => wxRequest(params, 'common/address_list') //地址列表的数据请求（52）
const againOrderRequest = (params) => wxRequest(params, 'order/again_order') //订单列表下单(53)
const distributionConfigRequest = (params) => wxRequest(params, 'common/distribution_config') //查询分销会员价格(54)
const readArticleRequest = (params) => wxRequest(params, 'article/read_article') //55.更新文章浏览量(55)
const queryExpressRequest = (params) => wxRequest(params, 'order/query_express') //物流查询(56)
const editAddressRequest = (params) => wxRequest(params, 'common/edit_address') //修改地址信息（57）
const goodsSearchRequest = (params) => wxRequest(params, 'home/goods_search') //首页搜索关键词提示(58)


//将获取的数据暴露给全局
module.exports = {
    wxRequest: wxRequest,
    bindMobileRequest,
    huFuXinDeRequest: huFuXinDeRequest,
    storeListRequest,
    sendCodeRequest,
    updateRequest,
    selectedProductsRequest,
    bannerImgRequest,
    labelListRequest,
    brandListRequest,
    questionnaireListRequest,
    questionListRequest,
    propagateListRequest,
    recommendComboRequest,
    propagateImg,
    shareWeekly,
    featuredPro,
    myTeamRequest,
    distributionOrderListRequest,
    myBountyRequest,
    hotWordListRequest,
    skinTestResultRequest,
    orderDetailRequest,
    myMemberCenter,
    orderListRequest,
    newAddressRequest,
    updateFrequentAddressRequest,
    withdrawCashRequest,
    returnOrderListRequest,
    returnGoodsDetailRequest,
    receivingGoodsRequest,
    cancelOrderRequest,
    returnGoodsRequest,
    orderReturnGoodsDetailRequest,
    saveTestRequest,
    uploadmf,
    orderReturnFileUpload,
    historyRecordDateRequest,
    skintestItemsRequest,
    skintestRecordRequest,
    wxauthRequest,
    goodsSortListRequest,
    goodsOrderDetailRequest,
    userInfoRequest,
    addOrderRequest,
    shareCodeRequest,
    addressListRequest,
    againOrderRequest,
    userDistributionInfoRequest,
    addDistributionMemberRequest,
    readArticleRequest,
    queryExpressRequest,
    distributionConfigRequest,
    editAddressRequest,
    goodsSearchRequest
}