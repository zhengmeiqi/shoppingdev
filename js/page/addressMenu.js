/********************
 * Date：2017/12/13
 * info: 产品详情页-配送地址，切换菜单
 */

function AddressMenuFn( _config ){
	for(var i in _config){JsonpAjaxFn
		this[i] = _config[i]
	}
	this.init();
}

AddressMenuFn.prototype = {
	init:function(){
		var _self = this;

		// 地址切换菜单-显示隐藏
		_self.addressTitleEventBtn();

		// 获取数据
		_self.getDate();

		// 省、市、区的三个tab按钮
		_self.eventTabA();
		_self.eventTabB();
		_self.eventTabC();
	},
	getDate:function(){
		var _self = this;
		// 获取省
		JsonAjaxFn( APILIST.citylist, function(d){
			var province =[];
			for(var i=0;i<d.length;i++){
				province.push(d[i].name);
			}
			_self.createDom( province, _self.provinceId );
			_self.provinceEvent(province);
		});
	},

	// 省的tab菜单的方法
	provinceEvent: function (province){
		var _self = this;
		var city = [ ];
		_self.provinceId.children('li').on('click',function(){
			_html = $(this).html();

			// 把省存入数组
			_self.create_ArrayFn( _html );
			for (var i = 0; i < province.length; i++) {
				if (province[i] == _html){
					_self.pro = i;
				}
			}
			// 获取市
			JsonAjaxFn(APILIST.citylist, function (d) {
				city = [ ];
				for (var i = 0; i < d[_self.pro].city.length; i++) {
					city.push(d[_self.pro].city[i].name)
				}
				_self.createDom(city, _self.cityId);
				_self.cityEvent(city);
			});

			_self.tabA
				.removeClass('sel_li')
				.html( _html );

			_self.provinceId.hide();
			_self.cityId.show();

			// 选择了省，市显示，省和区要隐藏
			// 以防止 ，在你还没有选择市的情况下，直接就选了区
			_self.tabB
				.show()
				.html('请选择市')
				.addClass('sel_li');
		});
	},
	// 市的tab菜单的方法
	cityEvent:function(city){
		var _self = this;
		_self.cityId.children('li').on('click',function(){
			var _html = $(this).html();

			// 把市存入数组
			_self.create_ArrayFn( _html );
			for (var i = 0; i < city.length; i++) {
				if (city[i] == _html) {
					_self.cit = i;
				}
			}
			// 获取区
			JsonAjaxFn(APILIST.citylist, function (d) {
				var area = [];
				for (var i = 0; i < d[_self.pro].city[_self.cit].area.length; i++) {
					area.push(d[_self.pro].city[_self.cit].area[i])
				}
				_self.createDom(area, _self.areaId);
				_self.areaEvent();
			});

			_self.tabB
				.removeClass('sel_li')
				.html( _html );

			_self.cityId.hide();
			_self.areaId.show();

			_self.tabC
				.show()
				.html('请选择区')
				.addClass('sel_li');

		});
	},
	// 区的tab方法
	areaEvent:function(){
		var _self = this;
		_self.areaId.children('li').on('click',function(){
			var _html = $(this).html();

			// 把区存入数组
			_self.create_ArrayFn( _html );

			_self.tabC.html( _html );
			// _self.areaId.hide();

			// 点击“区”之后，整个菜单要隐藏，并且同步修改 isShow 开关
			_self.addressListWrapId.hide();
			_self.isShow = 0;

			_self.addressArrs.splice(2,1);

		});
	},

	// 操作省、市、区的数组
	create_ArrayFn:function( _n ){
		var _self = this;

		if( _self.addressArrs.length < 3 ){
			_self.addressArrs.push( _n );
		}

		console.log( _self.addressArrs );
		_self.addressDivId.html('');

		for(var i=0; i<_self.addressArrs.length; i++){
			$('<p/>',{})
				.html( _self.addressArrs[i] )
				.appendTo( _self.addressDivId );
		}
	},

	// 点击省的TabA按钮，市、区的tab和列表隐藏
	eventTabA:function(){
		var _self = this;
		_self.tabA.on('click',function(){
			$(this).addClass('sel_li');
			_self.tabB.removeClass('sel_li').hide();
			_self.tabC.removeClass('sel_li').hide();

			_self.provinceId.show();
			_self.cityId.hide();
			_self.areaId.hide();

			// 当修改地址时，为了重新生成“省”，所以要清空数组
			// 下面二种清空数组的方法，没有哪种更好，只是根据不同的情况。
			_self.addressArrs.splice(0,3);
			// _self.addressArrs = [];
			// console.log( _self.addressArrs )
		});
	},
	// 点击市的TabB按钮，省和区的名称列表要隐藏
	eventTabB:function(){
		var _self = this;
		_self.tabB.on('click',function(){
			_self.tabA.removeClass('sel_li');
			$(this).addClass('sel_li');
			_self.tabC.removeClass('sel_li').hide();

			_self.provinceId.hide();
			_self.cityId.show();
			_self.areaId.hide();

			_self.addressArrs.splice(1,2);
		});
	},
	// 点击区的TabC按钮
	eventTabC:function(){
		var _self = this;
		// 在这个demo项目中，没有操作，
	},

	// 通用的生成省、市、区名称的列表的方法
	createDom:function( _data, _wrap ){  
		var _self = this; 
		_wrap.empty();
		for(var i=0; i<_data.length; i++){
			$('<li/>')
				.html( _data[i] )
				.appendTo( _wrap );
		}
	},
	// 地址切换菜单-显示隐藏
	addressTitleEventBtn:function(){
		var _self = this;
		_self.addressTitleId.on('click',function(){
			if( _self.isShow  == 0 ){
				_self.addressListWrapId.show();
				_self.isShow = 1;
			} else {
				_self.addressListWrapId.hide();
				_self.isShow = 0;
			}
		});
	}
}

new AddressMenuFn({
	addressTitleId : $('#addressTitleId'),
	addressListWrapId : $('#addressListWrapId'),

	provinceId : $('#provinceId'),
	cityId : $('#cityId'),
	areaId : $('#areaId'),

	tabA : $('#tabA'),
	tabB : $('#tabB'),
	tabC : $('#tabC'),

	isShow:0,
	addressArrs:[],
	pro:null,
	cit:null,

	addressDivId : $('#addressDivId')
})