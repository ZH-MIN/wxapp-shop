// pages/user/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		// 被收藏的商品数量
		collectNum: 0
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
		let userInfo = wx.getStorageSync("userInfo") || [];
		let collect = wx.getStorageSync("collect") || [];
		let collectNum = collect.length;
		that.setData({
			userInfo: userInfo,
			collectNum: collectNum
		});
	},

	outLogin() {
		var that = this;
		wx.showModal({
			title:"提示",
			content:"是否确认退出登录",
			success(res){
				if(res.confirm){
					wx.removeStorage({
						key: "userInfo"
					});
					wx.removeStorage({
						key: "token"
					});
					that.setData({
						userInfo: {},
						collectNum: 0
					});
				}else if(res.cancel){
					
				}
			}
		})
	},
	
	// 获取收货地址
	getAddress() {
		// 调用api获取用户地址
		wx.chooseAddress({
			success(res) {
				let address = res;
				// 将用户地址存入缓存
				wx.setStorageSync("address", address);
			}
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
