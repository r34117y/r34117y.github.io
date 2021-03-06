let walker;

function Walker (x, y, options) {
    options = options || {}
    /**
     * Co robić, kiedy walker dojdzie do krawędzi:
     * - closed: wyświetlić po drugiej stronie
     * - reflect: zmienić kierunek
     * - none: pozwolić na wyjście z canvasa
     */
    this.edgeBehavior = options.edgeBehavior || 'closed'
    this.figure = options.figure || 'point'
    this.x = x;
    this.y = y;
    this.dx = options.dx || 1;
    this.dy = options.dy || 1;
    /** RGB */
    this.r = options.r || 255 / 2;
    this.g = options.g || 255 / 2;
    this.b = options.b || 255 / 2;
    this.dr = options.dr || 1;
    this.dg = options.dg || 1;
    this.db = options.db || 1;

    this.strokeWeight = options.strokeWeight || 2
    this.draw = function () {
        stroke(this.r, this.g, this.b);
        strokeWeight(this.strokeWeight);
        switch (this.figure) {
            case "point":
                point(this.x, this.y);
                break;
            case "circle":
                circle(this.x, this.y, 20)
        }
        point(this.x, this.y);
        this.setNextPosition();
        this.setNextRGB();
    }
    this.setNextPosition = function () {
        var x = this.x,
            y = this.y;
        const rand = floor(random(4));
        switch (rand) {
            case 0:
                x = x + this.dx;
                break;
            case 1:
                x = x - this.dx;
                break;
            case 2:
                y = y + this.dy;
                break;
            case 3:
                y = y - this.dy;
                break;
        }
        if (this.edgeBehavior === 'closed') {
            if (x > width) {
                x = 0;
            } else if (x < 0) {
                x = width;
            }
            if (y > height) {
                y = 0;
            } else if (y < 0) {
                y = height;
            }
        } else if (this.edgeBehavior === 'reflect') {
            x = constrain(x, 0, width);
            y = constrain(y, 0, height);
        }
        this.x = x;
        this.y = y;
    }
    this.setNextRGB = function () {
        const rand = floor(random(6));
        switch (rand) {
            case 0:
                this.r += this.dr;
                break;
            case 1:
                this.r -= this.dr;
                break;
            case 2:
                this.g += this.dg;
                break;
            case 3:
                this.g -= this.dg;
                break;
            case 4:
                this.b += this.db;
                break;
            case 5:
                this.b -= this.db;
                break;
        }
        this.r = constrain(this.r, 0, 255);
        this.g = constrain(this.g, 0, 255);
        this.b = constrain(this.b, 0, 255);
    }
}

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch');
    walker = new Walker(width / 2, height / 2, {figure:'circle'})
    background(51);
}

function draw() {
    walker.draw();
}