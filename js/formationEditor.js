var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
//i dont like this its bad
var homex = [width-width/7,width-2*width/7,width-3*width/7,width-width/7,width-2*width/7,width-3*width/7,width-width/7,width-2*width/7,width-3*width/7,width-width/7,width-2*width/7]
var awayx = [width/7,2*width/7,3*width/7,width/7,2*width/7,3*width/7,width/7,2*width/7,3*width/7,width/7,2*width/7]
var homey = [height-height/5, height-2*height/5,height-3*height/5, height-4*height/5,height-height/5, height-2*height/5,height-3*height/5, height-4*height/5,height-height/5, height-2*height/5,height-3*height/5]
var layer = new Konva.Layer();

//why not 1 loop?
//make away team
var color = "red";
for(var i = 0; i < 11; i++) {
    var box = new Konva.Circle({
        x: awayx[i],
        y: homey[i],
        fill: color,
        stroke: "black",
        strokeWidth: 4,
        draggable: true,
        width: 100,
        height: 50
    });
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

//make home team
var color = "blue";
for(var i = 0; i < 11; i++) {
  var box = new Konva.Circle({
      x: homex[i],
      y: homey[i],
      fill: color,
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
      width: 100,
      height: 50
  });
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