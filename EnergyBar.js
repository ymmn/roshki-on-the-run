var bar, energyTot, energy;
var decayValue = -0.1;//-0.05;

function changeEnergy(value) {
	var tempTot = value + energyTot;
	if(tempTot <= 100 && tempTot >0) {
		energyTot += value;
	} else if(tempTot> 100) {
		energyTot = 100;
	} else {
		energyTot = 0;
	}
}

function initEnergyBar() {
	bar = new createjs.Shape();
	bar.graphics.beginFill("000").drawRect(840, 20, 104, 20);
}

function drawEnergyBar() {
	if(energyTot >= 0) {
		stage.removeChild(energy);
		energy = new createjs.Shape();
		if(energyTot > 50) {
			energy.graphics.beginFill("00ff00").drawRect(842,22,energyTot, 16);
		} else if(energyTot > 20) {
			energy.graphics.beginFill("dcff13").drawRect(842,22,energyTot, 16);
		} else {
			energy.graphics.beginFill("F00").drawRect(842,22,energyTot, 16);
		}
		stage.addChild(energy);
	} else {
		endGame();
	}
	changeEnergy(decayValue);
}

function endGame() {
	return energyTot == 0;
}