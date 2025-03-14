<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-24 14:51:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 10:33:33
 * @FilePath: /threejs-vite-vue/src/lesson/chapter3/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";
import shubiao from "@/assets/images/wall.png";
import DynamicWallMaterialProperty from "./components/wallDiffuseDymaticMaterial.js";

const InitMap = async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
    contextOptions: {
      requestWebgl1: true,
    },
  });
  // const tdtKey = "65f301fcf76d9c4af0682eee02b7a7b9";
  // 加载天地图影像底图
  // const tdtBasicLayer = new Cesium.ImageryLayer(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     url: `http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tdtKey}`,
  //     layer: "tdtBasicLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible",
  //     maximumLevel: 18,
  //   })
  // );

  // viewer.imageryLayers.add(tdtBasicLayer);
  /**
   *  latitude: "31.338641",
    longitude: "121.489267",
    psName: "华滋奔腾大厦",
  },
  {
    id: "0278a88c-b4f4-4d64-9ccb-65831b3fb19d",
    latitude: "31.337464",
    longitude: "121.488970",
    psName: "威猛",
  },
  {
    id: "248f6853-2ced-4aa6-b679-ea6422a5f3ac",
    latitude: "31.336899",
    longitude: "121.491520",
    psName: "有限公司3",
  },
  {
    id: "F8DADA95-A438-49E1-B263-63AE3BD7DAC4",
    latitude: "31.339830",
    longitude: "121.494948",
    psName: "有限公司4",
   */
  let positions = Cesium.Cartesian3.fromDegreesArray([
    121.484763, 31.34303, 121.483672, 31.333709, 121.493482, 31.332289,
    121.497761, 31.335877, 121.4972, 31.3418, 121.494563, 31.343383, 121.491504,
    31.343392, 121.489281, 31.343273, 121.484763, 31.34303,
  ]);
  // 绘制墙体
  const wall = viewer.entities.add({
    name: "立体墙效果",
    wall: {
      positions: positions,
      // 设置高度
      maximumHeights: new Array(positions.length).fill(100),
      minimumHeights: new Array(positions.length).fill(0),
      material: new DynamicWallMaterialProperty({
        viewer,
        // trailImage: '/src/assets/vertical.png',
        trailImage: shubiao,
        color: Cesium.Color.RED,
        duration: 1500,
      }),
    },
  });
  viewer.zoomTo(wall);

  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(121.489168, 31.338564, 800),
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(-90),
  //     roll: 0,
  //   },

  //   duration: 3, // 可选，动画持续时间
  // });
};
onMounted(() => {
  InitMap();
});
</script>

<template>
  <div id="cesiumContainer" style="width: 100%; height: 100vh"></div>
</template>
·
