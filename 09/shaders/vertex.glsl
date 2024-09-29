#define PI 3.141592653589793

uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uStrength;

varying vec2 vUv;
varying vec3 vNewPosition;

void main() {
    vec3 newPosition = position;
    newPosition.z += sin(((uStrength+uv.y+1.0))*PI)*20.;
    newPosition.z += sin(((uStrength-uv.x+0.0))*PI)*10.;


    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
    vNewPosition = newPosition;
}
