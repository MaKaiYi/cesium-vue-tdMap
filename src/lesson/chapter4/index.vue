<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
import CesUtils from "@/utils/index.ts";
import jsJson from "@/assets/json/jiangsu.json";
import ycJson from "@/assets/json/yancheng.json";

const cesUtils = CesUtils();

const initalize = async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
    shouldAnimate: true,
  });
  viewer._cesiumWidget._creditContainer.style.display = "none"; //取消版权信息
  const imageLayers = viewer.scene.imageryLayers;
  viewer.scene.globe.depthTestAgainstTerrain = false;
  // 创建一个事件处理器来处理屏幕空间事件
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  const labels = viewer.scene.primitives.add(new Cesium.LabelCollection());
  // 监听鼠标点击事件
  // handler.setInputAction(function (click) {
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
  imageLayers.remove(imageLayers.get(0)); //移除默认影像图层
  const TDTTK = "65f301fcf76d9c4af0682eee02b7a7b9"; //填入你自己的天地图Key

  const position = {
    lon: 118.7969,
    lat: 32.0603,
    height: 300000,
  };
  // 天地图影像
  const tdtLayer = new Cesium.WebMapTileServiceImageryProvider({
    url: `http://t0.tianditu.com/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=${TDTTK}`,
    layer: "tdt",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "w",
    maximumLevel: 18,
    show: false,
  });
  viewer.imageryLayers.addImageryProvider(tdtLayer);
  // 天地图注记
  // const tdtAnnotionLayer = new Cesium.WebMapTileServiceImageryProvider({
  //   url: `http://t0.tianditu.com/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=${TDTTK}`,
  //   layer: "tdtAnno",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "w",
  //   maximumLevel: 18,
  //   show: false,
  // });
  // 加载江苏省边界（网页4方案扩展）
  const colorLists = [
    "DARKMAGENTA",
    "DARKOLIVEGREEN",
    "DARKORANGE",
    "DARKORCHID",
    "ORANGE",
    "YELLOWGREEN",
    "TOMATO",
    "BROWN",
    "CHOCOLATE",
    "DARKGOLDENROD",
    "DARKGRAY",
    "DARKGREEN",
    "DARKKHAKI",
    "DARKRED",
    "DARKSALMON",
    "DARKSEAGREEN",
    "DARKSLATEBLUE",
    "DARKSLATEGRAY",
  ];
  const calculatePolygonCenter = (positions) => {
    let sumX = 0,
      sumY = 0,
      sumZ = 0;
    const count = positions.length;
    positions.forEach((position) => {
      sumX += position.x;
      sumY += position.y;
      sumZ += position.z;
    });
    const centerCartesian = new Cesium.Cartesian3(
      sumX / count,
      sumY / count,
      sumZ / count
    );
    const cartographic = Cesium.Cartographic.fromCartesian(centerCartesian);

    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height;

    const finalCartesian = Cesium.Cartesian3.fromDegrees(
      longitude,
      latitude,
      height
    );

    return {
      cartesian: finalCartesian,
      degrees: {
        longitude: longitude,
        latitude: latitude,
        height: height,
      },
    };
  };
  Cesium.GeoJsonDataSource.load(jsJson).then((dataSource) => {
    // dataSource.entities.values.forEach((entity) => {
    //   entity.polygon.height = 1000;
    //   entity.polygon.extrudedHeight = 5000;
    //   entity.polygon.material = Cesium.Color.GREEN.withAlpha(0.3);
    // });

    viewer.dataSources.add(dataSource);

    // cesUtils.flyToPosition(viewer, dataSource, 3);
    // viewer.zoomTo(dataSource);

    // 遍历每个实体来设置高度
    dataSource.entities.values.forEach((entity, index) => {
      if (entity.polygon) {
        const height = entity.properties.height
          ? entity.properties.height
          : 2000;
        entity.polygon.extrudedHeight = height; // 设置拉伸高度
        entity.polygon.material =
          Cesium.Color[colorLists[index]].withAlpha(0.7); // 设置颜色
        entity.polygon.outline = false; // 设置边框
        entity.polygon.closeTop = false; // 是否封闭顶部
        entity.polygon.closeBottom = true; // 是否封闭底部
      }
      if (entity.name && entity.polygon.hierarchy._value.positions) {
        const center = calculatePolygonCenter(
          entity.polygon.hierarchy._value.positions
        );
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            center.degrees.longitude,
            center.degrees.latitude,
            center.degrees.height
          ), // 设置标签位置
          label: {
            text: entity.name,
            font: "16px Helvetica",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 6,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
          },
        });
      }
    });
  });
  // 加载盐城
  Cesium.GeoJsonDataSource.load(ycJson, {}).then((dataSource) => {
    viewer.dataSources.add(dataSource);

    // 设置3D效果（网页6地形方案）
    dataSource.entities.values.forEach((entity, index) => {
      if (entity.polygon) {
        const height = entity.properties.height
          ? entity.properties.height
          : 2000;
        entity.polygon.extrudedHeight = height; // 设置拉伸高度
        entity.polygon.material =
          Cesium.Color[colorLists[index]].withAlpha(0.7); // 设置颜色
        entity.polygon.outline = false; // 设置边框
        entity.polygon.closeTop = false; // 是否封闭顶部
        entity.polygon.closeBottom = true; // 是否封闭底部
      }
      if (entity.name && entity.polygon.hierarchy._value.positions) {
        const center = calculatePolygonCenter(
          entity.polygon.hierarchy._value.positions
        );
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            center.degrees.longitude,
            center.degrees.latitude,
            center.degrees.height
          ), // 设置标签位置
          label: {
            text: entity.name,
            font: "16px Helvetica",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 6,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
          },
        });
      }
    });
  });

  // viewer.imageryLayers.addImageryProvider(tdtAnnotionLayer);
  // cesUtils.flyToPosition(viewer, position, 3);
  // viewer.camera.setView({
  //   destination: {
  //     x: -2195017.3883226076,
  //     y: 5180529.602231502,
  //     z: 2996108.378261628,
  //   },
  //   orientation: {
  //     heading: 6.283185307179581,
  //     pitch: -1.5688168484696687,
  //     roll: 0.0,
  //   },
  // });
  /**
   * 区域视角锁定图
   */
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(118.767413, 32.041544, 1000000),
    orientation: {
      heading: Cesium.Math.toRadians(20),
      pitch: Cesium.Math.toRadians(-80),
      roll: 0,
    },
    duration: 1, // 可选，动画持续时间
  });
  /**
   * 城市鸟瞰图
   */
  // const destination = Cesium.Cartesian3.fromDegrees(116.397, 39.917, 1000.0);
  // viewer.camera.flyTo({
  //   destination: destination,
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0.0),
  //     pitch: Cesium.Math.toRadians(-90.0),
  //     roll: 0.0,
  //   },
  // });
};

onMounted(() => {
  initalize();
});
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  text-align: center;
}

html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
