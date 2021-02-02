// pages/cart/index.js
import {
	request
} from "../../request/index.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cartList: [],
		totalPrice: 0,
		totalNum: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this;
		// 获取缓存中地址
		let address = wx.getStorageSync("address") || [];
		// 获取购物车信息
		let cartList = wx.getStorageSync("cart") || [];
		// 过滤购物车
		let checkedCart = cartList.filter(v => v.checked);

		// 购物车商品总价和总数
		let totalPrice = 0,
			totalNum = 0;
		checkedCart.forEach(v => {
			// 选中的商品累加
			if (v.checked) {
				totalPrice += v.cartNum * v.goods_price;
				totalNum += v.cartNum;
			}
		});
		that.setData({
			address: address,
			cartList: checkedCart,
			totalPrice: totalPrice,
			totalNum: totalNum
		});
	},

	// 订单支付
	orderPay() {
		var that = this;
		wx.showToast({
			title: '暂不支持购买',
			icon:"none"
		});

		// let token = wx.getStorageSync("token");
		// if (!token) {
		// 	// 用户授权获取token
		// 	wx.navigateTo({
		// 		url: '/pages/login/index'
		// 	});
		// 	return;
		// }
		// // 请求头
		// let header = {
		// 	Authorization: token
		// };
		// // 请求体
		// let order_price = that.data.totalPrice;
		// let consignee_addr = that.data.address.provinceName + that.data.address.cityName + that.data.address.countyName +
		// 	that.data.address.detailInfo;
		// let cartList = that.data.cartList;

		// let goods = [];
		// cartList.forEach(v => goods.push({
		// 	goods_id: v.goods_id,
		// 	goods_number: v.cartNum,
		// 	goods_price: v.goods_price
		// }));

		// let orderParams = {
		// 	order_price,
		// 	consignee_addr,
		// 	goods
		// };
		// // 发送请求,创建订单
		// request({
		// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
		// 	method: 'post',
		// 	data: orderParams,
		// 	header
		// }).then(res => {
		// 	let order_number = res.data.message.order_number;
		// 	// 发起预支付
		// 	request({
		// 		url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',
		// 		method: 'post',
		// 		data: {
		// 			order_number
		// 		},
		// 		header
		// 	}).then(res => {
		// 		let pay = res.data.message.pay;
		// 		// 调用微信支付接口
		// 		wx.requestPayment({
		// 			timeStamp: pay.timeStamp,
		// 			nonceStr: pay.nonceStr,
		// 			package: pay.package,
		// 			signType: pay.signType,
		// 			paySign: pay.paySign,
		// 			success(res) {
		// 				// 支付成功后删除存储中购物车已购买商品
		// 				let cart = wx.getStorageSync("cart");
		// 				let newCart = cart.filter(v => !v.checked);
		// 				wx.setStorageSync("cart", newCart);
		// 				wx.showToast({
		// 					title: '支付成功',
		// 					icon: 'success',
		// 					success() {
		//						setTimeout(function() {
		// 							wx.hideToast();
		// 							wx.redirectTo({
		// 								url: "/pages/order/index?type=1"
		// 							});
		// 						}, 2000)
		//					 }
		// 				});
		// 			},
		// 			fail(res) {
		// 				wx.showToast({
		// 					title: '支付失败',
		// 					icon: 'none'
		// 				});
		// 				console.log(res);
		// 			}
		// 		});
		// 	});
		// });
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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

	}
})
