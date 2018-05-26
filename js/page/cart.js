/********************
 * Date：2017/12/15
 * info: 购物车
 */

// 购物车-模块的构造器
function ShoppingCarObj( _config ){
	for(var i in _config){
		this[i] = _config[i]
	}
	this.init();
}

ShoppingCarObj.prototype = {
	init:function(){
		var _self = this;
		_self.getDate()
	},
	// 获取数据
	getDate:function(){
		var _self = this;

		JsonpAjaxFn( APILIST.cartUlLi, function(d){
			// console.log(d);
			if( d.error.code === 0 ){
				// 创建购物车商品列表的dom
				_self.cartMainId.html( cartTplFn(d.cartList) );

				_self.allGoodsTopId.html( d.total.num );
				_self.selectGoodsNumId.html( d.total.num );
				_self.totalMoneyId.html( d.total.totalMoney );

				// 增加商品数量
				_self.addGoodsEvent();

				// 减少商品数量
				_self.minusGoodsEvent();

				// 商品数量输入框
				_self.enterGoodsEvent();

				// checkbox按钮的点击事件
				_self.checkBoxEvent();

				// 全选按钮的事件
				_self.allCheckEvent();

				// 删除按钮事件
				_self.delBtnEvent();

			} else {
				// 打印错误信息，终止当前js程序。
				console.log( d.error.msg );
				return;
			}

		});
	},
	// 获取某项商品的信息：单价、数量，公共方法
	getGoodsInfo:function( _this ){
		var _self = this;

		// 获取当前商品，先向上一直找到本条商品的最外层，
		// 然后再向下查找保存着商品数量、单价信息的checkbox
		var _shopItem = _this.parents('.shopItem');

		// 获取此商品数量
		var _goodsNum = _shopItem.find('.checkData').attr('data-num');

		// 获取商品单价
		var _unit = _shopItem.find('.checkData').attr('data-unit');

		var _goodsInfo 		= {};
		_goodsInfo['num']  	= _goodsNum;
		_goodsInfo['unit'] 	= _unit;

		return _goodsInfo;

	},
	// 增加商品数量，事件
	addGoodsEvent:function(){
		var _self = this;
		// 找到所有的加号按钮
		var _addGoodsBtn = _self.cartMainId.find('input.addGoodsBtn');
		// console.log( _addGoodsBtn )
		_addGoodsBtn.on('click',function(){
			var _this = $(this);
			
			// 操作商品增减的公共Fn
			_self.computeGoods( APILIST.cart, _this );
		});
	},
	// 减少商品数量，事件
	minusGoodsEvent:function(){
		var _self = this;

		// 找到所有的减号按钮
		var _minusGoodsBtn = _self.cartMainId.find('input.minusGoodsBtn');

		_minusGoodsBtn.on('click',function(){
			var _this = $(this);
			
			// 操作商品增减的公共Fn
			_self.computeGoods( APILIST.cart_reduce, _this );
		});

	},
	// 操作商品增减的公共Fn
	computeGoods:function( _interface, _this ){
		var _self = this;

		// 获取某项商品的信息：单价、数量
		var _obj = _self.getGoodsInfo( _this );
		// console.log(_obj)

		// 你所操作的这个商品的信息，单价，数量
		// console.log( _obj );
		// 向后端接口提交的数据的格式
		var _tem = '[{"num":'+ _obj.num +',"price":'+ _obj.unit +'}]';

		// 更新-单项商品的数量、小计
		// _this，是你点击的加减号
		_self.updateSingleGoods( _interface, _tem, _this );
	},
	// 商品数量输入框，blur事件
	enterGoodsEvent:function(){
		var _self = this;
		var _inputGoodsNum = _self.cartMainId.find('.inputGoodsNum');
		
		_inputGoodsNum.on('blur',function(){
			var _this = $(this);

			//输入的，每个商品的数量
			var _num = _this.val(); 

			// 获取当前商品的最外层，
			var _shopItem = _this.parents('.shopItem');

			// 获取商品单价
			var _unit = _shopItem.find('.checkData').attr('data-unit');

			// blur时，商品的数量、单价
			var _tem = '[{"num":'+ _num +',"price":'+ _unit +'}]';

			// _this，是你当前blur的那个input
			_self.updateSingleGoods( APILIST.enterGoods, _tem, _this );

		});
	},
	// 更新-单项商品的数量、小计，公共方法
	// _this，是你当前blur的那个input
	// 加减号、blur方法，都调用这个方法
	updateSingleGoods:function( _interface, _tem, _this ){
		var _self = this;

		cartAjaxFn( _interface, _tem, function(d){
			// console.log(d);

			// 获取当前商品的最外层，
			var _shopItem = _this.parents('.shopItem');

			// 更新此条商品的checkbox的商品数量
			_shopItem.find('.checkData').attr('data-num', d.num);

			// 更新商品输入框的数字
			_shopItem.find('.enterNum_b').val( d.num );

			// 更新此项商品的小计
			_shopItem.find('.w_7').html( '￥' + d.subtotal );

			// 计算-“所有被选中check的商品的数量、总价”
			_self.allGoodsMoney();
		});
	},
	// 统计-“所有商品中，哪些商品的checkbox处于选中状态”
	// 返回一个 obj对象
	isCheckGoodsInfo:function(){
		var _self = this;
		var tempArr = [];

		// 获取所有的checkbox
		var _chk = _self.cartMainId.find('.checkBtn');

		// 更新全选按钮的状态，这种写法，也叫钩子函数；
		// 这在一定程度上，也叫“观察者模式”
		_self.updataAllCheckState( _chk );

		for(var i =0; i<_chk.length; i++){
			if( _chk.eq(i).is(':checked') ){
				var temp = {};
				temp['price']	= _chk.eq(i).attr('data-unit');
				temp['num']		= _chk.eq(i).attr('data-num');
				tempArr.push( temp );
			}
		}
		
		// 所有的商品，都未选中checkbox时
		if( tempArr.length === 0 ){
			var temp = {};
			temp['price']	= 0
			temp['num']		= 0
			tempArr.push( temp );
		}
		return tempArr;
	},
	// checkbox按钮的点击事件
	checkBoxEvent:function(){
		var _self = this;
		var _checkBtn = _self.cartMainId.find('.checkBtn');

		_checkBtn.on('click',function(){
			_self.allGoodsMoney();
		});
	},
	// 计算-“所有被选中check的商品的数量、总价”，公共方法
	allGoodsMoney:function(){
		var _self = this;

		// 哪些商品的checkbox被选中
		var _data = _self.isCheckGoodsInfo();
		
		// 所有的商品的总数和总价
		goodsCheckFnJsonp( APILIST.goodsCheck, JSON.stringify(_data) , function(d){
			// console.log(d)
			_self.selectGoodsNumId.html( d.num );
			_self.totalMoneyId.html( d.total );
		});
	},
	// 更新全选按钮的状态
	updataAllCheckState:function( _chk ){
		var _self = this;
		var _allCheckBtn = $('input.allCheckBtn');

		if( _chk.length <= 0 ){
			// 购物车中已经没有商品，全选按钮取消选中
			_allCheckBtn.removeAttr('checked');

			// 购物车为空
			_self.cartEmpty();
		} else {
			// 循环判断每一个checkbox
			for(var i =0; i<_chk.length; i++){
				// 如果有任何一个checkbox未选中
				if( _chk.eq(i).is(':checked') === false ){
					// 移除二个全选按钮的选中属性
					_allCheckBtn.removeAttr('checked');
					// 跳出当前for循环，就是不用再循环了。
					break;
				}

				// 如果所有的checkbox都选中
				_allCheckBtn.attr('checked', true);
			}
		}

	},
	// 全选按钮的事件
	allCheckEvent:function(){
		var _self = this;

		_self.allCheckBtn.on('click',function(){
			// 当前点击的全选按钮的状态，是否选中？
			var _is = $(this).is(':checked');
			var _checkBtn = _self.cartMainId.find('.checkBtn');

			if( _is === false ){
				// 全选按钮，未选中
				_self.allCheckBtn.removeAttr('checked');
				for(var i=0; i<_checkBtn.length; i++){
					_checkBtn.eq(i).removeAttr('checked');
				}
			} else {
				// 全选按钮，已选中
				_self.allCheckBtn.attr('checked', true);
				for(var i=0; i<_checkBtn.length; i++){
					_checkBtn.eq(i).attr('checked', true);
				}
			}
			// 当操作完全选按钮之后，统计所有商品的数量和总价
			_self.allGoodsMoney();
		});
	},
	// 删除商品按钮事件
	delBtnEvent:function(){
		var _self = this;
		var _delBtn = _self.cartMainId.find('li.delBtn');

		_delBtn.on('click',function(){
			$(this).parents('div.shopItem').remove();

			// 当操作完全选按钮之后，统计所有商品的数量和总价
			_self.allGoodsMoney();

			// 伪代码：
			/*
				我这里没有del的接口，按套路，
				1，要请求del的接口，提交你所要删除的商品的信息；
				2，接口返回当前商品的json，
				3，你要调用
					// 生成购物车
					_self.createDom(...)，
					更新购物车列表
			*/

		})
	},
	// 购物车为空，时如何
	cartEmpty:function(){
		var _self = this;
		_self.cartMainId
			.css({
				'text-align':'center',
				'color':'#f00'
			})
			.html('<h1>购物车为空，快去买买买<h1>')
	}

}

new ShoppingCarObj({
	cartMainId : $('#cartMainId'),
	allGoodsTopId : $('#allGoodsTopId'),
	selectGoodsNumId : $('#selectGoodsNumId'),
	totalMoneyId : $('#totalMoneyId'),
	allCheckBtn : $('input.allCheckBtn')
});