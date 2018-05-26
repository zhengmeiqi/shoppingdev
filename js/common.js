/********************
 * Date：2017/12/08
 * info: 全站的公共方法
 */

// 公共头文件：head.html
(function(){
	$.ajax({
		url: 'module/head.html',
		type:'get',
		dataType:'html',
		success:function(d){
			$(d).prependTo( $('body') );

			// 首页的header头
			new HeadSearcnFn({
				headerSearchId : $('#headerSearchId')
			});
		}
	});
}());


// 首页的header头，构造器
function HeadSearcnFn( _configObj ){
	// 全对象共享的初始值
	this.txtVal 		 = HeaderSearchValConfig;
	this._headerSearchId = _configObj.headerSearchId;
	this.init();
}

HeadSearcnFn.prototype = {
	// 初始化
	init:function(){
		var _self = this;

		_self.eventClick();
		_self.eventBlur();
	},
	// 点击，获得焦点
	eventClick:function(){
		var _self = this;

		_self._headerSearchId.on('click',function(){
			$(this).val('');
		});
	},
	// blue，失去焦点
	eventBlur:function(){
		var _self = this;

		_self._headerSearchId.on('blur',function(){
			$(this).val( HeaderSearchValConfig );
		});
	}
}

// json的ajax
function JsonAjaxFn(_url, callback) {
	$.ajax({
		url: _url,
		type: 'get',
		dataType: 'json',
		jsonp: 'callback',
		success: function (d) {
			callback(d);
		}
	});
}
// jsonp的跨域的ajax
function JsonpAjaxFn( _url, callback ){
	$.ajax({
		url: _url ,
		type:'get',
		dataType:'jsonp',
		jsonp:'callback',
		success:function(d){
			callback(d);
		}
	});
}

// 根据 pid 参数，获取不同产品的信息
function getPidFn( _url, _pid, callback ){
	$.ajax({
		url: _url,
		type:'get',
		data:'goodsID=' + _pid,//这个名字，是一个参数名，是后端控制的
		dataType:'jsonp',
		jsonp:'callback', //这个名字，是一个函数的名字，是后端控制的
		success:function(d){
			callback(d);
		}
	});
}


// 接收产品的数量和单价，返回此商品的总价：单价 * 数量
/*
 	_d:'[{"num":'+ _val +',"price":'+ _unit +'}]';
*/
function cartAjaxFn( _url, _d, callback ){
	$.ajax({
		url: _url ,
		type:'get',
		data:'cart=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		}
	});
}

// 计算所有checkbox被选中的商品的总数和总价
function goodsCheckFnJsonp( _url, _d, callback ){
	$.ajax({
		url: _url ,
		type:'get',
		data:'goods=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		}
	});
}