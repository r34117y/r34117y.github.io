attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y);
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
