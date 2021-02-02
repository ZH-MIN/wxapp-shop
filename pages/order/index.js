// pages/order/index.js
import {
	request
} from "../../request/index.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [{
				id: 0,
				value: "全部",
				isActive: true
			},
			{
				id: 1,
				value: "待付款",
				isActive: false
			},
			{
				id: 2,
				value: "待发货",
				isActive: false
			},
			{
				id: 3,
				value: "退款/退货",
				isActive: false
			}
		],
		orderList:[]
	},
	
	// 切换选项卡
	changeTitleIndex(index){
		var that = this;
		let tabs = that.data.tabs;
		// 更新选项卡的选中状态
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
		that.setData({
			tabs: tabs
		});
	},

	// 切换选项改变页面
	tabsMenuChange(e) {
		var that = this;
		// 获取选项卡索引
		let index = e.detail.index;
		that.changeTitleIndex(index);
		that.getOrderList(index+1);
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
		let currentPage = pages[pages.length-1];
		// 获取页面栈中当前页面的options参数
		let type = currentPage.options.type;
		// 激活选中的标题
		that.changeTitleIndex(type-1);
		that.getOrderList(type);
	},
	
	// 获取订单列表数据
	getOrderList(type){
		var that = this;
		let token = wx.getStorageSync("token");
		if(!token){
			wx.navigateTo({
				url:"/pages/login/index"
			});
			return;
		}
		// 请求头
		let header = {Authorization: token};
		// 发起请求
		request({
			url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all",
			data:{type},
			header:header
		}).then(res=>{
			let orderList = res.data.message.orders;
			that.setData({
				orderList:orderList.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
			});
		});
	},

	

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

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
