// pages/goods_list/index.js
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
				value: "综合",
				isActive: true
			},
			{
				id: 1,
				value: "销量",
				isActive: false
			},
			{
				id: 2,
				value: "价格",
				isActive: false
			}
		],
		// 总页数
		totalPage:0,
		// 商品列表
		goodsList:[],
		// 底部提示条
		bottomMsg:""
	},
	// 接口参数
	queryParams: {
		query: "",
		cid: "",
		pagenum: 1,
		pagesize: 10
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		// 获取分类id
		that.queryParams.cid = options.cid;
		
		that.getGoodsList();
	},

	// 获取商品列表数据
	getGoodsList() {
		var that = this;
		request({
			url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
			data:that.queryParams
		}).then(res=>{
			// 获取总条数
			let total = res.data.message.total;
			// 计算总页数
			let totalPage = Math.ceil(total / that.queryParams.pagesize);
			// 获取商品列表
			let goodsList = res.data.message.goods;
			that.setData({
				totalPage:totalPage,
				// 拼接数组
				goodsList:[...that.data.goodsList,...goodsList]
			});
		});
		
		// 关闭下拉刷新
		wx.stopPullDownRefresh();
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
		var that = this;
		// 重置商品列表
		that.setData({
			goodsList:[]
		});
		// 重置页码
		that.queryParams.pagenum = 1;
		// 获取商品列表
		that.getGoodsList();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		var that = this;
		// 判断是否还有下一页
		if(that.queryParams.pagenum >= that.data.totalPage){
			// 没有下一页
			that.setData({
				bottomMsg:'加载完毕'
			})
		}else{
			// 页码加1
			that.queryParams.pagenum++;
			// 加载下一页
			that.getGoodsList();
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
