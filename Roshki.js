

function Roshki(stage) {
	//this.images = Array("roshki.png", "roshki2.png", "roshki3.png", "roshki2.png");
	this.images = Array("guy1.png", "guy2.png", "guy3.png", "guy4.png");
	this.location = 0;
	this.x = 100;
	this.y = 100;
	this.count = 0;
	this.height = 32;
	this.width = 35;
	this.ground = 290;
	this.acceleration = 1;
	this.velocity = 0;
	this.isJumping = false;
	this.icon = new createjs.Bitmap(this.images[0]);
	this.icon2 = new createjs.Bitmap(this.images[1]);
	this.stage = stage;
	this.switch = true;
	this.stage.addChild(this.icon);
	this.stage.addChild(this.icon2);
		this.angle = 0;
	this.isdead = false;
}

Roshki.prototype.jump = function() {
	if (!this.isJumping) {
		this.isJumping = true;
		this.spinCount = 18;
		this.velocity = -13;
		this.y = this.y - 1;
	}
}

Roshki.prototype.fall = function() {

}

Roshki.prototype.spin = function() {
	this.angle -= 720 / 18;
	this.spinCount--;
    var value = this.angle;
    this.icon.setTransform (this.icon.x , this.icon.y , this.icon.scaleX , this.icon.scaleY , value/2 , this.icon.skewX , this.icon.skewY , this.icon.regX , this.icon.regY );
	this.icon2.setTransform (this.icon2.x , this.icon2.y , this.icon2.scaleX , this.icon2.scaleY , value/2 , this.icon2.skewX , this.icon2.skewY , this.icon2.regX , this.icon2.regY );
}

Roshki.prototype.draw = function() {
	this.count++;
	if(this.spinCount > 0) this.spin();
    if(this.isdead) this.spin();


    //console.log(CANVAS_HEIGHT - CELL_SIZE*terrain.getCurrentGroundHeight(0,100));
	var groundCell = terrain.getCurrentGroundHeight(this.x + 100,this.x + 130);
	//console.log(groundCell);
	if(groundCell == NaN || groundCell == undefined) groundCell = 5;
	this.ground = CANVAS_HEIGHT - CELL_SIZE*groundCell - this.width + 4;
	var check = this.checkGround();

	var heightDiff = this.y - this.ground;
	// console.log(heightDiff);
	if(heightDiff > 3*CELL_SIZE){
		gameOver();	
	} 

	this.y += this.velocity;
	if (check == 1) {
		this.velocity += this.acceleration;
	} else if (check == -1) {
		this.velocity = 0;
		this.y = this.ground;
		this.isJumping = false;
	}
	if (this.count % 4 == 0) {
		this.icon.visible = this.switch;
		this.icon2.visible = !this.switch;
	}
	this.icon.x = this.x;
	this.icon.y = this.y;
	this.icon2.x = this.x;
	this.icon2.y = this.y;
	stage.update();	

	if (this.count % 4 == 0) {
		this.location = (this.location + 1) % 4;
		if (this.switch) {
	//		console.log(this.count % 4);
			this.icon2.image.src = this.images[this.location];
		} else {
			this.icon.image.src = this.images[this.location];
		}
		this.switch = !this.switch;
	}
}

Roshki.prototype.getX = function() {
	return this.x;
}

Roshki.prototype.left = function() {
	return this.x;
}

Roshki.prototype.right = function() {
	return this.x + this.width;
}

Roshki.prototype.top = function() {
	return this.y;
}

Roshki.prototype.bot = function() {
	return this.y + this.height;
}

Roshki.prototype.getY = function() {
	return this.y;
}

Roshki.prototype.setX = function(x) {
	this.x = x;
}

Roshki.prototype.setY = function(y) {
	this.y = y;
}

Roshki.prototype.checkGround = function() {
	if (this.y < this.ground) {
		return 1;
	} else if (this.y > this.ground) {
		return -1;
	} else {
		return 0;
	}
}