import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据函数
    this.getSwiperList(), this.getNavList(),this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList() {
    var that = this;
    // promise封装请求 解决回调地狱
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(res => {
      that.setData({
        swiperList: res.data.message
      })
    })
    
    // 普通请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:function(res){
    //     // console.log(res);
    //     that.setData({
    //       swiperList: res.data.message
    //     })
    //   }
    // })
  },

  // 获取导航数据
  getNavList() {
    var that = this;
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then(res => {
      that.setData({
        navList: res.data.message
      })
    })
  },

  // 获取楼层数据
  getFloorList() {
    var that = this;
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then(res => {
      that.setData({
        floorList: res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})