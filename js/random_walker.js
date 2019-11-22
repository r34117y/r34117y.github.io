var w,
    board,
    rows,
    colums;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    w = 20;
    columns = floor(width/w);
    rows = floor(height/w);
    board = new Array(columns);

    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }

    walker = new Walker();
}

var Walker = function() {
    this.x = floor(colums / 2);
    this.y = floor(rows / 2);
    this.dx = 1;
    this.dy = 1;
};

Walker.prototype.display = function() {
    //noStroke();
    //fill(255,0,0);
    //ellipse(this.x, this.y, 5,5);

    background(255);

    for ( let i = 0; i < columns;i++) {
        for ( let j = 0; j < rows;j++) {
            if ((board[i][j] === 1)) fill(0);
            else fill(255);
            stroke(0);
            rect(i * w, j * w, w-1, w-1);
        }
    }
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

    board[this.x][this.y] = 1;
};

Walker.prototype.randomize = function() {
    this.dx = Math.floor(Math.random() * 10);
    this.dy = Math.floor(Math.random() * 10);
}

draw = function() {
    //walker.randomize();
    walker.walk();
    walker.display();
};

function mousePressed(){
    setup();
}
