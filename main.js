import "./style.css";
import * as THREE from "three";

let scene, camera, renderer, dice;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const loader = new THREE.TextureLoader();

  const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load("./one.jpg") }),
    new THREE.MeshBasicMaterial({ map: loader.load("./two.jpg") }),
    new THREE.MeshBasicMaterial({ map: loader.load("./three.jpg") }),
    new THREE.MeshBasicMaterial({ map: loader.load("./four.jpg") }),
    new THREE.MeshBasicMaterial({ map: loader.load("./five.jpg") }),
    new THREE.MeshBasicMaterial({ map: loader.load("./six.jpg") }),
  ];

  dice = new THREE.Mesh(geometry, materials);
  scene.add(dice);
  dice.position.y = 1;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  dice.rotation.x += 0.01;
  dice.rotation.y += 0.01;

  renderer.render(scene, camera);
}

init();