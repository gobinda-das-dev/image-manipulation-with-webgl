#define PI 3.141592653589793

uniform float uTime;
uniform sampler2D uImage1;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uImage1, uv);

    // gl_FragColor = vec4(1., 0., 0., 1.0);
    gl_FragColor = color;
}