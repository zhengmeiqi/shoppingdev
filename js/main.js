/********************
 * Date：2017/11/29
 * info: 首页的入口文件
 */

;
$(function(){

	// 首页的左边产品导航
	new ProductNav({
		ulId : $('#ulId')
	});

	// 首页的轮播图
	new IndexSliderFn({
		imgListId : $('#imgListId'),
		leftBtnId : $('#leftBtnId'),
		rightBtnId : $('#rightBtnId'),
		pointerUlId : $('#pointerUlId'),
		pointerId : $('#pointerId'),
		pointerBgId : $('#pointerBgId')
	});

	// 首页产品列表：享生活
	new ProductListFn();

});