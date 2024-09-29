#define PI 3.141592653589793

uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;

varying vec2 vUv;
varying float vEffectStrength;

void main() {
    vec3 newPosition = position;
    float radius = uRadius * 2.0;

    float distanceToCenter = distance((position.xy- 10000.)*0.005, uMouse);

    float effectStrength = radius * (cos(PI * distanceToCenter));
    newPosition.z -= effectStrength * 5.;


    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
    vEffectStrength = effectStrength;
}
