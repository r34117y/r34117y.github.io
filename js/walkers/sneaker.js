var snake, food;

function Snake() {
    this.segments = 10;
    this.size = 10;
    this.direction = 'right';
    this.x = 0;
    this.y = height / 2;
    this.segmentsX = [];
    this.segmentsY = []
    this.initSegments = function () {
        for (let i = 0; i < this.segments; i++) {
            this.segmentsX.push(this.x + i * this.size);
            this.segmentsY.push(this.y);
        }
    }
    this.updateSegments = function () {
        for (let i = 0; i < this.segments - 1; i++) {
            this.segmentsX[i] = this.segmentsX[i + 1];
            this.segmentsY[i] = this.segmentsY[i + 1];
        }
        switch (this.direction) {
            case 'right':
                this.segmentsX[this.segments - 1] = this.segmentsX[this.segments - 2] + this.size;
                this.segmentsY[this.segments - 1] = this.segmentsY[this.segments - 2];
                break;
            case 'up':
                this.segmentsX[this.segments - 1] = this.segmentsX[this.segments - 2];
                this.segmentsY[this.segments - 1] = this.segmentsY[this.segments - 2] - this.size;
                break;
            case 'left':
                this.segmentsX[this.segments - 1] = this.segmentsX[this.segments - 2] - this.size;
                this.segmentsY[this.segments - 1] = this.segmentsY[this.segments - 2];
                break;
            case 'down':
                this.segmentsX[this.segments - 1] = this.segmentsX[this.segments - 2];
                this.segmentsY[this.segments - 1] = this.segmentsY[this.segments - 2] + this.size;
                break;
        }
    }
    this.draw = function () {
        for (let i = 0; i < this.segments - 1; i++) {
            line(this.segmentsX[i], this.segmentsY[i], this.segmentsX[i + 1], this.segmentsY[i + 1]);
        }
    }
    this.checkGameStatus = function() {
        if (
            this.segmentsX[this.segmentsX.length - 1] > width ||
            this.segmentsX[this.segmentsX.length - 1] < 0 ||
            this.segmentsY[this.segmentsY.length - 1] > height ||
            this.segmentsY[this.segmentsY.length - 1] < 0 ||
            this.checkSnakeCollision()
        ) {
            noLoop();
            alert("YOU LOOSE")
        }
    }
    this.checkSnakeCollision = function () {
        const snakeHeadX = this.segmentsX[this.segmentsX.length - 1];
        const snakeHeadY = this.segmentsY[this.segmentsY.length - 1];
        for (let i = 0; i < this.segmentsX.length - 1; i++) {
            if (this.segmentsX[i] === snakeHeadX && this.segmentsY[i] === snakeHeadY) {
                return true;
            }
        }
    }
    this.tryEatFood = function () {
        if (this.segmentsX[this.segmentsX.length - 1] === food.x
            && this.segmentsY[this.segmentsY.length - 1] === food.y
        ) {
            this.segmentsX.unshift(this.segmentsX[0]);
            this.segmentsY.unshift(this.segmentsY[0]);
            this.segments++;
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
    background(0);
    food.draw()
    snake.draw();
    snake.updateSegments();
    snake.checkGameStatus();
    snake.tryEatFood();
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
