// pages/goods_detail/index.js
import {
	request
} from "../../request/index.js";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 商品详情数据
		goodsDetail: {},
		isCollect: false
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
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		let options = currentPage.options;
		let goods_id = options.goods_id;
		that.getGoodsDetail(goods_id);
	},

	// 获取商品详情数据
	getGoodsDetail(goods_id) {
		var that = this;
		request({
			url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
			data: {
				goods_id: goods_id
			}
		}).then(res => {
			let goodsDetail = res.data.message;
			// 获取缓存中商品收藏数组
			let collect = wx.getStorageSync("collect") || [];
			// 判断商品是否被收藏
			let isCollect = collect.some(v => v.goods_id === goodsDetail.goods_id);
			that.setData({
				goodsDetail: goodsDetail,
				isCollect: isCollect
			});
		});

	},

	// 放大预览图
	previewImage(e) {
		var that = this;
		let urls = that.data.goodsDetail.pics.map(v => v.pics_mid);
		let currentIndex = e.currentTarget.dataset.index;
		console.log(currentIndex)
		// 全屏预览图
		wx.previewImage({
			current: urls[currentIndex],
			urls: urls
		});
	},

	// 添加购物车
	addCart() {
		var that = this;
		// 获取缓存中的购物车数据
		let cart = wx.getStorageSync("cart") || [];
		// 判断购物车中是否存在该商品
		let index = cart.findIndex(v => v.goods_id === that.data.goodsDetail.goods_id);
		if (index === -1) {
			// 购物车不存在该商品时,将该商品添加至购物车
			that.data.goodsDetail.cartNum = 1;
			that.data.goodsDetail.checked = true;
			cart.push(that.data.goodsDetail);
		} else {
			// 购物车存在该商品，cartNum++
			cart[index].cartNum++;
			wx.setStorageSync("cart", cart);
		}
		// 加入缓存
		wx.setStorageSync("cart", cart);
		// 弹窗提示
		wx.showToast({
			title: '加入成功',
			icon: 'success',
			mask: true
		});
	},

	// 商品收藏
	collectChange() {
		var that = this;
		let isCollect = false;
		let collect = wx.getStorageSync("collect") || [];
		let index = collect.findIndex(v => v.goods_id === that.data.goodsDetail.goods_id);
		if (index !== -1) {
			collect.splice(index, 1);
			let isCollect = false;
			wx.showToast({
				title: '取消收藏',
				icon: 'none',
				mask: true
			});
		} else {
			collect.push(that.data.goodsDetail);
			isCollect = true;
			wx.showToast({
				title: '收藏成功',
				icon: 'success',
				mask: true
			});
		}
		// 存入缓存
		wx.setStorageSync("collect", collect);
		// 修改isCollect属性
		that.setData({
			isCollect: isCollect
		});
	},
	
	// 立即购买
	gobuy(){
		wx.showToast({
			title:"暂不支持购买",
			icon:"none",
			mask:true
		});
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
