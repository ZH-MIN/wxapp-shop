// pages/collect/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [{
				id: 0,
				value: "商品收藏",
				isActive: true
			},
			{
				id: 1,
				value: "店铺收藏",
				isActive: false
			},
			{
				id: 2,
				value: "浏览足迹",
				isActive: false
			}
		],
		collect:[]
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
		let collect = wx.getStorageSync("collect")||[];
		that.setData({
			collect:collect
		});
	},
	
	// 切换选项卡
	tabsMenuChange(e) {
		var that = this;
		// 获取选项卡索引
		let index = e.detail.index;
		let tabs = that.data.tabs;
		// 更新选项卡的选中状态
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
		that.setData({
			tabs: tabs
		})
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
