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
    /** Pozycje */
    this.lineLength = 11;
    this.x1 = x || width /2;
    this.y1 = y || height /2;
    this.x2 = this.x1;
    this.y2 = this.y1 + this.lineLength;

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
        line(this.x1, this.y1, this.x2, this.y2)
        this.setNextPosition();
        this.setNextRGB();
    }
    this.setNextPosition = function () {
        this.x1 = this.x2;
        this.y1 = this.y2;

        const rand = floor(random(4));
        switch (rand) {
            case 0:
                this.y2 += this.lineLength;
                break;
            case 1:
                this.x2 += this.lineLength;
                break;
            case 2:
                this.y2 -= this.lineLength;
                break;
            case 3:
                this.x2 -= this.lineLength
                break;
        }
        if (this.edgeBehavior === 'closed') {
            var delta;
            if (this.x2 > width) {
                delta = this.x2 - width;
                this.x2 = 0;
            } else if (this.x2 < 0) {
                this.x2 = width;
            }
            if (this.y2 > height) {
                this.y2 = 0;
            } else if (this.y2 < 0) {
                this.y2 = height;
            }
        } else if (this.edgeBehavior === 'reflect') {
            this.x2 = constrain(this.x2, 0, width);
            this.y2 = constrain(this.y2, 0, height);
        }
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