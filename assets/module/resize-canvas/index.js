'use strict';

var ResizeCanvas = function(canvas) {
	this.canvas = canvas;
	this._initFullScreenCanvas();
};

ResizeCanvas.prototype._resize = function() {
	this.canvas.width = document.width || document.body.clientWidth;
	this.canvas.height = document.height || document.body.clientHeight;
	return this;
};

ResizeCanvas.prototype._initFullScreenCanvas = function() {
	var that = this;
	that._resize();
	window.addEventListener('resize', function() {
		that._resize();
	});
	return that;
};


module.exports = ResizeCanvas;