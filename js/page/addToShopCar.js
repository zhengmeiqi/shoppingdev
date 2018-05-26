/********************
 * Date：2017/12/12
 * info: 产品详情页的-加入购物车
 */

function AddToShopCar( _config ){
	for(var i in _config){
		this[i] = _config[i]
	}
	this.num = 1;
	this.init();
}

AddToShopCar.prototype = {
	init:function(){
		var _self = this;

		_self.increaseBtnFn();
		_self.minusBtnFn();
		_self.gotoPayFn();
	},
	// 加号
	increaseBtnFn:function(){
		var _self = this;
		_self.increaseBtn.on('click',function(){
			_self.resultFn( ++_self.num );
		});
	},
	// 减号
	minusBtnFn:function(){
		var _self = this;
		_self.minusBtn.on('click',function(){

			if( _self.num > 1 ){
				--_self.num;
				// minusBtn按钮，可以点击
			} else {
				// minusBtn按钮，颜色变浅灰，意思是不可以点击
				// 这个地方，课后自己去实现。
			}

			_self.resultFn( _self.num );
		});
	},
	// 公共方法
	resultFn:function( _n ){
		var _self = this;

		_self.resultId.val( _n );
		
		console.log( _n )
	},
	// 跳转到购物车页面
	gotoPayFn:function(){
		var _self = this;
		_self.gotoPayBtnId.on('click',function(){
			// 先不新开页面，直接在当前页面跳转链接
			window.location.href="http://localhost:5850/shop_car.html"
		});
	}
}

new AddToShopCar({
	resultId : $('#resultId'),
	increaseBtn : $('#increaseBtn'),
	minusBtn : $('#minusBtn'),
	gotoPayBtnId : $('#gotoPayBtnId')
});