let walker;

function Walker (x, y, options) {
    options = options || {}
    this.x = x;
    this.y = y;
    this.dx = options.dx || 1;
    this.dy = options.dy || 1;
    /** RGB */
    this.r = options.r || 255;
    this.g = options.g || 255;
    this.b = options.b || 255;

    this.strokeWeight = options.strokeWeight || 2
    this.draw = function () {
        stroke(this.r, this.g, this.b);
        strokeWeight(this.strokeWeight);
        point(this.x, this.y);
        var newXY = this.getNextPosition()
        this.x = newXY[0];
        this.y = newXY[1];
    }
    this.getNextPosition = function () {
        const r = floor(random(4));
        switch (r) {
            case 0:
                x = this.x + this.dx;
                break;
            case 1:
                x = this.x - this.dx;
                break;
            case 2:
                y = this.y + this.dy;
                break;
            case 3:
                y = this.y - this.dy;
                break;
        }
        return [x,y];
    }
}

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch');
    walker = new Walker(width / 2, height / 2)
    background(51);
}

function draw() {
    walker.draw();
}