var img = "";
var status = "";
var objectDetector = "";
var objects = [];

function preload() {
    img = loadImage("ffruit.jpg");
}

function setup() {
    var canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("detected").innerHTML = "There is 4 big object in this image, out of which the CoCoSSD Model detected " + objects.length + " object.";
            
            fill("#ff0000");
            var percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + -15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y + -30, objects[i].width, objects[i].height + -90);
            console.log("Drawn");
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
    }
    objects = results;
}