/* Util function
 * used to help the adoption of different screen resolutions
 * it takes a param object as init parameter and transforms
 * a given point to the required point.
 * param: {
 *     orientation: landscape or portrait
 *     mode: reserve_ratio or not_reserve_ratio
 *     source: {width: , height: }
 *     target: {width: , height: }
 * }
*/

var uc = (function(param){
	param = param || {source: {}, target: {}};

	var orientation = param.orientation || "landscape";
	var mode = param.mode || "not_reserve_ratio";
	var _width = param.source.width || 800;
	var _height = param.source.height || 480;
	var _t_width = param.target.width || 800;
	var _t_height = param.target.height || 480;

	var _width_aspect = 1;
	var _height_aspect = 1;
	var _aspect = 1;

	var init = function (param) {
		var aspect1 = _width / _height;
		var aspect2 = _t_width / _t_height;
		if (aspect1 > aspect2) {
			_aspect = _t_width / _width;
		} else {
			_aspect = _t_height / _height;
		}
		_width_aspect = _t_width / _width;
		_height_aspect = _t_height / _height;
	}();

	console.log(_width, _height, _t_width, _t_height, _aspect, _width_aspect, _height_aspect);

	return {
		trPoint: function (point) {
			var p = {};
			if (mode == "reserve_ratio") {
				p.x = point.x * _aspect;
				p.y = point.y * _aspect;
			} else if (mode == "not_reserve_ratio") {
				p.x = point.x * _width_aspect; console.log(_width_aspect, p.x, point.x);
				p.y = point.y * _height_aspect; console.log(_height_aspect);
			}
			return p;
		},
		trScale: function (scale) {
			return scale * _aspect;
		},
		tr: function (p) {
			return p * _aspect;
		},
		trx: function (p) {
			return p * _width_aspect;
		},
		try: function (p) {
			return p * _height_aspect;
		}
	}
})(param = {
	orientation: "landscape",
	mode: "not_reserve_ratio",
	source: {width: 800, height: 480},
	target: {width: 400, height: 240}
});