precision highp float;

#define MAX_LAYERS 128

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDimPix;
uniform int uLayerCount;
uniform int uColoring;
uniform vec2 uDirections[MAX_LAYERS];

void main() {
    vec2 centered = (vTexCoord - 0.5) * uResolution * uDimPix;
    float sum = 0.0;

    for (int i = 0; i < MAX_LAYERS; i++) {
        if (i >= uLayerCount) {
            break;
        }

        vec2 direction = uDirections[i];
        sum += (cos(dot(direction, centered) + uTime) + 1.0) * 0.5;
    }

    float integerSum = floor(sum);
    float decimalSum = fract(sum);
    vec3 color;

    if (uColoring == 1) {
        float grey = mod(integerSum, 2.0) == 0.0 ? decimalSum : 1.0 - decimalSum;
        color = vec3(grey);
    } else {
        float grey = decimalSum;

        if (grey < 0.5) {
            color = vec3(grey, 0.0, 0.0);
        } else if (grey < 0.75) {
            color = vec3(0.0, grey, 0.0);
        } else {
            color = vec3(0.0, 0.0, grey);
        }
    }

    gl_FragColor = vec4(color, 1.0);
}
