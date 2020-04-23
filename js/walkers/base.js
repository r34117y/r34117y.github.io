let x;
let y;
let visited =[];

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch');
    x = width / 2;
    y = height / 2;
    background(51);
}

function getMove(xx, yy) {
    const r = floor(random(4));
    switch (r) {
        case 0:
            xx = xx + 1;
            break;
        case 1:
            xx = xx - 1;
            break;
        case 2:
            yy = yy + 1;
            break;
        case 3:
            yy = yy - 1;
            break;
    }

    return [xx, yy]
}

function draw() {
    stroke(255, 100);
    strokeWeight(1);
    point(x, y);
    visited.push([x,y]);
    var newXY = getMove(x,y)
    while (visited.includes(newXY)) {
        newXY = getMove();
    }
    x = newXY[0];
    y = newXY[1];
}