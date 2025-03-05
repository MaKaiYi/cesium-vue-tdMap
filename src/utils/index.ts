
import * as Cesium from "cesium";
const CesUtils = () => {
  /**
* @description : 初始场景动画，飞到目标点
* @param {*} viewer
* @param {*} position ：目标点位置
* @param {*} duration ：持续时间
* @return {*}
  */
  const flyToPosition = (viewer: any, position: any, duration: any) => {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        position.lon,
        position.lat,
        position.height
      ),
      duration: duration,
    });
  }


  return {
    flyToPosition
  }
}

export default CesUtils;
