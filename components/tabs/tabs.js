// components/tabs/tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		clickTap(e){
			// 获取选项卡索引
			let index = e.currentTarget.dataset.index;
			// 向父级组件传值
			this.triggerEvent("tabsMenuChange",{index})
		}
	}
})
