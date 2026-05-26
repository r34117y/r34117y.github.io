precision highp float;

#define MAX_LAYERS 128

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDimPix;
uniform int uLayerCount;
uniform int uColoring;
uniform int uGeometry;
uniform vec2 uDirections[MAX_LAYERS];

void main() {
    vec2 centered = (vTexCoord - 0.5) * uResolution * uDimPix;

    if (uGeometry == 2) {
        vec2 screen = vTexCoord * 2.0 - 1.0;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        float fov = radians(90.0);
        float focalLength = 1.0 / tan(fov * 0.5);
        vec3 rayDir = normalize(vec3(screen.x * aspect, screen.y, focalLength));
        float longitude = atan(rayDir.x, rayDir.z);
        float latitude = asin(clamp(rayDir.y, -1.0, 1.0));
        float sphereScale = min(uResolution.x, uResolution.y) * uDimPix;

        centered = vec2(longitude, latitude) * sphereScale;
    }

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
        float t = smoothstep(0.0, 1.0, decimalSum);

        if (t < 0.33) {
            float blend = smoothstep(0.0, 0.33, t);
            color = mix(vec3(1.0, 0.1, 0.2), vec3(1.0, 0.85, 0.1), blend);
        } else if (t < 0.66) {
            float blend = smoothstep(0.33, 0.66, t);
            color = mix(vec3(1.0, 0.85, 0.1), vec3(0.0, 0.9, 0.45), blend);
        } else {
            float blend = smoothstep(0.66, 1.0, t);
            color = mix(vec3(0.0, 0.9, 0.45), vec3(0.15, 0.35, 1.0), blend);
        }

        color = pow(color, vec3(0.85));
        color *= 1.15;
        color = clamp(color, 0.0, 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
