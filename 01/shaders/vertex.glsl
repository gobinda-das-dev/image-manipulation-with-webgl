#define PI 3.141592653589793

uniform float uTime;
uniform float uTimeline;

varying vec2 vUv;

void main() {
    vec3 newPosition = position;
    newPosition.z += sin(((uTimeline+uv.y+1.0))*PI)*10.;
    newPosition.z += sin(((uTimeline-uv.x+0.0))*PI)*10.;
    

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
}