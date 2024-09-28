#define PI 3.141592653589793

uniform float uTime;
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform float uStrength;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 color1 = texture2D(uImage1, uv);
    vec4 color2 = texture2D(uImage2, uv);

    // float time = sin(uTime) + 1.0;
    // time /= 2.0;
    // time *= 1.5;
    // time -= 0.5;

    float strength = smoothstep(uStrength + 0.0, uStrength + 0.5, vUv.x);

    vec4 color = mix(color1, color2, strength);

    gl_FragColor = color;
}