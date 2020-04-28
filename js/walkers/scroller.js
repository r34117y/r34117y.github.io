var bgImg;
var x1 = 0;
var x2;

var scrollSpeed = 1;

function preload(){
    bgImg = loadImage("../img/rw.png");
}

function setup() {
    var canvas = createCanvas(301, 345);
    canvas.parent('sketch');
    x2 = width;
}

function draw() {
    clear()
    image(bgImg, x1, 0, width, height);
    image(bgImg, x2, 0, width, height);

    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    if (x1 < -width){
        x1 = width;
    }
    if (x2 < -width){
        x2 = width;
    }

}