import './style.css'

import * as THREE from 'three';
import { Color } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

})

// renderer = new THREE.WebGLRenderer( {  } );

renderer.setPixelRatio( window.devicePixelRatio );

renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera)

// torus shape textured


const torusTexture= new THREE.TextureLoader().load('https://i.ibb.co/FDgbkv1/Sci-Fi-Wall-014-basecolor.jpg'); 


const torus = new THREE.Mesh(
  
  new THREE.TorusGeometry(15,3,16, 100),
  new THREE.MeshBasicMaterial({map: torusTexture})
  
);

scene.add(torus)
// torus shape without texture 

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({color: 0x0000FF});

// const torus = new THREE.Mesh (geometry, material)
// scene.add(torus)



const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material )
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) )
  
  
  star.position.set(x,y,z);
  scene.add(star);

}


// avatar on cube 
const ashTexture = new THREE.TextureLoader().load('https://i.ibb.co/HN2nMqJ/me-2-removebg-blue-cropped.png'); 




const ash = new THREE.Mesh(
  // new THREE.BoxGeometry(3,3,3),
  new THREE.BoxBufferGeometry( 10, 10, 10),
  new THREE.MeshBasicMaterial({map: ashTexture, transparent: true, opacity:1, color: 0xffffff })
);
scene.add(ash)



// moon 
const moonTexture = new THREE.TextureLoader().load('https://i.ibb.co/z7hWY6Y/Download-Moon-Texture-Nasa.webp')
const normalTexture = new THREE.TextureLoader().load('https://i.ibb.co/D9b027m/Normal-Map.png')

const moon = new THREE.Mesh(

  
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })

);
scene.add(moon)
// move moon
moon.position.z = 30;
moon.position.setX(-10);


Array(200).fill().forEach(addStar)

// background texture 
const spaceTexture = new THREE.TextureLoader().load('https://tinyurl.com/2p85f6bd')
scene.background = spaceTexture;

// move camera when user scrolls
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  ash.rotation.y += 0.01;
  ash.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();


// animate donut 
function animate () {
  requestAnimationFrame( animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0001;

  controls.update();
  renderer.render( scene, camera );
}


animate()



