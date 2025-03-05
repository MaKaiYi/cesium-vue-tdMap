<template>
  <vue3dLoader
    class="vue3dLoader"
    :showFps="true"
    :filePath="[modelPath]"
    :fileType="fileType"
    :position="position"
    :rotation="rotation"
    :cameraPosition="cameraPosition"
    :bgColor="bgColor"
    @load="onLoad()"
    outputEncoding="sRGB"
    :maxDistance="400"
    :parallelLoad="true"
    :autoPlay="true"
    :labels="labels"
    :enableDamping="true"
    :dampingFactor="0.1"
    :intersectRecursive="true"
    :lights="lights"
    :backgroundAlpha="1"
    :scale="scale"
    @mousedown="mouseDown"
    @mouseUp="mouseUp"
    @mouseMove="mouseMove"
    ref="vue3dLoaderRef"
  ></vue3dLoader>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
const modelPath = import.meta.env.VITE_MODEL_PATH;
const imagePath = import.meta.env.VITE_MODEL_IMAGE;
// 在 <script setup lang="ts"> 顶部添加
import {
  Vector3,
  type PerspectiveCamera,
  Box3,
  Quaternion,
  MeshPhongMaterial,
  Object3D,
  Group,
  Mesh,
  Material,
  LineBasicMaterial,
} from "three";
import gsap from "gsap";

