var stage = new createjs.Stage("gameView");
	createjs.Ticker.setFPS(requestAnimationFrame);
	createjs.Ticker.addEventListener("tick",function(){
		if(GAMESTAGE){
			stage.update();
			timeEnd = new Date().getTime();
			var times = Math.floor((timeEnd - timeStart)/1000);
			document.getElementById("t03").value = times;
			if(times > 180){
				window.alert("You are so slowly!!! Please restart!")
				next();
			}
		}
	});   
document.getElementById("t01").value = window.prompt("Game will start, input your name please:");
var gameView = new createjs.Container();
	gameView.x = 30;
	gameView.y = 30;
	stage.addChild(gameView);
var GAMESTAGE = false;
var circleArr = [[],[],[],[],[],[],[],[],[]];
var clickNum = 0;
document.getElementById("t02").value = clickNum;
var timeStart;
document.getElementById("t03").value = timeStart;
var timeEnd;
var score = function(){
	var t = 100 - Math.floor((timeEnd - timeStart)/1000)  - clickNum;
	if(t<0) {return 0;}
	return t;
};
var button = document.getElementById("b01");
button.addEventListener("click", next);
function next(event){
	GAMESTAGE = true;
	addCircles();
	clickNum = 0;
	document.getElementById("t04").value = "";
	document.getElementById("t02").value = clickNum;
}
var currentCat;
var topGap = 60;
var leftGap = 25;
var p01 = new createjs.Bitmap("./pic/cotinuePic/p01.png");
var p02 = new createjs.Bitmap("./pic/cotinuePic/p02.png");
var p03 = new createjs.Bitmap("./pic/cotinuePic/p03.png");
var p04 = new createjs.Bitmap("./pic/cotinuePic/p04.png");
var p05 = new createjs.Bitmap("./pic/cotinuePic/p05.png");
var p06 = new createjs.Bitmap("./pic/cotinuePic/p06.png");
var myCat = new createjs.MovieClip(null,0,true,{start:0});
gameView.addChild(myCat);
var t = 60;
myCat.timeline.addTween(createjs.Tween.get(p01).to({alpha:100}).wait(t).to({alpha:0}).wait(5*t));
myCat.timeline.addTween(createjs.Tween.get(p05).to({alpha:0}).wait(t).to({alpha:100}).wait(t).to({alpha:0}).wait(4*t));
myCat.timeline.addTween(createjs.Tween.get(p06).to({alpha:0}).wait(2*t).to({alpha:100}).wait(t).to({alpha:0}).wait(3*t));
myCat.timeline.addTween(createjs.Tween.get(p03).to({alpha:0}).wait(3*t).to({alpha:100}).wait(t).to({alpha:0}).wait(2*t));
myCat.timeline.addTween(createjs.Tween.get(p04).to({alpha:0}).wait(4*t).to({alpha:100}).wait(t).to({alpha:0}).wait(t));
myCat.timeline.addTween(createjs.Tween.get(p02).to({alpha:0}).wait(5*t).to({alpha:100}).wait(t).to({alpha:0}));
myCat.scaleX = 0.76;
myCat.scaleY = 0.76;
myCat.regX = -30;
myCat.regY = 10;
myCat.gotoAndPlay("start");
var MOVE_NONE = -1,MOVE_LEFT = 0,MOVE_UP_LEFT = 1,MOVE_UP_RIGHT = 2,MOVE_RIGHT = 3,MOVE_DOWN_RIGHT = 4,MOVE_DOWN_LEFT = 5;
function getMoveDir(cat){
    var distanceMap = [];
    var can = true;
    for (var x = cat.indexX;x>=0;x--) {
        if(circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_LEFT] = cat.indexX - x;
            break;
        }
    }
    if(can){
        return MOVE_LEFT; 
    }
    can =true;
    var x = cat.indexX , y = cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_LEFT] = cat.indexY-y; 
            break;
        }
        if(y%2 == 0){
            x--;
        }
        y--;
        if(y<0 ||x<0){
            break;
        }
    }
    if(can){
        return MOVE_UP_LEFT;
    }
    can =true;
    var x = cat.indexX , y = cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_RIGHT] = cat.indexY-y; 
            break;
        }
        if(y%2 == 1){
            x++;
        }
        y--;
        if(y <0||x>8){
            break;
        }
    }
    if(can){
        return MOVE_UP_RIGHT;
    }
    can =true;
    for (var x= cat.indexX;x<9;x++) {
        if(circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED){
            can =false;
            distanceMap[MOVE_RIGHT] = x -cat.indexX;
            break;  
        }
    }
    if(can){
        return MOVE_RIGHT;
    }
    can = true;
    x= cat.indexX,y = cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can =false;
            distanceMap[MOVE_DOWN_RIGHT] = y -cat.indexY;
            break;
        }
        if(y%2 == 1){
            x++;
        }
        y++;
        if(y>8 ||x>8){
            break;
        }
    }
    if(can){
        return MOVE_DOWN_RIGHT;
    }
    can = true;
    x= cat.indexX,y = cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_DOWN_LEFT] = y -cat.indexY;///////////////////////////////////cat.index
            break;
        }
        if(y%2 == 0){
            x--;
        }
        y++;
        if(y>8 || x<0){
            break;
        }
    }
    if(can){
        return MOVE_DOWN_LEFT;
    }
    var maxDir = -1,maxValue = -1;
    for (var dir = 0;dir<distanceMap.length;dir++) {
        if(distanceMap[dir]>maxValue){
            maxValue = distanceMap[dir];
            maxDir = dir;
        }
    }
    if(maxValue > 1){
        return maxDir;
    }else{
        return MOVE_NONE;
    }
}
function circleClicked(event){
	
    if(event.target.getCircleType() != Circle.TYPE_CAT){
        event.target.setCircleType(Circle.TYPE_SELECTED);
    }else{
        return;
    }
	if(currentCat.indexX == 0 ||currentCat.indexX == 8 ||currentCat.indexY==0 ||currentCat.indexY==8){
				currentCat.setCircleType(Circle.TYPE_CAT);
				document.getElementById("t04").value = 0;
				gameView.removeChild(myCat);
				stage.update();
				GAMESTAGE = false;
				return;
	} else {
		clickNum++;
		document.getElementById("t02").value = clickNum;
	}
   
    var dir = getMoveDir(currentCat);
    switch (dir){
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX - 1][currentCat.indexY];   
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX- 1][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;          
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;  
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;  
        case MOVE_DOWN_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;  
        case MOVE_DOWN_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
        break;  
        default:
			document.getElementById("t04").value = score();
			stage.update();
			GAMESTAGE = false;
    }  
	myCat.x = currentCat.x - 93, myCat.y = currentCat.y - 100; 
}

function addCircles(){ 
    for (var indexY = 0; indexY <9;indexY++ ) {
        for (var indexX = 0;indexX<9;indexX++) {
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY%2?indexX*60+25 + leftGap:indexX*60 +leftGap;
            c.y = indexY * 60 + topGap;
            if(indexX == 4 && indexY == 4){
                c.setCircleType(3);
                currentCat = c;
				myCat.x = currentCat.x - 93, myCat.y = currentCat.y - 100;
            }else if(Math.random() <0.2){
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClicked);
        }
    }
	gameView.addChild(myCat);
	GAMESTAGE = true;
	timeStart = new Date().getTime();
}
addCircles();