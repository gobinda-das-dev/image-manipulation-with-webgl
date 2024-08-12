#define PI 3.141592653589793

uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;
varying vec2 vUv;

void main() {
    vec3 newPosition = position;
    float radius = uRadius;

    float distanceToCenter = distance(uv, uMouse);

    float effectStrength = radius * (1.0 - cos(PI * distanceToCenter));
    newPosition.xy -= effectStrength * 20.0;


    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
}
