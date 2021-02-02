// 异步请求次数
let ajaxNum = 0;

export const request = (params) => {
	ajaxNum++;
	// 打开加载框
	wx.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				ajaxNum--;
				if(ajaxNum === 0){
					// 关闭加载框
					wx.hideLoading();
				}
			}
		});
	})
}
