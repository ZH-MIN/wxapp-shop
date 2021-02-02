// pages/search/index.js
import {
	request
} from "../../request/index.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goods: [],
		isFocus: false,
		inputValue:''
	},
	timeId: -1,

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	// 输入框
	inputChange(e) {
		var that = this;
		// 获取输入框的值
		let value = e.detail.value;
		if (!value.trim()) {
			// 隐藏取消按钮
			this.setData({
				isFocus: false,
				goods: []
			});
			return;
		}
		// 显示取消按钮
		this.setData({
			isFocus: true
		});
		// 防抖(定时器) 防止重复请求
		clearTimeout(that.timeId);
		that.timeId = setTimeout(() => {
			// 发送请求
			that.qsearch(value);
		}, 1000);

	},

	// 发送请求
	qsearch(query) {
		var that = this;
		request({
			url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
			data: {
				query
			}
		}).then(res => {
			let goods = res.data.message;
			that.setData({
				goods: goods
			});
		});
	},
	
	cancel(){
		var that = this;
		that.setData({
			inputValue:'',
			isFocus:false,
			goods:[]
		});
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

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
