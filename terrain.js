var terrain = (function(){

    var columns = [];
    var terraObj = {};
    var NUM_COLUMNS = 130;
    var queuedColumns = [];
    var DEFAULT_GROUND_HEIGHT = 5;
    var CELLS_OFF_SCREEN = 10;
    var TERRAIN_COLOR = "#ff7113";
    heights = [];

    terraObj.init = function(){
        heights = [];
        columns = [];
        queuedColumns = [];
        for(var i = 0; i < NUM_COLUMNS; i++){
            columns.push(createGroundColumn(DEFAULT_GROUND_HEIGHT, i*CELL_SIZE - 960));
            heights.push(DEFAULT_GROUND_HEIGHT);
        }
    }

    var makeHill = function(length, height){
        for(var i = 0; i < length; i++){
            queuedColumns.push(height+DEFAULT_GROUND_HEIGHT);
        }
    }

    var makeSlope = function(length){
        for(var i = 0; i < length; i++){
            queuedColumns.push(DEFAULT_GROUND_HEIGHT+i);
        }
    }

    var slopePlusHill = function(height, length){
        makeSlope(height);
        makeHill(length, height);
    }

    var createGroundColumn = function(height, xpos){
        var bg = new createjs.Shape();
        // var x = i + startx;
        // var y = j + starty;
        // console.log("" + x + ", " + y);
        var point = awesomeTranslate(60,0);
        // console.log(point.x);
        if(xpos!==undefined)
            point.x = xpos;
        // console.log(point);
        // if(j==(yheight-1))
        //  bg.graphics.beginFill('#11CC11').drawRect(point.x, point.y, CELL_SIZE, CELL_SIZE).endFill();
        // else
        // console.log(ground);
        bg.graphics.beginFill(TERRAIN_COLOR).drawRect(point.x - ground.x, point.y - (height-1)*CELL_SIZE, CELL_SIZE, height*CELL_SIZE).endFill();
        bg.alpha = 1.0;
        ground.addChild(bg);
        return bg;
    }

    var destroyGroundColumn = function(column){
        ground.removeChild(column);
    }
/*
    function createPlatform(startx,starty,yheight,length){
        for(var i=0; i < length; i++){
            for(var j=0; j < yheight; j++){
                var bg = new createjs.Shape();
                var x = i + startx;
                var y = j + starty;
                console.log("" + x + ", " + y);
                var point = awesomeTranslate(x,y);
                console.log(point);
                if(j==(yheight-1))
                    bg.graphics.beginFill('#11CC11').drawRect(point.x, point.y, CELL_SIZE, CELL_SIZE).endFill();
                else
                    bg.graphics.beginFill('#CCCCCC').drawRect(point.x, point.y, CELL_SIZE, CELL_SIZE).endFill();
                bg.alpha = 1.0;
                ground.addChild(bg);
            }
        }
    }
*/
    function createBump(startx,starty,yheight,length){
        for(var i=0; i < length; i++){
            for(var j=0; j < yheight; j++){
                var bg = new createjs.Shape();
                var x = i + startx;
                var y = j + starty;
                // console.log("" + x + ", " + y);
                var point = awesomeTranslate(x,y);
                // console.log(point);
                if(j==(yheight-1))
                    bg.graphics.beginFill('#11CC11').drawRect(point.x, point.y, CELL_SIZE, CELL_SIZE).endFill();
                else
                    bg.graphics.beginFill('#CCCCCC').drawRect(point.x, point.y, CELL_SIZE, CELL_SIZE).endFill();
                bg.alpha = 1.0;
                bump.addChild(bg);
            }
        }
        return bump;
    }

    var getCellsCovered = function(lowx,highx){
        var retVal = [];
        var lowCell = Math.floor(lowx/CELL_SIZE);
        var highCell = Math.floor(highx/CELL_SIZE);
        for(var i = lowCell; i <= highCell; i++)
            retVal.push(i);
        return retVal;
    }

    terraObj.getCurrentGroundHeight = function(lowx, highx){
        return getCellsCovered(lowx,highx).map(function(a){ return heights[a+CELLS_OFF_SCREEN]; })
                                          .reduce(function(a,b){ return a>b?a:b; });
    }

   terraObj.tick = function(){
        var nextColumnHeight = DEFAULT_GROUND_HEIGHT;
        if(queuedColumns.length){
            nextColumnHeight = queuedColumns[0];
            queuedColumns = queuedColumns.slice(1);
        }
        if(TIMER%50==0){
            //nextColumnHeight = Math.floor(Math.random()*5) + 5;
            // console.log("bump");


            //makeSlope(5);
            if(!isOver){ 
                if(Math.round(Math.random())) makeHill(20,5);
                else if(Math.round(Math.random())) DEFAULT_GROUND_HEIGHT += 1;
                else if(Math.round(Math.random())) DEFAULT_GROUND_HEIGHT -= 1;
                else slopePlusHill(Math.round(10*Math.random()), 10+Math.round(10*Math.random()));
            }
        }
        columns.push(createGroundColumn(nextColumnHeight));
        
        // TODO

        if(TIMER % 100 == 0){
            newItem = new Item(stage);
            newItem.ground = CANVAS_HEIGHT - (DEFAULT_GROUND_HEIGHT + 1) * CELL_SIZE;
            items.push(newItem);
        }

        heights.push(nextColumnHeight);
        if(columns.length > NUM_COLUMNS){
            destroyGroundColumn(columns[0]);
            heights = heights.slice(1);
            columns = columns.slice(1);
        }
        ground.x = (ground.x-8);
    }

    terraObj.toString = function() {
        return "Ima terrain, fear me!";
    }

    return terraObj;


}());

