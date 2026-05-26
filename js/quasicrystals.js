var MAX_LAYERS = 128,
    dimPix = 0.4,
    layers = 7,
    canvas,
    quasicrystalShader,
    tempoFactor = 0.2,
    coloring = 1,
    gui,
    directionVectors = [],
    controls = {
        layers: 7,
        tempo: 0.2,
        coloring: 'Grayscale',
        quality: 1
    };

var orientationDelta = Math.PI / layers;

function preload() {
    quasicrystalShader = loadShader('js/quasicrystals.vert', 'js/quasicrystals.frag');
}

function syncParameters() {
    layers = controls.layers;
    tempoFactor = controls.tempo;
    coloring = controls.coloring === 'Spectrum' ? 2 : 1;
    orientationDelta = Math.PI / layers;
    rebuildLayerDirections();
    resizeRenderer();
}

function rebuildLayerDirections() {
    directionVectors = [];

    for (var i = 0; i < MAX_LAYERS; i++) {
        if (i < layers) {
            var orientation = i * orientationDelta;

            directionVectors.push(cos(orientation), sin(orientation));
        } else {
            directionVectors.push(0, 0);
        }
    }
}

function resizeRenderer() {
    var renderWidth = max(1, floor(windowWidth * controls.quality));
    var renderHeight = max(1, floor(windowHeight * controls.quality));

    resizeCanvas(renderWidth, renderHeight);
    canvas.elt.style.width = '100vw';
    canvas.elt.style.height = '100vh';
}

function setup() {
    pixelDensity(1);
    canvas = createCanvas(1, 1, WEBGL);
    canvas.parent('sketch');
    noStroke();
    syncParameters();

    gui = new lil.GUI({ title: 'Parameters' });
    gui.add(controls, 'layers', 1, 100, 1).name('Layers').onChange(syncParameters);
    gui.add(controls, 'tempo', 0.1, 1.0, 0.1).name('Tempo').onChange(syncParameters);
    gui.add(controls, 'coloring', ['Grayscale', 'Spectrum']).name('Palette').onChange(syncParameters);
    gui.add(controls, 'quality', 0.5, 1.0, 0.05).name('Render Scale').onChange(syncParameters);
}

function windowResized() {
    resizeRenderer();
}

function draw() {
    shader(quasicrystalShader);
    quasicrystalShader.setUniform('uResolution', [width, height]);
    quasicrystalShader.setUniform('uTime', frameCount * tempoFactor);
    quasicrystalShader.setUniform('uDimPix', dimPix);
    quasicrystalShader.setUniform('uLayerCount', layers);
    quasicrystalShader.setUniform('uColoring', coloring);
    quasicrystalShader.setUniform('uDirections', directionVectors);

    rect(0, 0, width, height);
}
