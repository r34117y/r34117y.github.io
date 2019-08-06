// A test of creating Cycloids with the p5.js library
// JoeJ1
// 24/02/2018

// A Cycloid is the line drawn by a circle as it rolls.

let pos;
let t;
let r;

function setup() {
    t = 0;
    createCanvas(window.innerWidth, window.innerHeight);
    background(20);
    r = height * 0.1;
    r2 = height * 0.2;
    pos = [
        [-5, height - r * 2]
    ];
}

function draw() {
    if (pos[pos.length - 1][0] < width + r*2) {
        background(20);
        t += 0.01;
        pos.push([r * (t - cos(t)), r * (1 - sin(t)) + height - (r * 2)])
        pos.push([r2 * (t - cos(t)), r2 * (1 - sin(t)) + height - (r2 * 2)])
        stroke(255);
        for (let i = 1; i < pos.length; i++) {
            line(pos[i - 1][0], pos[i - 1][1], pos[i][0], pos[i][1]);
        }
        cx = r * t;
        cx2 = r2 * t;
        cy = r + height - r * 2;
        cy2 = r2 + height - r2 * 2;

        ellipseMode(RADIUS);
        stroke(0, 255, 0);
        noFill();
        ellipse(cx, cy, r, r); //left, top, r1, r2 - rysuje elipsę
        ellipse(cx2, cy2, r2, r2);

        stroke(255, 0, 0);
        line(cx, cy, pos[pos.length - 1][0], pos[pos.length - 1][1])
        line(cx2, cy2, pos[pos.length - 1][0], pos[pos.length - 1][1])
    }
}

function mousePressed(){
    setup();
}
