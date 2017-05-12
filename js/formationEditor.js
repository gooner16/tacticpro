
var width = $(document.getElementById('container')).width();
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

//coordinates for default load
var defaultX = [1,2,3,1,2,3,1,2,3,1,2];
var defaultY = [1,2,3,4,1,2,3,4,1,2,3];

var layer = new Konva.Layer();

//https://konvajs.github.io/docs/sandbox/Drag_and_Drop_Multiple_Shapes.html

//make draggable player markers
for(var i = 0; i < 22; ++i) {
    if(i<11){
    	//draw away team
        var box = new Konva.Circle({
        	x: defaultX[i]*stage.getWidth() / 7,
      		y: defaultY[i]*stage.getHeight() / 5,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
            radius: stage.getWidth() / 50
        });
    }else{
    	//draw home team
    	var box = new Konva.Circle({
            x: (defaultX[i-11]*stage.getWidth() / 7) + (3/7)*stage.getWidth(),
      		y: defaultY[i-11]*stage.getHeight() / 5,
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