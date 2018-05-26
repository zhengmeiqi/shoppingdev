/********************
 * Date：2017/12/15
 * info: 购物车-产品列表的模板
 */

function cartTplFn( _data ){
	var _html = '';
	for(var i=0; i<_data.length; i++){
		// _html += '<div class="shopItemLine"></div>';
		_html += '<div class="shopItem">';
			_html += '<ul>';
				_html += '<li class="w_1">';
					_html += '<input type="checkbox" checked class="checkBtn checkData" data-num='
							+ _data[i].num 
							+' data-unit='
							+ _data[i].unit +' />';
				_html += '</li>';
				_html += '<li class="w_2">';
					_html += '<img src="'+ _data[i].goodsimg +'" />';
				_html += '</li>';
				_html += '<li class="w_3">'+ _data[i].introduce +'</li>';
				_html += '<li class="w_4">'+ _data[i].name +'</li>';
				_html += '<li class="w_5">￥'+ _data[i].unit +'</li>';
				_html += '<li class="w_6">';
					_html += '<div class="enterNum">';
						_html += '<input class="minusGoodsBtn enterNum_a fl" type="button" value="-" />';
						_html += '<input class="inputGoodsNum enterNum_b" type="text" value='+ _data[i].num +' />';
						_html += '<input class="addGoodsBtn enterNum_c fr" type="button" value="+" />';
					_html += '</div>';
				_html += '</li>';
				_html += '<li class="w_7">￥'+ _data[i].total +'</li>';
				_html += '<li class="delBtn w_8">删除</li>';
			_html += '</ul>';
		_html += '</div>';
	}

	return _html;
}