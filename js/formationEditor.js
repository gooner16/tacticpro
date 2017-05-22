//coordinates for default load
var defaultHome = [];
var defaultAway = [];

//define stage size
var width = $(document.getElementById('container')).width();
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

//example coords for testing -> move to a json with all formations
var fourThreeThreeHomeX = [0.5,1,1,1,1,2,2,2,3,3,3];
var fourThreeThreeAwayX = [3.5,3,3,3,3,2,2,2,1,1,1];
var fourThreeThreeY = [2.5,1,2,3,4,1.5,2.5,3.5,1.5,2.5,3.5];
var threeFiveTwoHomeX = [0.5,1.2,1.2,1.2,2.2,2,2,2,2.2,3,3];
var threeFiveTwoAwayX = [3.5,2.8,2.8,2.8,1.8,2,2,2,1.8,1,1];
var threeFiveTwoY = [2.5,1,2.5,4,0.5,1.5,2.5,3.5,4.5,2,3];
var fourFourTwoHomeX = [0.5,1,1,1,1,2,2,2,2,3,3];
var fourFourTwoAwayX = [3.5,3,3,3,3,2,2,2,2,1,1];
var fourFourTwoY = [2.5,1,2,3,4,1,2,3,4,2,3];

//1 for home 0 for away coords
function makePlayerCoords(xCoords, yCoords, homeOrAway){
    if(homeOrAway){
        defaultHome = [];
        //create default home coordinates
        for(var i = 0; i < 11; ++i){
			var coords = {
				x:xCoords[i],
				y:yCoords[i]
			};
            defaultHome.push(coords);
        }
    }else{
        defaultAway = [];
        //create default away coordinates
        for(var i = 0; i < 11; ++i){
            var coords = {
				x:xCoords[i],
				y:yCoords[i]
			};
            defaultAway.push(coords);
        }
    }   
}

//default to 442
makePlayerCoords(fourThreeThreeHomeX, fourThreeThreeY, 1);
makePlayerCoords(fourThreeThreeAwayX, fourThreeThreeY, 0);
//https://konvajs.github.io/docs/sandbox/Drag_and_Drop_Multiple_Shapes.html

function drawPlayers() {
	var layer = new Konva.Layer();
	//make draggable player markers
	for(var i = 0; i < 22; ++i) {
		if(i<11){
			//draw home team
			var box = new Konva.Circle({
				x: defaultHome[i].x*stage.getWidth() / 7,
				y: defaultHome[i].y*stage.getHeight() / 5,
				fill: "red",
				stroke: "black",
				strokeWidth: 4,
				draggable: true,
				radius: stage.getWidth() / 50
			});
		}else{
			//draw away team
			var box = new Konva.Circle({
				x: (defaultAway[i-11].x*stage.getWidth() / 7) + (3/7)*stage.getWidth(),
				y: defaultAway[i-11].y*stage.getHeight() / 5,
				fill: "blue",
				stroke: "black",
				strokeWidth: 4,
				draggable: true,
				radius: stage.getWidth() / 50
			});
		}

		box.on("dragstart", function() {
			this.moveToTop();
			layer.draw();
		});
		box.on("dragmove", function() {
			document.body.style.cursor = "pointer";
		});
		/*
		* dblclick to remove box for desktop app
		* and dbltap to remove box for mobile app
		*/
		box.on("dblclick dbltap", function() {
			this.destroy();
			layer.draw();
		});
		box.on("mouseover", function() {
			document.body.style.cursor = "pointer";
		});
		box.on("mouseout", function() {
			document.body.style.cursor = "default";
		});
		layer.add(box);
	}
	// add the layer to the stage
	stage.add(layer);
}

function draw352Home(){
	stage.clear();
	makePlayerCoords(threeFiveTwoHomeX, threeFiveTwoY, 1);
	drawPlayers();
}

function draw352Away(){
	stage.clear();
	makePlayerCoords(threeFiveTwoAwayX, threeFiveTwoY, 0);
	drawPlayers();
}

function draw433Home(){
	stage.clear();
	makePlayerCoords(fourThreeThreeHomeX, fourThreeThreeY, 1);
	drawPlayers();
}

function draw433Away(){
	stage.clear();
	makePlayerCoords(fourThreeThreeAwayX, fourThreeThreeY, 0);
	drawPlayers();
}

function draw442Home(){
	stage.clear();
	makePlayerCoords(fourFourTwoHomeX, fourFourTwoY, 1);
	drawPlayers();
}

function draw442Away(){
	stage.clear();
	makePlayerCoords(fourFourTwoAwayX, fourFourTwoY, 0);
	drawPlayers();
}

