let x, y; //current position of turtle;
let thestring = 'A';
let numloops = 5;

let currentangle = 0; // which way the turtle is pointing
let step = 20; // how much the turtle moves with each 'F'
let angle = 90; // how much the turtle turns with a '-' or '+'

let therules = [['A', '-BF+AFA+FB-'], ['B', '+AF-BFB-FA+']];
let whereinstring = 0; // where in the L-system are we?

function setup() {
    createCanvas(710,400);
    background(255);
    stroke(0,0,0,255)
    x = 0;
    y = height - 1;

    for (let i = 0; i < numloops; i++) {
        thestring = lindenmayer(thestring);
    }
}

function draw() {

    // draw the current character in the string:
    drawIt(thestring[whereinstring]);

    // increment the point for where we're reading the string.
    // wrap around at the end.
    whereinstring++;
    if (whereinstring > thestring.length-1) whereinstring = 0;

}

function lindenmayer(s) {
    let outputstring = '';
    for (let i = 0; i < s.length; i++) {
        let ismatch = 0; // by default, no match
        for (let j = 0; j < therules.length; j++) {
            if (s[i] == therules[j][0])  {
                outputstring += therules[j][1]; // write substitution
                ismatch = 1; // we have a match, so don't copy over symbol
                break; // get outta this for() loop
            }
        }
        // if nothing matches, just copy the symbol over.
        if (ismatch == 0) outputstring+= s[i];
    }

    return outputstring; // send out the modified string
}

function drawIt(k) {

    if (k=='F') { // draw forward
        // polar to cartesian based on step and currentangle:
        let x1 = x + step*cos(radians(currentangle));
        let y1 = y + step*sin(radians(currentangle));
        line(x, y, x1, y1); // connect the old and the new

        // update the turtle's position:
        x = x1;
        y = y1;
    } else if (k == '+') {
        currentangle += angle; // turn left
    } else if (k == '-') {
        currentangle -= angle; // turn right
    }

    // give me some random color values:
    let r = random(128, 255);
    let g = random(0, 192);
    let b = random(0, 50);
    let a = random(50, 100);

    // pick a gaussian (D&D) distribution for the radius:
    let radius = 0;
    radius += random(0, 15);
    radius += random(0, 15);
    radius += random(0, 15);
    radius = radius / 3;

    // draw the stuff:
    fill(r, g, b, a);
    ellipse(x, y, radius, radius);
}