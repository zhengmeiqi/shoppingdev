/********************
 * Date：2017/11/29
 * info: 全站的配置文件
 */

// 把所有的接口，都放在config文件里，便于统一安排、管理
var Site = 'http://www.webfeel.org/';

var APILIST = {
		// 本地json假数据
		imgJson : '../js/data/json.js',

		// 第一个接口
		oneapi : Site + 'zuoye/php/oneapi.php',

		// 首页左边导航
		subNavapi : 'http://datainfo.duapp.com/shopdata/getclass.php',

		// 首页产品列表、商品详情、图片信息
		productBlock:'http://datainfo.duapp.com/shopdata/getGoods.php',

		//获取用户所在地址
		address:'http://api.map.baidu.com/location/ip?ak=bFNYmleHunu49WxpIlCN8QxTpzs93c8V&coor=bd09ll',
		// 省市区，三级菜单的json--产品详情页
		citylist: '../js/data/city.js',

		// 购物车： 获取所有商品的列表
		cartUlLi : Site + 'zuoye/php/cartUlLi.php',

		// 计算某商品的总价： 单价 * 数量
		// 返回增加商品的数量：
		cart : Site + 'zuoye/php/cart.php',

		// 减少商品
		cart_reduce : Site + 'zuoye/php/cart_reduce.php',

		// 输入商品数量
		enterGoods : Site + 'zuoye/php/enterGoods.php',

		// 单个商品的复选框的接口，计算所有的商品的总数和总价
		goodsCheck : Site + 'zuoye/php/goodsCheck.php'
		
	}

// ======================

// 首页头部搜索框的默认文字
var HeaderSearchValConfig = "请输入内容 abc 123";

// switch display:block / none
var SwitchDisplay = {
	state_a : 'block',
	state_b : 'none'
}

// index page dom Id config
var IndexIdConfig = {
	id_1 : 'headerSearchId',
	id_2 : 'navLiId',
	id_3 : 'maskId',
	id_4 : 'ulId'
}

// 首页轮播图的临时数据，js对象的格式，作废
var sliderImgData = {
	imglist : [
		'image/temp/temp1.jpg',
		'image/temp/temp2.jpg',
		'image/temp/temp2.jpg',
		'image/temp/temp4.jpg'
	]
}