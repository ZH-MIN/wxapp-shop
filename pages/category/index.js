// pages/category/index.js
import {
	request
} from "../../request/index.js";


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		leftMenuList: [],
		rightContent: [],
		currentIndex: 0,
		scrollTop: 0
	},
	cateList: [],
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		// 获取本地存储
		let cates = wx.getStorageSync("cates");
		if (!cates) {
			// 不存在接口数据时请求数据
			that.getCateList();
		} else {
			if (Date.now() - cates.time > 1000 * 60 * 5) {
				// 过期时间5分钟 重新发起数据请求
				that.getCateList();
			} else {
				that.cateList = cates.data;
				let leftMenuList = that.cateList.map(item => item.cat_name);
				let rightContent = that.cateList[that.data.currentIndex].children;
				that.setData({
					leftMenuList: leftMenuList,
					rightContent: rightContent
				});
			}
		}
	},

	// 获取分类数据
	getCateList() {
		var that = this;
		request({
			url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
		}).then(res => {
			that.cateList = res.data.message;

			// 把接口数据存入本地存储中
			wx.setStorageSync("cates", {
				time: Date.now(),
				data: that.cateList
			});

			// 筛选父级分类
			let leftMenuList = that.cateList.map(item => item.cat_name);
			// 筛选子级分类
			let rightContent = that.cateList[that.data.currentIndex].children;
			that.setData({
				leftMenuList: leftMenuList,
				rightContent: rightContent
			})
		})
	},

	// 左侧菜单点击事件
	clickCateMenu(e) {
		var that = this;
		// 菜单索引
		let menuIndex = e.currentTarget.dataset.index;
		// 当前菜单的商品内容
		let rightContent = that.cateList[menuIndex].children;
		that.setData({
			currentIndex: menuIndex,
			rightContent: rightContent,
			// 点击菜单后右侧内容置顶距离
			scrollTop: 0
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

	}
})
