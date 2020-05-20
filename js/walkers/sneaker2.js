var snake, food;

function Snake(x, y) {
    this.size = 10;
    this.direction = 'right';
    this.x = x || 0;
    this.y = y || height / 2;
    this.segments = [];
    this.initSegments = function () {
        var segment;
        for (let i = 0; i < 10; i++) {
            segment = new Segment(this.x + i * this.size, this.y)
            this.segments.push(segment);
        }
    }
    this.updateSegments = function () {
        var l = this.segments.length;
        for (let i = 0; i < l - 1; i++) {
            this.segments[i] = this.segments[i + 1];
        }
        this.segments[l-1] = new Segment(this.segments[l - 1]['x'], this.segments[l - 1]['y'])
        switch (this.direction) {
            case 'right':
                this.segments[l - 1]['x'] = this.segments[l - 2]['x'] + this.size;
                this.segments[l - 1]['y'] = this.segments[l - 2]['y'];
                if (this.segments[l - 1]['x'] > width) {
                    this.segments[l - 1]['x'] = 0;
                }
                break;
            case 'up':
                this.segments[l - 1]['x'] = this.segments[l - 2]['x'];
                this.segments[l - 1]['y'] = this.segments[l - 2]['y'] - this.size;
                if (this.segments[l - 1]['y'] < 0) {
                    this.segments[l - 1]['y'] = height;
                }
                break;
            case 'left':
                this.segments[l - 1]['x'] = this.segments[l - 2]['x'] - this.size;
                this.segments[l - 1]['y'] = this.segments[l - 2]['y'];
                if (this.segments[l - 1]['x'] < 0) {
                    this.segments[l - 1]['x'] = width;
                }
                break;
            case 'down':
                this.segments[l - 1]['x'] = this.segments[l - 2]['x'];
                this.segments[l - 1]['y'] = this.segments[l - 2]['y'] + this.size;
                if (this.segments[l - 1]['y'] > height) {
                    this.segments[l - 1]['y'] = 0;
                }
                break;
        }
    }
    this.draw = function () {
        for (let i = 0; i < this.segments.length - 1; i++) {
            if (
                Math.abs(this.segments[i]['x'] - this.segments[i+1]['x']) === this.size
                || Math.abs(this.segments[i]['y'] - this.segments[i+1]['y']) === this.size
            ) {
                this.segments[i].draw(this.segments[i+1]);
            }
        }
    }
    this.checkGameStatus = function() {
        if (this.checkSnakeCollision()) {
            noLoop();
            alert("YOU LOOSE")
        }
    }
    this.checkSnakeCollision = function () {
        const l = this.segments.length;
        const snakeHead = this.segments[l-1];
        for (let i = 0; i < l - 1; i++) {
            if (this.segments[i]['x'] === snakeHead['x'] && this.segments[i]['y'] === snakeHead['y']) {
                return true;
            }
        }
    }
    this.tryEatFood = function () {
        const l = this.segments.length;
        if (this.segments[l - 1]['x'] === food.x
            && this.segments[l - 1]['y'] === food.y
        ) {
            this.segments.unshift(this.segments[0]);
            food.updateCoordinates();
        }
    }
}

function Food() {
    this.x = undefined;
    this.y = undefined;
    this.updateCoordinates = function () {
        this.x = floor(random(10, (width - 100) / 10)) * 10;
        this.y = floor(random(10, (height - 100) / 10)) * 10;
    }
    this.draw = function () {
        point(this.x, this.y)
    }
}

function Segment(x,y) {
    this.x = x
    this.y = y
    this.size = 10;
    this.setColor = function () {
        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
    }
    this.draw = function (nextSegment) {
        this.setColor();
        stroke(this.r, this.g, this.b);
        line(this.x, this.y, nextSegment.x, nextSegment.y);
    }
}

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch');
    frameRate(15);
    stroke(255);
    strokeWeight(10);

    food = new Food();
    food.updateCoordinates()

    snake = new Snake()
    snake.initSegments()
}

function draw() {
    if (! paused) {
        background(24);
        food.draw()
        snake.draw();
        snake.updateSegments();
        snake.checkGameStatus();
        snake.tryEatFood();
    }
}

function keyPressed() {
    switch (keyCode) {
        case 37:
            if (snake.direction !== 'right') {
                snake.direction = 'left';
            }
            break;
        case 39:
            if (snake.direction !== 'left') {
                snake.direction = 'right';
            }
            break;
        case 38:
            if (snake.direction !== 'down') {
                snake.direction = 'up';
            }
            break;
        case 40:
            if (snake.direction !== 'up') {
                snake.direction = 'down';
            }
            break;
    }
}

var resetBtn = document.getElementById('btn-reset');
resetBtn.addEventListener('click', function () {
    clear()
    pause = false;
    food = new Food();
    food.updateCoordinates()

    snake = new Snake()
    snake.initSegments()
});