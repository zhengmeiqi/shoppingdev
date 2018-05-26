/********************
 * Date：2017/12/08
 * info: 首页的享生活的模板
 */

function pbTpl( _obj, _i ){
	var _html = '';

		_html += '<div class="productBlock">';
		_html += '<img src="' + _obj.goodsListImg + '"/>';
		_html += '<dl class="bg_' + (_i % 3 + 1) +'">';
				_html += '<dt>'+ _obj.className +'</dt>';
				_html += '<dd>' + _obj.goodsName +'</dd>';
			_html += '</dl>';
		_html += '</div>';

	return _html;
}
