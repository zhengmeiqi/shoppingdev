/********************
 * Date：2017/11/30
 * info: 首页的js文件
 */

// 首页的左边产品导航
function ProductNav(_configObj){
	this.ulId = _configObj.ulId
	this.init();
}
ProductNav.prototype = {
	init:function(){
		var _self = this;

		_self.getDate();
	},
	getDate:function(){
		var _self = this;
		console.log("123");
		JsonAjaxFn(APILIST.subNavapi, function(d){
			// 创建dom节点
			_self.createDomFn(d);

			// 给菜单li绑定事件
			var _lis  = _self.ulId.children();
			_self.eventMove(_lis);
			_self.eventOut(_lis);
		});
	},
	createDomFn:function(d){
		var _self = this;

		var _len = d.length;

		for(var i=0; i<_len; i++){
			$('<li/>')
				.html(function(){
					var _this = $(this);

					$('<a/>',{})
						.html(d[i].className)
						.appendTo( _this );

					$('<div/>',{
							class:'mask'
						})
						.html(function(){
								$('<p/>',{})
									.html(d[i].className )
									.appendTo( $(this) );
						})
						.appendTo( _this );
				})
				.appendTo( _self.ulId );
		}
	},
	eventMove:function(_lis){
		var _self = this;
		_lis.on('mouseover',function(){
			$(this).children()
				.eq(1)
				.css('display','block');
		});
	},
	eventOut:function(_lis){
		var _self = this;
		_lis.on('mouseout',function(){
			$(this).children()
				.eq(1)
				.css('display','none');
		});
	}
}

// 首页的轮播图，构造器
function IndexSliderFn( _configObj ){

	// 通过for循环，将页面id属性，动态添加
	for(var i in _configObj){
		this[i] = _configObj[i];
	}

	this._tempI = 0;
	this._imgW 	= 992;

	this.init();
}
/*
	根据UI设计图，抽象出功能点，设计此功能模块
*/
IndexSliderFn.prototype = {
	init:function(){
		var _self = this;

		_self.getDate();
	},
	// 获取数据
	getDate:function(){
		var _self = this;

		$.ajax({
			url: APILIST.imgJson , //这是一个api接口
			type:'get',
			dataType:'json',
			success:function(d){
				var _imglist = d.imglist;
				var _imglistLength  = _imglist.length;

				// 回调

				// 生成轮播图
				_self.createDomFn( _imglist, _self.imgListId );

				// 生成小白点li
				_self.createPointer( _imglist, _self.pointerUlId )

				// 设置轮播图UL的宽度
				_self.ulWidth( _imglistLength );

				// 设计小白点的UL、div的宽度
				_self.pointerWrapWidth( _imglistLength );

				// 左边按钮
				_self.leftBtnFn( _imglistLength );

				// 右边按钮
				_self.rightBtnFn( _imglistLength );

				// 小白点按钮
				_self.pointerGroupFn();
			}
		});

	},
	// 设置轮播图UL的宽度
	ulWidth:function( _length ){
		var _self = this;
		_self.imgListId.css('width', _length * _self._imgW );
	},
	// 设计小白点的UL、div的宽度
	pointerWrapWidth:function( _length ){
		var _self = this;
		var _pointerWidth = _length * 26;

		// 小白点的UL
		_self.pointerUlId.css('width', _pointerWidth);

		// 小白点的UL、背景的margin-left
		var _pointerMarginLeft = {
				'width': _pointerWidth,
				'margin-left': -(_pointerWidth/2)
			}

		// 小白点的ul的父容器
		_self.pointerId.css( _pointerMarginLeft );

		// 小白点的半透明背景
		_self.pointerBgId.css( _pointerMarginLeft );
	},
	// 生成dom节点
	createDomFn:function( _d, _wrap ){
		var _self = this;
		// console.log( _d )
		for(var i=0; i<_d.length; i++){
			$('<li/>')
				.html(function(){
					$('<img />')
						.attr({
							'src': _d[i]
						})
						.appendTo( $(this) );
				})
				.appendTo( _wrap );
		}
	},
	// 生成小圆点
	createPointer:function( _d, _wrap ){
		var _self = this;
		for(var j=0; j<_d.length; j++){
			$('<li/>').appendTo( _wrap );
		}

		// 小白点默认第一个为红色，这是一个初始值，它只执行一次
		_wrap.children().eq(0).addClass('f00');
	},
	// 左边按钮
	leftBtnFn:function( _length ){
		var _self = this;
		_self.leftBtnId.on('click',function(){

			if( _self._tempI < (_length-1) ){
				_self._tempI++;
			} else {
				_self._tempI = 0;
			}

			// 小白点随图片的序号，对应变成红色
			_self.pointerStyleRed();

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 右边按钮
	rightBtnFn:function( _length ){
		var _self = this;

		_self.rightBtnId.on('click',function(){
			if( _self._tempI > 0 ){
				_self._tempI--;
			} else {
				_self._tempI = (_length-1);
			}

			// 小白点随图片的序号，对应变成红色
			_self.pointerStyleRed();

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 获得小白点的集合
	getPointerDom:function(){
		var _self = this;
		return _self.pointerUlId.children();
	},
	// 小白点随图片序号变红
	pointerStyleRed:function(){
		var _self = this;
		_self.getPointerDom().eq(_self._tempI)
								.addClass('f00')
								.siblings()
								.removeClass();
	},
	// 小圆点按钮
	pointerGroupFn:function(){
		var _self = this;

		// 小白点的集合
		var _pointerGroup = _self.getPointerDom();

		// 小白点的点击事件
		_pointerGroup.on('mouseenter',function(){
			$(this).addClass('f00').siblings().removeClass();
			_self._tempI = $(this).index();

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 动画&特效方法(通用方法)
	animateFn:function(){
		var _self = this;
		var silderleft = (_self.imgListId.css('left'));
		
		_self.imgListId.stop().animate({
			left : -( _self._imgW * _self._tempI )
		},500);
	}
}

// 首页产品列表：享生活
function ProductListFn(){
	this.productListId = $('#productListId');
	this.init();
}
ProductListFn.prototype = {
	init:function(){
		var _self = this;
		_self.getDate();
	},
	getDate:function(){
		var _self = this;
		JsonpAjaxFn( APILIST.productBlock, function(d){
			_self.createDomFn(d);
		});
	},
	createDomFn:function(d){
		var _self = this;
		var _data = d;
		// console.log(_data)

		for(var i =0; i<_data.length; i++){
			$('<a/>',{
					// class:'productBlock bg_'+(i+1)
					href : 'productDetail.html?pid=' + _data[i].goodsID,
					target:"_blank",
					pid: _data[i].goodsID
				})
				.html( pbTpl( _data[i], (i+1) ) )
				.appendTo( _self.productListId );
		}

	}
}