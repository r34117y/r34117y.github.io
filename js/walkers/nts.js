let x;
let y;
let maxx = 0;
let maxy = 0;
let visited = {};

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

    return {'x': xx, 'y': yy}
}

function draw() {
    stroke(255, 100);
    strokeWeight(5);
    point(x, y);
    if (typeof visited[x] === 'undefined') {
        visited[x] = [];
    }
    visited[x].push(y);

    var newXY = getMove(x,y)
    if (typeof visited[newXY.x] === 'undefined') {
        visited[newXY.x] = []
    }
    while (visited[newXY.x].includes(newXY.y)) {
        newXY = getMove(x,y);
        if (typeof visited[newXY.x] === 'undefined') {
            visited[newXY.x] = []
        }
    }
    x = newXY.x;
    y = newXY.y;
}