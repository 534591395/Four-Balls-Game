/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ResizeCanvas = __webpack_require__(5);
	var RenderBoard = __webpack_require__(7);


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

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var RenderBoard = function(canvas,ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this._width = this.canvas.width;
		this._height = this.canvas.height;
		this._cols = 7;
		this._rows = 6;
		// 单元格最佳大小
		this._cellSize = this._getBoardRect().cellSize;
		console.dir(this._getBoardRect());
		this._render();
	};


	RenderBoard.prototype._render = function() {
		this._drawBg()._drawGrid();
		return this;
	};

	//背景颜色
	RenderBoard.prototype._drawBg = function() {
		var ctx = this.ctx;
		var co = this._width/6;
		var gradient = ctx.createLinearGradient(0,0,0,this._height);
		gradient.addColorStop(0, "#fffbb3");
		gradient.addColorStop(1, "#f6f6b2");
		ctx.fillStyle = gradient;
		ctx.fillRect(0,0,this._width,this._height);

		ctx.strokeStyle = "#dad7ac";
		ctx.fillStyle = "#f6f6b2";

		ctx.beginPath();
		ctx.moveTo(co, this._height);
		ctx.bezierCurveTo(this._width + co*3, -co, -co*3, -co, this._width - co, this._height);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(co, 0);
		ctx.bezierCurveTo(this._width + co*3, this._height + co, -co*3, this._height + co, this._width - co, 0);
		ctx.fill();

		return this;
	};

	// 网格
	RenderBoard.prototype._drawGrid = function() {
		var ctx = this.ctx;
		ctx.beginPath();
		// 水平
		for(var i = 0; i <= this._cols; i++) {
			ctx.moveTo(i*this._cellSize + 0.5, 0.5);
			ctx.lineTo(i*this._cellSize +0.5, this._height + 0.5);
		}

		// 垂直
		for(var j = 0; j <= this._rows; j++) {
			ctx.moveTo(0.5, j*this._cellSize + 0.5);
			ctx.lineTo(this._width + 0.5, j*this._cellSize + 0.5);
		}

		ctx.strokeStyle = "#ccc";
		ctx.stroke();

		return this;
	};

	// 获取最佳大小位置
	RenderBoard.prototype._getBoardRect = function() {
		var cellSize = Math.floor(Math.min(this.canvas.width/this._cols, this.canvas.height/this._rows));
		var boardWidth = cellSize * this._cols;
		var boardHeight = cellSize * this._rows;
		return {
			x: Math.floor((this.canvas.width - boardWidth)/2),
			y: Math.floor((this.canvas.height - boardHeight)/2),
			cellSize: cellSize
		};
	};


	module.exports = RenderBoard;

/***/ }
/******/ ]);