var dimPix = 0.4,
    layers = 7,
    xPixMax,
    yPixMax,
    slider,
    tempoSlider,
    canvas,
    sums = [],
    tempoFactor = 0.2,
    coloring = 1;

var orientationDelta = Math.PI / layers;


function setup() {
    canvas = createCanvas(200, 200);
    canvas.parent('sketch');
    background(0); // białe tło

    slider = createSlider(1, 100, 7, 1);
    slider.parent('controls');
    slider.input(function () {
        layers = slider.value();
    });

    tempoSlider = createSlider(0.1, 1.0, 0.2, 0.1);
    tempoSlider.parent('controls');
    tempoSlider.input(function () {
        tempoFactor = tempoSlider.value();
    });

    colorSlider = createSlider(1, 2, 1, 1);
    colorSlider.parent('controls');
    colorSlider.input(function () {
        coloring = colorSlider.value();
    });

    xPixMax = width / 2;
    yPixMax = height / 2;
    //xPixMax = width;
    //yPixMax = height;

    //ładuje piksele do tablicy pixels
    //jest to płaska tablica o długości 4*ilość pikseli
    //R,G,B,alfa (?)
    loadPixels();
}

function draw() {
    //frameCont zawiera liczbę wyświetlonych klatek od uruchomienia
    //z tego będzie brany cosinus, więc jest to jakby niezależna przechodząca fala
    var tempo = frameCount * tempoFactor;

    var iPix = 0;
    for (var yPix = -yPixMax; yPix < yPixMax; yPix++) {
        var y = yPix * dimPix;

        //iPix += 4, bo tablica pixels jest płaska
        //foreach pixel:
        for (var xPix = -xPixMax; xPix < xPixMax; xPix++, iPix += 4) {
            var x = xPix * dimPix;

            var orientation = 0.0,
                sinus,
                current,
                cosinus,
                sum = 0;

            for (var i = 0; i < layers; i++) {
                // sin(0) = sin(PI) = sin(2*PI) = 0, sin(PI/2) = 1, sin(3*PI/2) = -1
                // cos przesunięty o PI/2
                // zakres: [-1,1]
                sinus = sin(orientation);
                cosinus = cos(orientation);
                sum += (cos(cosinus * x + sinus * y + tempo) + 1.0) / 2.0; //zakres [0,1]
                orientation += orientationDelta;
            }
            // sums - zakres [0,layers-1]

            var integerSum = floor(sum);
            var decimalSum = sum - integerSum;
            //sum = (integerSum % 2) === 0 ? 1 : 0;

            switch (coloring) {
                case 1:
                    sum = (integerSum % 2) === 0 ? decimalSum : 1.0 - decimalSum;
                    coloringGray(sum, iPix);
                    break;
                case 2:
                    sum = decimalSum;
                    coloringRgb(sum, iPix);
                    break;
            }
        }
    }
    updatePixels();
}

function coloringGray(sum, iPix) {
    var grey = sum * 256;
    pixels[iPix] = grey;
    pixels[iPix + 1] = grey;
    pixels[iPix + 2] = grey;
}

function coloringRgb(sum, iPix) {
    var grey = sum * 256;
    if (sum < (1 / 2)) {
        pixels[iPix] = grey;
        pixels[iPix + 1] = 0;
        pixels[iPix + 2] = 0;
    } else if (sum < (3/4)) {
        pixels[iPix] = 0;
        pixels[iPix + 1] = grey;
        pixels[iPix + 2] = 0;
    } else {
        pixels[iPix] = 0;
        pixels[iPix + 1] = 0;
        pixels[iPix + 2] = grey;
    }
}