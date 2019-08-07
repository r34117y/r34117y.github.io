function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    walker = new Walker();
}

var Walker = function() {
    this.x = window.width/2;
    this.y = window.height/2;
    this.dx = 3;
    this.dy = 3;
};

Walker.prototype.display = function() {
    //stroke(0, 0, 0);
    noStroke();
    fill(255,0,0);
    ellipse(this.x, this.y, 5,5);
};

// Randomly move right, left, down, or up
Walker.prototype.walk = function() {
    var choice = Math.floor(Math.random() * 4);
    if (choice === 0) {
        //move right
        this.x += this.dx;
    } else if (choice === 1) {
        //move left
        this.x -= this.dx;
    } else if (choice === 2) {
        //move down
        this.y += this.dy;
    } else {
        //move up
        this.y -= this.dy;
    }
};

Walker.prototype.randomize = function() {
    this.dx = Math.floor(Math.random() * 10);
    this.dy = Math.floor(Math.random() * 10);
}

draw = function() {
    walker.randomize();
    walker.walk();
    walker.display();
};

function mousePressed(){
    setup();
}
