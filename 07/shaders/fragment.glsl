#define PI 3.141592653589793

uniform float uTime;
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform float uStrength;

varying vec2 vUv;
varying float vEffectStrength;

void main() {
    vec2 uv = vUv;
    vec4 color1 = texture2D(uImage1, uv);
    vec4 color2 = texture2D(uImage2, uv);

    float st = 1.0;
    float circle = vEffectStrength * 2.0;

    float strength = dot(
        circle + 1.5,
        (0.7 - circle) + 0.5
    );
    strength = smoothstep(-2.0, 2., strength);

    vec4 color = mix(color1, color2, strength);

    gl_FragColor = color;
}