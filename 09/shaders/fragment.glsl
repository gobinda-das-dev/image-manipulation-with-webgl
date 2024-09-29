#define PI 3.141592653589793

uniform float uTime;
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform float uStrength;

varying vec2 vUv;
varying vec3 vNewPosition;

void main() {
    vec2 uv = vUv;
    vec4 color1 = texture2D(uImage1, uv);
    vec4 color2 = texture2D(uImage2, uv);

    float st = smoothstep(-10., 5., uStrength);
    float circle = vNewPosition.z * st * (uStrength + 0.5);

    float strength = dot(
        circle + 2.,
        (1.2 - circle) + 0.5
    );
    strength = smoothstep(-2.0, 0.0, strength);

    vec4 color = mix(color2, color1, strength);

    gl_FragColor = color;
}