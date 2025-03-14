<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-24 14:51:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-27 17:30:31
 * @FilePath: /threejs-vite-vue/src/lesson/chapter3/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";

const InitMap = () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
  });
  const tdtKey = "65f301fcf76d9c4af0682eee02b7a7b9";
  // 加载天地图影像底图
  const tdtBasicLayer = new Cesium.ImageryLayer(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tdtKey}`,
      layer: "tdtBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );

  // 加载天地图影像地理标签
  const tdtLabelLayer = new Cesium.ImageryLayer(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tdtKey}`,
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
    })
  );

  // // 上海中心坐标（经度, 纬度, 高度）
  // // const shanghaiPosition = Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 800);
  // // 设置初始视角：相机位于上海上空800米，俯视地面中心点，俯仰角45°

  viewer.imageryLayers.add(tdtBasicLayer);
  viewer.imageryLayers.add(tdtLabelLayer);
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 800),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0,
    },
    duration: 1, // 可选，动画持续时间
  });
};

onMounted(() => {
  InitMap();
});
</script>

<template>
  <div
    id="cesiumContainer"
    style="width: 100%; height: calc(100vh - 40px)"
  ></div>
</template>
