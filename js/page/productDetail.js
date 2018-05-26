/********************
 * Date：2017/12/12
 * info: 产品详情页的js文件
 */

// 匿名自执行函数，产品详情页的入口，先不用，报错。
// (function(){
// 	var _href = location.href;
// 	var _str  = _href.indexOf('?');
// 	var _pid  = _href.substring(_str+5)
// 	// console.log( _pid )
// }());

// ------------------------------------->>>>
// 返回 pid
function getPid(){
	var _href = location.href;
	var _str  = _href.indexOf('?');
	return _href.substring(_str+5);
}

// 左边的产品图片列表
function GoodsDetailImg( _config ){
	for(var i in _config){
		this[i] = _config[i]
	}
	this.sum = 0;
	this.init();
}

GoodsDetailImg.prototype = {
	init:function(){
		var _self = this;
		_self.getDate();
	},
	getDate:function(){
		var _self = this;
		getPidFn(APILIST.productBlock, getPid(), function (d) {
			var smallImg = d[0].imgsUrl.substring(2, d[0].imgsUrl.length-2).split('","');
			var bigImg = d[0].goodsBenUrl
.substring(2, d[0].imgsUrl.length - 2).split('","');
			_self.createDom(smallImg);
			_self.firstPhotoLoad(bigImg);

			_self.leftBtnEvent();
			_self.rightBtnEvent();
			_self.mouseEvent()
		});
	},
	createDom:function( _data ){
		var _self = this;
		// console.log(_data);

		for(var i=0; i<_data.length; i++){
			// 这里给li绑定事件的方式，不太好
			$('<li/>',{})
				.attr('data-bigImgurl', _data[i])
				.html(function(){
					$('<img/>',{})
						.attr('src' , _data[i])
						.appendTo( $(this) );
				})
				// 这个方法，我没有优化，我就不处理这里了。
				.on('click',function(){
					var _bigurl = $(this).attr('data-bigimgurl');
					// 左上方大图
					_self.switchBigImgUrl( _bigurl );
					// 局部显示的大图
					_self.bigImgPart.children('img').attr('src', _bigurl);
				})
				.appendTo( _self.smallImgUlId );
		}

		// 小图片的ul的宽度
		_self.smallImgUlId.css('width', _data.length * 75 );
	},
	// 大图根据小图切换
	switchBigImgUrl:function( _bigUrl ){
		var _self = this;
		_self.bigImgId.attr('src', _bigUrl);
	},
	// 自动加载第一张图片
	firstPhotoLoad:function( _d ){
		var _self = this;
		_self.bigImgId.attr('src', _d[0]);
		// 局部显示的大图
		_self.bigImgPart.children('img').attr('src', _d[0]);
	},
	leftBtnEvent:function(){
		var _self = this;
		_self.leftBtnId.on('click',function(){
			if( _self.sum < 2 ){
				_self.sum++;
				_self.smallImgUlId.css('left', -(_self.sum * 75));
			}
		});
	},
	rightBtnEvent:function(){
		var _self = this;
		_self.rightBtnId.on('click',function(){
			if( _self.sum > 0 ){
				_self.sum--;
				_self.smallImgUlId.css('left', -(_self.sum * 75));
			}
		});
	},
	// 鼠标进入 或 移出大图触发
	mouseEvent:function(){
		var _self = this;
		_self.bigImgWrapId.on({
			mouseover:function(){
				_self.maskId.show();
				_self.mouseMoveEvent();
				_self.bigImgPart.show();
			},
			mouseout:function(e){
				_self.maskId.hide();
				_self.bigImgPart.hide();
			}
		})
	},
	// 鼠标在大图上移动时触发
	mouseMoveEvent:function(){
		var _self = this;
		_self.bigImgWrapId.on('mousemove',function(e){
			// console.log( e );
			var _eL = e.pageX;
			var _eT = e.pageY;

			// 获取dt，也就是半透明遮罩的父容器，相对于整个网页的xy的坐标值，
			// .offset()，这是一个jq方法
			var _bigImgWrapIdXY = _self.bigImgWrapId.offset();

			// 半透明遮罩的一半宽度，100
			var _maskId_w_half = 100;

			_eL = _eL - _bigImgWrapIdXY.left - _maskId_w_half;
			_eT = _eT - _bigImgWrapIdXY.top - _maskId_w_half;

			// 用来临时查看xy坐标
			// $('#testXY').html( _eL + '<br/>' + _eT );

			// 向左移动
			// 到最左边，就不能再移动

			// 当它的left为0时，
			if( _eL < 0 ){
				// 就到了最左边
				_eL = 0;
			} 
			// el它向右移动的距离，大于它所在的那个容器的宽度时，到达最右。
			else if( _eL > _self.bigImgWrapId.width() - _self.maskId.width() ){
				_eL = _self.bigImgWrapId.width() - _self.maskId.width();
			}

			// 当它的top为0时，
			if( _eT < 0 ){
				// 就到了最上边
				_eT = 0;
			} if( _eT > _self.bigImgWrapId.height() - _self.maskId.height() ){
				_eT = _self.bigImgWrapId.height() - _self.maskId.height();
			}

			// 半透明遮罩的css
			_self.maskId.css({
				'left': _eL,
				'top': _eT
			});

			// 大图局部显示
			var _bigImg = _self.bigImgPart.children('img');
			_bigImg.css({
				'left': -(_eL * 2.475),
				'top': -(_eT * 2.475)
			});

		});
	}

}