const fileType = ["glb", "gltf"];
const position = ref([{ x: 0, y: 0, z: 0 }]);
const rotation = ref([{ x: 0, y: 0, z: 0 }]);
const scale = ref({ x: 1, y: 2, z: 1 });
const bgColor = "red";
const lights = [
  {
    type: "AmbientLight",
    color: "#3491FA",
  },
  {
    type: "DirectionalLight",
    position: { x: 100, y: 10, z: 100 },
    color: "#00B42A",
    intensity: 0.8,
  },
  {
    type: "PointLight",
    color: "#FF7D00",
    position: { x: 200, y: -200, z: 100 },
    intensity: 1,
  },
  {
    type: "HemisphereLight",
    skyColor: "#F7BA1E",
    groundColor: "#000000",
    position: { x: 200, y: -200, z: 100 },
  },
];
const labels = ref([
  // {
  //   image: bgImage,
  //   position: { x: 0, y: 100, z: 0 },
  //   scale: { x: 20, y: 20, z: 20 },
  //   sid: 1, // custom id
  // },
  // {
  //   text: "Top",
  //   textStyle: {
  //     fontFamily: "Arial",
  //     fontSize: 18,
  //     fontWeight: "normal",
  //     curror: "pointer",
  //     lineHeight: 1,
  //     color: "#fff",
  //     borderWidth: 8,
  //     borderRadius: 4,
  //     borderColor: "rgba(0,0,0,1)",
  //     backgroundColor: "rgba(0, 0, 0, 1)",
  //   },
  //   position: { x: 20, y: 80, z: 0 },
  //   scale: { x: 15, y: 15, z: 0 },
  //   sid: 2,
  // },
]) as any;
const vue3dLoaderRef = ref();
const sceneData = ref([]) as any;
const onLoad = () => {
  vue3dLoaderRef.value.scene.children.forEach((item: any) => {
    if (item.type === "Group") {
      sceneData.value = item.children;
    }
  });
  if (sceneData.value && sceneData.value.length) {
    sceneData.value.forEach((item: any) => {
      if (item.name === "住宅楼32_2") {
        addImageLabel(
          item,
          new URL("@/assets/images/shuibiao.png", import.meta.url)
        );
      }
      if (item.name === "住宅楼17_2") {
        addImageLabel(item, imagePath);
      }
      if (item.name === "住宅楼32_4") {
        addImageLabel(item, imagePath);
      }
      if (item.name === "轿车3") {
        item.position.y = 0;
        addImageLabel(item, imagePath);
      }
    });
  }
};
const addImageLabel = (item: any, imagePath: any) => {
  labels.value.push({
    image: imagePath,
    name: item.name,
    position: {
      x: item.position.x,
      y: item.name === "轿车3" ? item.position.y + 10 : item.position.y + 50,
      z: item.position.z,
    },
    scale: { x: 5, y: 5, z: 5 },
    sid: item.name,
  });
};
const cameraPosition = ref({ x: 200, y: 200, z: 0 });
type Building = Group | Mesh; // 假设建筑是 Group 或 Mesh 类型
let selectedBuilding: Building | null = null;
// 鼠标按下事件处理
const mouseDown = (_: MouseEvent, intersects: any | null) => {
  const camera = vue3dLoaderRef.value.camera as PerspectiveCamera;
  if (!intersects.object.sid) return;

  const targetObject = intersects.object;
  const box = new Box3().setFromObject(targetObject);

  // 计算世界坐标中心
  const center = new Vector3();
  box.getCenter(center);

  const buildingName = targetObject.sid;

  const targetBuilding = sceneData.value.find(
    (obj: Object3D) => obj.name === buildingName
  );

  // 3. 如果之前有选中建筑，恢复原色
  if (selectedBuilding) resetBuildingColor(selectedBuilding);

  // 4. 高亮新选中建筑
  highlightBuilding(targetBuilding);
  selectedBuilding = targetBuilding;

  const xOffset = 100; // 单位：场景坐标单位，正数向右，负数向左
  // 计算最佳俯视高度（根据包围盒高度）
  const size = box.getSize(new Vector3()).y;
  const cameraHeight = size * 3 + 50; // 基础高度 + 安全距离

  // 目标位置（正上方）
  const targetPosition = new Vector3(
    center.x + xOffset,
    center.y + cameraHeight,
    center.z
  );
  // 保持镜头看向建筑中心（可选项）
  const lookAtPoint = new Vector3(
    center.x - xOffset * 20, // 轻微反向偏移增加画面动态感
    center.y + 10000,
    center.z
  );
  // 动画参数
  const duration = 1200;
  const startTime = Date.now();
  const startPos = camera.position.clone();

  // 创建俯视方向四元数
  const targetQuaternion = new Quaternion().setFromUnitVectors(
    new Vector3(0, 0, -1), // 默认镜头方向
    new Vector3(0, -1, 0) // 俯视方向
  );

  // 动画循环
  const animate = () => {
    const elapsed = Math.min((Date.now() - startTime) / duration, 1);
    const t = easeOutQuad(elapsed);

    // 位置插值
    camera!.position.lerpVectors(startPos, targetPosition, t);

    // 旋转插值
    camera!.quaternion.slerp(targetQuaternion, t);

    // 强制看向中心点（防止偏移）
    camera!.lookAt(lookAtPoint);
    camera!.updateProjectionMatrix();

    if (elapsed < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
// 高亮建筑核心方法
const highlightBuilding = (building: Building) => {
  const rawObj = toRaw(building);

  // 类型安全校验
  if (!(rawObj.type === "Object3D")) {
    console.warn("Object is not a Three.js object:", rawObj);
    return;
  }

  // 递归遍历对象树
  rawObj.traverse((child: any) => {
    // 只处理网格和线段
    if (
      child.constructor.name === "Mesh" ||
      child.constructor.name === "LineSegments"
    ) {
      // 保存原始材质
      const originalMaterial = child.material.clone();
      child.userData.originalMaterial = originalMaterial;

      let highlightMat: Material;
      if (child.constructor.name === "Mesh") {
        // 网格材质
        highlightMat = new MeshPhongMaterial({
          color: 0xff0030,
          shininess: 100,
        });
      } else {
        // 线段材质（根据你的对象类型）
        highlightMat = new LineBasicMaterial({
          color: 0xff0030,
          linewidth: 2,
        });
      }

      // 应用材质并添加动画
      gsap.to(highlightMat, {
        r: 0.8,
        duration: 1,
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if ("needsUpdate" in highlightMat) {
            highlightMat.needsUpdate = true;
          }
        },
      });

      child.material = highlightMat;
    }
  });
};
// 恢复建筑原色
const resetBuildingColor = (building: Building) => {
  building.traverse((obj: any) => {
    if (
      obj.constructor.name === "Mesh" ||
      obj.constructor.name === "LineSegments"
    ) {
      obj.material.dispose(); // 释放高亮材质
      obj.material = obj.userData.originalMaterial;
      delete obj.userData.originalMaterial;
    }
  });
};
// const mouseDown = (mouseEvent: any, intersects: any) => {
//   if (intersects.object.sid) {
//     // 获取相机实例（修正此处）
//     const camera = vue3dLoaderRef.value.camera as PerspectiveCamera;
//     // 修改后（正确：世界坐标）
//     const targetPosition = new Vector3();
//     intersects.object.getWorldPosition(targetPosition); // 重要！

//     // 定义动画参数
//     const duration = 1000;
//     const startTime = Date.now();

//     // 初始相机参数
//     const startPos = new Vector3().copy(camera.position);
//     const startFov = camera.fov;

//     // 计算目标位置
//     // 修改后（正确方向：从相机指向目标）
//     const direction = new Vector3()
//       .subVectors(targetPosition, camera.position)
//       .normalize();

//     const box = new Box3().setFromObject(intersects.object);
//     const size = box.getSize(new Vector3()).length();
//     const center = new Vector3();
//     box.getCenter(center);
//     // 动态设置距离（例如物体尺寸的2倍）
//     const endPos = targetPosition.clone().add(
//       direction.multiplyScalar(size) // 自动适配距离
//     );
//     console.log(direction, endPos);
//     // 动画循环
//     const animate = () => {
//       const elapsed = Math.min((Date.now() - startTime) / duration, 1);
//       const t = easeOutQuad(elapsed);

//       // 更新相机参数
//       camera.position.lerpVectors(startPos, endPos, t);
//       camera.fov = MathUtils.lerp(startFov, 30, t);

//       camera.lookAt(center);
//       camera.updateProjectionMatrix();

//       // 自动触发渲染（无需手动调用）
//       // vue3dLoader 内部应已处理渲染循环

//       if (elapsed < 1) requestAnimationFrame(animate);
//     };

//     requestAnimationFrame(animate);
//   }
// };
const easeOutQuad = (t: number) => {
  return t * (2 - t);
};
const mouseUp = () => {};
const mouseMove = () => {};
</script>

<style scoped>
.vue3dLoader {
  height: 100vh;
  width: 100%;
}
</style>
