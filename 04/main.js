import '../style.css';
import * as THREE from 'three';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import gsap from 'gsap';

const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);

class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock();
    this.time = 0;
    this.container = options.dom;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.images = [...$$('.images img')];
    this.material;
    this.imageStore = [];
    this.uStartIndex = 0;
    this.uEndIndex = 1;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.z = 200;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 200) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.pointerEvents = "none";

    this.addImages();
    this.resize();
    this.setPosition();
    this.setupResize();
    this.addEventListeners(); // Changed hover() to addEventListeners()
    this.render();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 200) * (180 / Math.PI);
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.setPosition();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  setPosition() {
    this.imageStore.forEach(img => {
      const bounds = img.img.getBoundingClientRect();
      img.mesh.geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 32, 32);
      img.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
      img.mesh.position.x = bounds.left + - this.width / 2 + bounds.width / 2;
    });
  }

  addImages() {
    const textureLoader = new THREE.TextureLoader();
    const textures = this.images.map(img => textureLoader.load(img.src));

    const uniforms = {
      uTime: { value: 0 },
      uTimeline: { value: 0 },
      uImage1: { value: textures[0] },
      uImage2: { value: textureLoader.load('/5.webp') },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRadius: { value: 0 },
      uStrength: { value: -0.5 },
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      // wireframe:true,
      // transparent: true,
      uniforms,
    });

    this.images.forEach(img => {
      const bounds = img.getBoundingClientRect();
      const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height);
      const mesh = new THREE.Mesh(geometry, this.material);

      this.scene.add(mesh);
      this.imageStore.push({ img, mesh });
    });
  }

  addEventListeners() {
    const image = $('.images img');
    image.addEventListener('mouseenter', () => {
      gsap.to(this.material.uniforms.uStrength, { value: 1, ease: 'expo', duration: 1.5 });
    });
    image.addEventListener('touchstart', () => {
      gsap.to(this.material.uniforms.uStrength, { value: 1, ease: 'expo', duration: 1.5 });
    });
    image.addEventListener('mouseleave', () => {
      gsap.to(this.material.uniforms.uStrength, { value: -0.5, ease: 'expo', duration: 1.5 });
    });
    image.addEventListener('touchend', () => {
      gsap.to(this.material.uniforms.uStrength, { value: -0.5, ease: 'expo', duration: 1.5 });
    });
  }

  render() {
    this.time = this.clock.getElapsedTime();
    this.material.uniforms.uTime.value = this.time;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: $('.canvas')
});