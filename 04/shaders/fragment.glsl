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

    float st = uStrength;

    float strength = dot(vUv.y + st, (1.0 - vUv.x) + st);
    strength = smoothstep(0.0, 1.0, strength);

    vec4 color = mix(color1, color2, strength);

    gl_FragColor = color;
}