// 左边的产品图片列表
new GoodsDetailImg({
	smallImgUlId : $('#smallImgUlId'),
	leftBtnId : $('#leftBtnId'),
	rightBtnId : $('#rightBtnId'),
	
	maskId : $('#maskId'),
	bigImgId : $('#bigImgId'),
	bigImgWrapId : $('#bigImgWrapId'),

	bigImgPart : $('#bigImgPart')
});

// ==========================================
// 产品详情信息
function ProductDetailFn(){
	this.detailInfoWrapId = $('#detailInfoWrapId');
	this.init()
}
ProductDetailFn.prototype = {
	init:function(){
		var _self = this;
		_self.getDate()
	},
	getDate:function(){
		var _self = this;
		getPidFn( APILIST.productBlock, getPid(), function(d){
			// var data = JSON.stringify(d);
			// _self.information_1(d);
			// _self.information_2(d.productInfo);
			_self.information_3(d[0]);
		})
	},
	// 最烂的写法：
	information_1:function(_d){
		var _self = this;
		var _infoArr = _d.productInfo;

		$('<h1/>',{
				class:'cle'
			})
			.html( _infoArr[0].title )
			.appendTo( _self.detailInfoWrapId );

		// 很烂的写法，我自己写的数据，跪着也得写完
		for(var i=0; i<_infoArr.length; i++){
			console.log( _infoArr[i] )

			for(var j in _infoArr[i]){
				console.log( _infoArr[i][j] )
				$('<p/>',{
						class:'title'
					})
					.html( _infoArr[i][j] )
					.appendTo( _self.detailInfoWrapId );
			}
		}
	},
	// 次烂的写法：
	information_2:function( _info ){
		var _self = this;
		// console.log( _info )
		for(var i=0; i<_info.length; i++){
			// console.log( _info[i] )
			// 第一个，用h1
			if( i==0 ){
				for(var j in _info[i]){
					// console.log( _info[i][j] )
					$('<h1/>',{
							class:'cle'
						})
						.html( _info[i][j] )
						.appendTo( _self.detailInfoWrapId );
				}
			} else {
				// 其余的，用p
				for(var j in _info[i]){
					// console.log( _info[i][j] )
					$('<p/>',{
							class:'title'
						})
						.html( _info[i][j] )
						.appendTo( _self.detailInfoWrapId );
				}
			}
		}
	},
	// 递归的写法，不烂，但是实际业务开发中，不好用。
	information_3:function( _info ){
		var _self = this;

		function loopFn(_info){
			if( _info.length != undefined ){
				// 这是数组
				// 第一次调用，传入的是数组
				for(var i=0; i<_info.length; i++){
					console.log( _info[i] )
					// 第二次，传入的就是对象了
					loopFn(_info[i]);
				}
			} else {
				// 这是对象
				for(var i in _info ){
					// console.log( i );
					if(i == 'goodsName'){
						$('<p/>',{ class:'title'})
							.html( _info[i] )
							.appendTo( _self.detailInfoWrapId );
					} else if (i == 'detail'){
						$('<h1/>',{class:'cle'})
							.html( _info[i] )
							.appendTo( _self.detailInfoWrapId );
					}
				}
			}
		}
		loopFn(_info);
	}
	/*
	这三种方式，不存在哪一种更好，只是不同的思路吧。
	*/
}

new ProductDetailFn();