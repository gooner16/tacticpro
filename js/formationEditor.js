//TODO: add colour changer
//more formations 343 41212 4231  fals9 532
//move coords to json
//save formations
//scale players dynamically
//fix null name error

//coordinates for default load
var defaultHome = [];
var defaultAway = [];
var defaultLabels = [];
for (var i = 0; i < 22; ++i) {
    defaultLabels.push(i.toString());
}

//example coords for testing -> move to a json with all formations
var fourThreeThreeHomeX = [0.5, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3];
var fourThreeThreeAwayX = [3.5, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
var fourThreeThreeY = [2.5, 1, 2, 3, 4, 1.5, 2.5, 3.5, 1.5, 2.5, 3.5];
var threeFiveTwoHomeX = [0.5, 1.2, 1.2, 1.2, 2.2, 2, 2, 2, 2.2, 3, 3];
var threeFiveTwoAwayX = [3.5, 2.8, 2.8, 2.8, 1.8, 2, 2, 2, 1.8, 1, 1];
var threeFiveTwoY = [2.5, 1, 2.5, 4, 0.5, 1.5, 2.5, 3.5, 4.5, 2, 3];
var fourFourTwoHomeX = [0.5, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3];
var fourFourTwoAwayX = [3.5, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1];
var fourFourTwoY = [2.5, 1, 2, 3, 4, 1, 2, 3, 4, 2, 3];

//define stage size
var width = $(document.getElementById('container')).width();
var height = window.innerHeight;

//create stage
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

//1 for home 0 for away coords
function makePlayerCoords(xCoords, yCoords, homeOrAway) {
    if (homeOrAway) {
        defaultHome = [];
        //create default home coordinates
        for (var i = 0; i < 11; ++i) {
            var coords = {
                x: xCoords[i],
                y: yCoords[i]
            };
            defaultHome.push(coords);
        }
    } else {
        defaultAway = [];
        //create default away coordinates
        for (var i = 0; i < 11; ++i) {
            var coords = {
                x: xCoords[i],
                y: yCoords[i]
            };
            defaultAway.push(coords);
        }
    }
}

//draws home and away players
//https://konvajs.github.io/docs/sandbox/Drag_and_Drop_Multiple_Shapes.html
function drawPlayers() {
    var layer = new Konva.Layer();
    //make draggable player markers
    for (var i = 0; i < 22; ++i) {
        if (i < 11) {
            //draw home team

            // create label
            var label = new Konva.Label({
                x: defaultHome[i].x * stage.getWidth() / 7,
                y: defaultHome[i].y * stage.getHeight() / 5,
                draggable: true
            });

            // add a tag to the label
            label.add(new Konva.Circle({
                fill: "red",
                stroke: "black",
                strokeWidth: 4,
                draggable: false,
                radius: stage.getWidth() / 50
            }));

        } else {
            //draw away team
            // create label
            var label = new Konva.Label({
                x: (defaultAway[i - 11].x * stage.getWidth() / 7) + (3 / 7) * stage.getWidth(),
                y: defaultAway[i - 11].y * stage.getHeight() / 5,
                draggable: true
            });

            // add a tag to the label
            label.add(new Konva.Circle({
                fill: "blue",
                stroke: "black",
                strokeWidth: 4,
                draggable: false,
                radius: stage.getWidth() / 50
            }))
        }

        // add text to the label
        label.add(new Konva.Text({
            text: defaultLabels[i],
            fontSize: 20,
            lineHeight: 1.2,
            offsetX: stage.getWidth() / 50,
            offsetY: -stage.getWidth() / 50,
            padding: 0,
            fill: 'white'
        }));

        //action when dragging
        label.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });
        label.on("dragmove", function() {
            document.body.style.cursor = "pointer";
        });
        /*
         * dblclick for desktop app
         * and dbltap for mobile app
         */
        label.on("dblclick dbltap", function() {
            //Ask for label with user prompt
            var oldLabel = this.getText().text();
            var indexToChange = defaultLabels.indexOf(oldLabel);
            var playerLabel = prompt("Change the label:", oldLabel);

            //make the change
            this.getText().text(playerLabel);
            //save change
            defaultLabels[indexToChange] = playerLabel;

            layer.draw();
        });
        label.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        label.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        //layer.add(box);
        layer.add(label);
    }
    // add the layer to the stage
    stage.add(layer);
}


//functions for buttons to change formations for each side individually
function draw352Home() {
    stage.clear();
    makePlayerCoords(threeFiveTwoHomeX, threeFiveTwoY, 1);
    drawPlayers();
}

function draw352Away() {
    stage.clear();
    makePlayerCoords(threeFiveTwoAwayX, threeFiveTwoY, 0);
    drawPlayers();
}

function draw433Home() {
    stage.clear();
    makePlayerCoords(fourThreeThreeHomeX, fourThreeThreeY, 1);
    drawPlayers();
}

function draw433Away() {
    stage.clear();
    makePlayerCoords(fourThreeThreeAwayX, fourThreeThreeY, 0);
    drawPlayers();
}

function draw442Home() {
    stage.clear();
    makePlayerCoords(fourFourTwoHomeX, fourFourTwoY, 1);
    drawPlayers();
}

function draw442Away() {
    stage.clear();
    makePlayerCoords(fourFourTwoAwayX, fourFourTwoY, 0);
    drawPlayers();
}

//draw default
//default to 442
function defaultFormation() {
    makePlayerCoords(fourFourTwoHomeX, fourFourTwoY, 1);
    makePlayerCoords(fourFourTwoAwayX, fourFourTwoY, 0);
    drawPlayers();
}

defaultFormation();