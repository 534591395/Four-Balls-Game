'use strict';

var ResizeCanvas = require('./module/resize-canvas/index.js');
var RenderBoard = require('./module/render-board/index.js');


var GameStart = function(canvas) {
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
};

GameStart.prototype.init = function() {
	new ResizeCanvas(this.canvas);
	new RenderBoard(this.canvas, this.ctx);
	return this;
};


// canvas 元素

var gameOne = new GameStart(document.getElementById('mainCanvas'));

gameOne.init();