<template>
  <div ref="containerRef" class="container"></div>
</template>
<script lang="ts" setup>
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

import { onMounted, ref } from "vue";

const containerRef = ref<HTMLDivElement>();
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);

const renderer = new WebGLRenderer();
renderer.setClearColor(new Color(0xeeeeee));
renderer.setSize(window.innerWidth, window.innerHeight);

// 场景
const planGeometry = new PlaneGeometry(60, 20);
const material = new MeshBasicMaterial({ color: 0xcccccc });
const plane = new Mesh(planGeometry, material);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const cubeGeometry = new BoxGeometry(4, 4, 4);
const cubeMaterial = new MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false,
});
const cube = new Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-22, 2, 2);
scene.add(cube);

const sphereGeometry = new SphereGeometry(4);
const spereMaterial = new MeshBasicMaterial({
  color: 0x7777ff,
  wireframe: false,
});
const sphere = new Mesh(sphereGeometry, spereMaterial);
sphere.position.set(10, 4, 2);
scene.add(sphere);

// const axes = new AxesHelper(20);
// scene.add(axes);

onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement);
  renderer.render(scene, camera);
});
</script>
