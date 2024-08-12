#define PI 3.141592653589793

uniform float uTime;
uniform sampler2D uImage1;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    gl_FragColor = texture2D(uImage1, uv);
}