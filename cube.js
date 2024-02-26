import * as THREE from 'three';
import "./style.css";
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Grabbing the canvas from the html
const canvas = document.querySelector('canvas.webgl');

// Setting the size of the canvas
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Creating the Scene
// The scene is the place where you put objects, lights, and cameras. It's the place where you put everything that you want to render.
// You can see it as a set from a movie. It's the place where everything happens.
const scene = new THREE.Scene();


// Creating a sphere
// To create a sphere, first we create the geometry.
const geometry = new THREE.BoxGeometry( 3, 3, 3 );
// The first parameter is the radius of the sphere. The second and third parameters are the width and height segments. The more segments, the more detailed the sphere will be.

// We grab the texture that we want to use
const texture = new THREE.TextureLoader().load( "./images/logo_mediapro.jpg" );


// Then we create the material.
const material = new THREE.MeshStandardMaterial({ 
  // color: 0xffffff,
  map: texture
});
// The color property is the color of the sphere. You can use hexadecimal colors or the color name.

// Then we create the mesh.
const mesh = new THREE.Mesh(geometry, material);
// The first parameter is the geometry, and the second parameter is the material.

// Then we add the mesh to the scene.
console.log(mesh);
scene.add(mesh);

// Loading a 3D model
// const loader = new GLTFLoader();
// loader.load('./models/bastion/scene.gltf', (gltf) => {
//   // console.log(gltf);
//   scene.add(gltf.scene);
// });


// Creating a light

const light = new THREE.AmbientLight(0xffffff, 1);

// const light = new THREE.PointLight(0xffffff, 15, 100);
// The first parameter is the color of the light. The second parameter is the intensity of the light. The third parameter is the distance of the light. There are more effects that you can add to the light.

// Then we set the position of the light.
light.position.set(0, 6, 6);

console.log(light);
// Then we add the light to the scene.
scene.add(light);

// Creating a camera
// The camera is the point of view of the scene. It's the place where you see everything.
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
// The first parameter is the field of view. The second parameter is the aspect ratio. The third and fourth parameters are the near and far planes.
console.log(camera);
// Then we set the position of the camera.
camera.position.z = 10;

// Adding the camera to the scene.
scene.add(camera);

// Controls

const controls = new OrbitControls(camera, canvas);

// The damping factor is the speed of the camera when you move it. It like drags the camera when you move it. However, it also needs to be updated in the loop.
controls.enableDamping = true;

// This makes it so they can't zoom or move around.
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotate = true;

// Creating a renderer
const renderer = new THREE.WebGLRenderer({canvas});
// It has to be set as an object

// Then we set the size of the renderer.
renderer.setSize(sizes.width, sizes.height);
// The first parameter is the width, and the second parameter is the height.

// Then we set the pixel ratio of the renderer, which makes it smoother
renderer.setPixelRatio(2);

// Then we render the scene.
renderer.render(scene, camera);

console.log(renderer);



// Resizing the window
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  // Updates the aspect ratio of the camera

  camera.updateProjectionMatrix();
  // Updates the camera projection matrix. Must be called after any change of parameters.

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  // Updates the size of the renderer

  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // This is usually used for HiDPI device to prevent blurring output canvas.
});

const loop = () => {
  // Update controls
  controls.update();

  // Update objects
  // mesh.rotation.y += 0.01;
  // light.position.y += 0.02;

  // Render
  renderer.render(scene, camera);

  // Call loop again on the next frame
  window.requestAnimationFrame(loop);
}

loop();


// Animation with GSAP

// This is like an animation manager
const tl = gsap.timeline({defaults: {duration: 1}});

// These fromTo methods require the object, as seen can be a JS object or a string with a query selector
// The second parameter is the initial state of the object
// The third parameter is the final state of the object
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo("nav", {y: "-100%"}, {y: "0%", ease: "power2.inOut"});
// tl.fromTo(".title", {opacity: 0}, {opacity: 1, ease: "power2.inOut"});


// Color animator
let mouseDown = false;
let rgb = {r: 0, g: 0, b: 0};

document.addEventListener('mousedown', () => {
  mouseDown = true;
});
document.addEventListener('mouseup', () => {
  mouseDown = false;
});

document.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    // rgb.r = event.clientX / sizes.width * 255;
    // rgb.g = event.clientY / sizes.height * 255;
    // rgb.b = Math.random() * 255;
    // console.log(rgb);
    // mesh.material.color.setRGB(rgb.r, rgb.g, rgb.b);
  }
});