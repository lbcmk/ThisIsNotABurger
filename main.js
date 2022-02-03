import './style.css'
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import {chooseTopping} from './toppings'
import {total_toppings} from './toppings'

var gltfLoader = new GLTFLoader()
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: false,
  antialias: true
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
camera.position.setX(30)
camera.position.setY(30)
camera.position.setZ(30)
renderer.render(scene, camera)

// Objects
function makeBurger() {
  let amount_of_toppings = Math.round(Math.random() * 10)

  for(let i = 0; i < amount_of_toppings; i++) {
    let list_of_toppings = chooseTopping(Math.round(Math.random()*total_toppings), i)

    gltfLoader.load(list_of_toppings[i], (gltf) => {
      gltf.scene.scale.set(10,10,10,10)
      gltf.scene.position.setY(3*i)
      scene.add(gltf.scene)
    })
  }

  // Top bun of the burger
  gltfLoader.load('assets/topbun1.gltf', (gltf) => {
    gltf.scene.scale.set(10,10,10,10)
    gltf.scene.position.setY(3*amount_of_toppings+1)
    scene.add(gltf.scene)
  })

  // Bottom bun of the burger
  gltfLoader.load('assets/topbun1.gltf', (gltf) => {
    gltf.scene.scale.set(10,5,10,10)
    gltf.scene.rotateX(Math.PI)
    gltf.scene.position.setY(-3)
    scene.add(gltf.scene)
  })
}

makeBurger()

// Lights

const pointLight = new THREE.PointLight(0x696969)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)

scene.add(pointLight, ambientLight)

// Misc.

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera)
}

animate()