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
import bgImage from "@/assets/images/shuibiao.png";

const InitMap = async () => {
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
      maximumLevel: 18,
    })
  );
  // var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  // handler.setInputAction(function (click: any) {
  //   // 使用pick函数获取点击位置的实际位置
  //   var cartesian = viewer.scene.pickPosition(click.position);
  //   if (Cesium.defined(cartesian)) {
  //     // 将笛卡尔坐标转换为经纬度坐标
  //     var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  //     var longitudeString = Cesium.Math.toDegrees(
  //       cartographic.longitude
  //     ).toFixed(6);
  //     var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
  //       6
  //     );
  //     var heightString = cartographic.height.toFixed(2);
  //     console.log(
  //       "经度：" +
  //         longitudeString +
  //         "，纬度：" +
  //         latitudeString +
  //         "，高度：" +
  //         heightString
  //     );

  //     // 添加点
  //     let clickPosition = viewer.scene.camera.pickEllipsoid(click.position);
  //     viewer.entities.add({
  //       position: clickPosition,
  //       point: {
  //         disableDepthTestDistance: Number.POSITIVE_INFINITY,
  //         color: Cesium.Color.YELLOW,
  //         pixelSize: 30,
  //       },
  //     });
  //   }
  //   // 使用Scene.pick来获取3D Tiles的实际高度
  //   var pickedObject = viewer.scene.pick(click.position);
  //   if (Cesium.defined(pickedObject)) {
  //     // 获取到3D Tiles的高度
  //     const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  //     const height = cartographic.height;
  //     const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
  //     const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
  //     console.log("点击位置的经度是: " + lon);
  //     console.log("点击位置的纬度是: " + lat);
  //     console.log("点击位置的高度是: " + height);
  //   }
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

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

  try {
    const tileset = await Cesium.Cesium3DTileset.fromUrl(
      "./public/honggang/tileset.json",
      {
        dynamicScreenSpaceError: true,
        dynamicScreenSpaceErrorDensity: 2.0e-4,
        dynamicScreenSpaceErrorFactor: 24.0,
        dynamicScreenSpaceErrorHeightFalloff: 0.25,
      }
    );
    viewer.scene.primitives.add(tileset);
    // viewer.zoomTo(tileset);
    viewer.camera.viewBoundingSphere(
      tileset.boundingSphere,
      new Cesium.HeadingPitchRange(0, -0.5, 0)
    );
    viewer.scene.globe.depthTestAgainstTerrain = false;
  } catch (error) {
    console.error(`Error creating tileset: ${error}`);
  }
  // // 上海中心坐标（经度, 纬度, 高度）
  // // const shanghaiPosition = Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 800);
  // // 设置初始视角：相机位于上海上空800米，俯视地面中心点，俯仰角45°
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(121.489555, 31.33843),
    billboard: {
      image: bgImage,
      scale: 0.3,
      color: Cesium.Color.YELLOW,
    },
  });
  // viewer.zoomTo(billboard);

  viewer.imageryLayers.add(tdtBasicLayer);
  viewer.imageryLayers.add(tdtLabelLayer);
  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(121.489168, 31.338564, 800),
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(-90),
  //     roll: 0,
  //   },

  //   duration: 1, // 可选，动画持续时间
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
