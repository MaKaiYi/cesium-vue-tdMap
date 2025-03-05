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
const loctionList = [
  {
    id: "392f7fbb-ae25-4eef-ac43-58fd91148d1f",
    latitude: "31.338641",
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
  },
];
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
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (click: any) {
    // 使用pick函数获取点击位置的实际位置
    var cartesian = viewer.scene.pickPosition(click.position);
    if (Cesium.defined(cartesian)) {
      // 将笛卡尔坐标转换为经纬度坐标
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var longitudeString = Cesium.Math.toDegrees(
        cartographic.longitude
      ).toFixed(6);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
        6
      );
      var heightString = cartographic.height.toFixed(2);
      console.log(
        "经度：" +
          longitudeString +
          "，纬度：" +
          latitudeString +
          "，高度：" +
          heightString
      );
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          parseFloat(longitudeString),
          parseFloat(latitudeString),
          500
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0,
        },

        duration: 1, // 可选，动画持续时间
      });
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

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
  loctionList.forEach((item: any) => {
    viewer.entities.add({
      name: item.psName,
      id: item.id,
      position: Cesium.Cartesian3.fromDegrees(
        item.longitude * 1,
        item.latitude * 1
      ),
      billboard: {
        image: bgImage,
        scale: 0.3,
        color: Cesium.Color.YELLOW,
      },
      // point: {
      //   pixelSize: 5,
      //   color: Cesium.Color.RED,
      //   outlineColor: Cesium.Color.WHITE,
      //   outlineWidth: 2,
      // },
    });
  });

  // viewer.zoomTo(billboard);

  viewer.imageryLayers.add(tdtBasicLayer);
  viewer.imageryLayers.add(tdtLabelLayer);
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(121.489168, 31.338564, 800),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
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
  <div id="cesiumContainer" style="width: 100%; height: 100vh"></div>
</template>
·
