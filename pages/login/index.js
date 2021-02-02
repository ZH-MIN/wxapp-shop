// pages/login/index.js
Page({
	
	// 获取用户信息
	getuserinfo(e) {
		let userInfo = e.detail.userInfo;
		let encryptedData = e.detail.encryptedData;
		let iv = e.detail.iv;
		let rawData = e.detail.rawData;
		let signature = e.detail.signature;
		let code;
		// token写死
		let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
		// 获取用户登录小程序的code
		wx.login({
			timeout:10000,
			success(res){
				code = res.code;
				console.log(code)
			}
		});
		
		let tokenParams = {encryptedData,iv,rawData,signature,code};
		
		// 发送请求,获取用户token
		// request({
		// 	url:'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
		// 	method:'post',
		// 	data:tokenParams
		// }).then(res=>{
		// 	token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
		// 	console.log(token);
		// });
		
		// 将用户信息存入缓存中
		wx.setStorageSync('userInfo',userInfo);
		wx.setStorageSync("token",token);
		// 返回上一页
		wx.navigateBack({
			delta:1
		});
		
	},

})