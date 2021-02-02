// pages/cart/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cartList: [],
		allChecked: false,
		totalPrice: 0,
		totalNum: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this;
		// 获取缓存中地址
		let address = wx.getStorageSync("address") || [];
		that.setData({
			address: address
		});
		// 获取购物车信息
		let cartList = wx.getStorageSync("cart") || [];
		that.setCart(cartList);
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


	// 累加商品数量
	changeNum(e) {
		var that = this;
		let goods_id = e.currentTarget.dataset.id;
		let operation = e.currentTarget.dataset.operation;
		let cartList = that.data.cartList;
		let index = cartList.findIndex(v => v.goods_id === goods_id);
		if (cartList[index].cartNum === 1 && operation === -1) {
			wx.showModal({
				title: '提示',
				content: '是否删除商品',
				success(res) {
					if (res.confirm) {
						cartList.splice(index, 1);
						that.setCart(cartList);
					} else if (res.cancel) {

					}
				}
			});
		} else {
			cartList[index].cartNum += operation;
			that.setCart(cartList);
		}
	},

	// 商品选中
	checkChange(e) {
		var that = this;
		let goods_id = e.currentTarget.dataset.id;
		let cartList = that.data.cartList;
		let index = cartList.findIndex(v => v.goods_id === goods_id);
		cartList[index].checked = !cartList[index].checked;
		that.setCart(cartList);
	},

	// 全选与反选
	allCheckedChange() {
		var that = this;
		let cartList = that.data.cartList;
		let allChecked = that.data.allChecked;
		allChecked = !allChecked;
		cartList.forEach(v => v.checked = allChecked);
		that.setCart(cartList);
	},

	// 计算购物车商品
	setCart(cartList) {
		var that = this;
		wx.setStorageSync("cart", cartList);
		// 遍历数组 全选选中
		let allChecked = cartList.length ? cartList.every(v => v.checked) : false;
		// 购物车商品总价和总数
		let totalPrice = 0,
			totalNum = 0;
		cartList.forEach(v => {
			// 选中的商品累加
			if (v.checked) {
				totalPrice += v.cartNum * v.goods_price;
				totalNum += v.cartNum;
			}
		});
		that.setData({
			cartList: cartList,
			allChecked: allChecked,
			totalPrice: totalPrice,
			totalNum: totalNum
		});
	},

	// 结算
	goPay() {
		var that = this;
		let address = that.data.address;
		let totalNum = that.data.totalNum;
		if (totalNum === 0) {
			wx.showToast({
				title: '您还未选购商品',
				icon: 'none'
			});
			return;
		}
		if (!address.userName) {
			wx.showToast({
				title: '您还未填写收货地址',
				icon: 'none'
			});
			return;
		}
		// 跳转支付页面
		wx.navigateTo({
			url: '/pages/pay/index'
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
