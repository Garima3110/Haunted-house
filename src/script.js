import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// const bricks=textureLoader.load('/textures/bricks2.jpg');  //temporary panga by Garrrima

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// walls textures
const bricksColorTexture=textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture=textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture=textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture=textureLoader.load('/textures/bricks/roughness.jpg');

// floor textures
const grassColorTexture=textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture=textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture=textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture=textureLoader.load('/textures/grass/roughness.jpg');
grassColorTexture.repeat.set(5,5);
grassAmbientOcclusionTexture.repeat.set(5,5);
grassNormalTexture.repeat.set(5,5);
grassRoughnessTexture.repeat.set(5,5);

grassColorTexture.wrapS=THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS=THREE.RepeatWrapping;
grassRoughnessTexture.wrapS=THREE.RepeatWrapping;
grassNormalTexture.wrapS=THREE.RepeatWrapping;

grassColorTexture.wrapT=THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT=THREE.RepeatWrapping;
grassRoughnessTexture.wrapT=THREE.RepeatWrapping;
grassNormalTexture.wrapT=THREE.RepeatWrapping;



/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// sphere.position.y = 1
// scene.add(sphere)

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 6),
  new THREE.MeshStandardMaterial({
    map:bricksColorTexture,
    aoMap:bricksAmbientOcclusionTexture,
    roughnessMap:bricksRoughnessTexture,
    normalMap:bricksNormalTexture
  })
  );
  walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2));
walls.position.y = 2.001;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(5, 2, 4),
  new THREE.MeshStandardMaterial({ color: "#48acb5" })
);
roof.position.y = 4.7;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(3.5, 3.3, 100, 100),
  new THREE.MeshStandardMaterial({ 
    map:doorColorTexture,
    transparent:true,
    alphaMap:doorAlphaTexture,
    aoMap:doorAmbientOcclusionTexture,
    displacementMap:doorHeightTexture,
    displacementScale:0.1,
    normalMap:doorNormalTexture,
    metalnessMap:doorMetalnessTexture,
    roughnessMap:doorRoughnessTexture
   })
);
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2));
door.position.z = 3.01;
door.position.y = 1.5;
house.add(door);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ 
    roughnessMap:grassRoughnessTexture,
    map:grassColorTexture,
    aoMap:grassAmbientOcclusionTexture,
    normalMap:grassNormalTexture
  })
);
floor.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2));

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// bushes
const bushGeometry = new THREE.SphereGeometry(1, 32, 64);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "green" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(1.5, 0.4, 3.4);
bush1.scale.set(0.5, 0.5, 0.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(2.4, 0.4, 3.4);
bush2.scale.set(0.4, 0.4, 0.4);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-2.5, 0.45, 3.4);
bush3.scale.set(0.6, 0.6, 0.6);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1.8, 0.2, 3.2);
bush4.scale.set(0.28, 0.28, 0.28);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.position.set(2, 0.2, 3.6);
bush5.scale.set(0.2, 0.2, 0.2);

house.add(bush1, bush2, bush3, bush4, bush5);

// graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(2.5, 2, 0.7);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#525252" });

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 5.5 + Math.random() * 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const y = Math.random() * 1.1;
  grave.position.set(x, y, z);

  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.3;
  grave.castShadow=true;
  graves.add(grave);
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// doorlight

const doorLight=new THREE.PointLight('#d99c2b',1,7);
doorLight.position.set(0,4,4);
house.add(doorLight);

const ghost1=new THREE.PointLight(0xffff00,1);
scene.add(ghost1);
const ghost2=new THREE.PointLight(0xff00ff,1);
scene.add(ghost2);
const ghost3=new THREE.PointLight(0x00ffff,1);
scene.add(ghost3);

// fog
const fog=new THREE.Fog('#918d84',10,30);

scene.fog=fog;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Set limits on orbit controls
controls.minPolarAngle = Math.PI / 4; // Minimum polar angle (in radians)
controls.maxPolarAngle = (1.85* Math.PI) / 4; // Maximum polar angle (in radians)
// controls.minAzimuthAngle = -Math.PI / 4; // Minimum azimuthal angle (in radians)
// controls.maxAzimuthAngle = 4*Math.PI / 4; // Maximum azimuthal angle (in radians)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor('#918d84');
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;

// shadows
moonLight.castShadow=true;
doorLight.castShadow=true;
ghost1.castShadow=true;
ghost2.castShadow=true;
ghost3.castShadow=true;
walls.castShadow=true;
bush1.castShadow=true;
bush2.castShadow=true;
bush3.castShadow=true;
bush4.castShadow=true;
bush5.castShadow=true;


// receiving shadows
floor.receiveShadow=true;
walls.receiveShadow=true;


// Camera helpers
const moonLightCameraHelper=new THREE.CameraHelper(moonLight.shadow.camera);
scene.add(moonLightCameraHelper);

const doorLightCameraHelper=new THREE.CameraHelper(doorLight.shadow.camera);
scene.add(doorLightCameraHelper);
doorLightCameraHelper.visible=false;


// optimising shadows

moonLight.shadow.mapSize.width=256;
moonLight.shadow.mapSize.height=256;
moonLight.shadow.camera.far=10;
moonLightCameraHelper.visible=false;


doorLight.shadow.mapSize.width=1024;
doorLight.shadow.mapSize.height=1024;
doorLight.shadow.camera.far=5;
doorLight.shadow.camera.fov=85;

ghost1.shadow.mapSize.width=256;
ghost1.shadow.mapSize.height=256;
ghost1.shadow.camera.far=7;

ghost2.shadow.mapSize.width=256;
ghost2.shadow.mapSize.height=256;
ghost2.shadow.camera.far=7;

ghost3.shadow.mapSize.width=256;
ghost3.shadow.mapSize.height=256;
ghost3.shadow.camera.far=7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // ghosts
  const ghost1Angle=elapsedTime*0.5;
  ghost1.position.x=Math.sin(ghost1Angle)*6;
  ghost1.position.y=Math.sin(elapsedTime)*4;
  ghost1.position.z=Math.cos(ghost1Angle)*6;


  const ghost2Angle=-elapsedTime*0.32;
  ghost2.position.x=Math.sin(ghost2Angle)*3;
  ghost2.position.y=Math.sin(elapsedTime)*3;
  ghost2.position.z=Math.cos(ghost2Angle)*3;


  const ghost3Angle=elapsedTime;
  ghost3.position.x=Math.sin(ghost3Angle)*7;
  ghost3.position.y=Math.sin(elapsedTime)*3;
  ghost3.position.z=Math.cos(ghost3Angle)*7;

  // Update controls
  controls.update();
  

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
