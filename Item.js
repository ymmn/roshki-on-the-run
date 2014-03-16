"use strict";

function Item(stage) {
	this.stage = stage;
	this.goods = Array();
	this.goods.push("apple_clipart2-34x34.png");
	this.goods.push("Cookie_Gif.png");
	this.goods.push("orange.png");
	this.goods.push("strawberry.png");
	this.goods.push("cherry.png");
	this.goods.push("pie.png");
	this.goods.push("cake_big.png");
	this.bads = Array();
	this.bads.push("nickcage.png");
	this.bads.push("snake.png");
	this.bads.push("ielogo.png");
	this.bads.push("death.png");
	this.rand = Math.round(Math.random()*(this.goods.length + this.bads.length)); 
	this.x = 900;
	this.y = 290;
	this.ground = 290;
	if (this.rand >= this.goods.length) {
		this.icon = new createjs.Bitmap(this.bads[this.rand-this.goods.length])
	} else {
		this.icon = new createjs.Bitmap(this.goods[this.rand]);
	}
	this.stage.addChild(this.icon);

}


// returns true if object is a good, false otherwise
Item.prototype.isGood = function() {
	return this.rand < this.goods.length;
}

Item.prototype.isColliding = function(otherLeft, otherRight, otherTop, otherBot) {
	// console.log("otherLeft=" + otherLeft + ", otherRight=" + otherRight);
	// console.log("otherTop=" + otherTop + ", otherBot=" + otherBot);
	// console.log("this.x=" + this.x);
	//if(this.icon.x < otherRight && this.icon.x + this.width > otherLeft) {
	if(this.x < 75 && this.x > 30) {
		//if(!(otherBot < this.icon.y || otherTop > this.icon.y + this.height)) {
		if (this.y < otherBot) {
			return true;
		}
	} else {
		//console.log("horizontal intersect not happen");
	}
		return false;
}

Item.prototype.drawItem = function() {
	this.icon.x = this.x;
	this.icon.y = this.y;
	this.icon.width = 5;
	this.icon.height = 5;
	this.stage.update();
}

Item.prototype.remove = function(stage) {
	this.stage.removeChild(this.icon);
//	this.icon.visible = false;
}
