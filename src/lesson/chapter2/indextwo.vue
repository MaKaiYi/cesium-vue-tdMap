<!-- <template>
  <vue3dLoader
    class="vue3dLoader"
    :showFps="true"
    :filePath="['../../../static/scenedata.glb']"
    :mtlPath="[null, '/obj/2.mtl', null]"
    :fileType="fileType"
    :position="position"
    :rotation="rotation"
    @load="onLoad()"
    :cameraPosition="cameraPosition"
    :bgColor="bgColor"
    outputEncoding="sRGB"
    :parallelLoad="true"
    :autoPlay="true"
    :labels="labels"
    :enableDamping="true"
    :dampingFactor="0.1"
    :intersectRecursive="true"
    :lights="lights"
    :backgroundAlpha="1"
    :scale="scale"
    @mouseDown="mouseDown"
    @mouseUp="mouseUp"
    @mousemove="mouseMove"
    ref="vue3dLoaderRef"
  ></vue3dLoader>
</template>

<script setup lang="ts">
import { ref } from "vue";
import bgImage from "../../../static/image/back.jpg";

const fileType = ["glb", "gltf"];
const vue3dLoaderRef = ref();
const position = ref([{ x: 0, y: 0, z: 0 }]);
const rotation = ref();
rotation.value = {
  x: -Math.PI / 2,
  y: 0,
  z: 0,
};
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
  {
    image: bgImage,
    position: { x: 0, y: 100, z: 0 },
    scale: { x: 20, y: 20, z: 20 },
    sid: 1, // custom id
  },
  {
    text: "Top",
    textStyle: {
      fontFamily: "Arial",
      fontSize: 18,
      fontWeight: "normal",
      curror: "pointer",
      lineHeight: 1,
      color: "#fff",
      borderWidth: 8,
      borderRadius: 4,
      borderColor: "rgba(0,0,0,1)",
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
    position: { x: 20, y: 80, z: 0 },
    scale: { x: 15, y: 15, z: 0 },
    sid: 2,
  },
]);
const cameraPosition = ref({ x: 200, y: 200, z: 0 });
const mouseDown = (mouseEvent: any, intersects: any) => {
  console.log(mouseEvent, intersects); // mouseEvent: MouseEvent, intersects: Intersects[] | null
};
const sceneData = ref([]) as any;
const onLoad = () => {
  rotate();
  sceneData.value = vue3dLoaderRef.value.scene.children;
  sceneData.value["6"].children.forEach((item: any) => {
    if (item.name === "住宅楼32_2") {
      addImageLabel(item.position, "../../../static/image/back.jpg");
    }
  });
};
const addImageLabel = (position: any, imagePath: any) => {
  // 创建并添加标签到场景（需根据实际组件 API 调整）
  // labels.value.push({
  //   image: imagePath,
  //   position: { x: position.x, y: position.y + 50, z: position.z },
  //   scale: { x: 200, y: 200, z: 100 },
  //   sid: 3,
  // });
};
const rotate = () => {
  requestAnimationFrame(rotate);
  rotation.value.z -= 0.01;
};
const mouseUp = () => {};
const object = ref(null);
const mouseMove = () => {};
</script>

<style scoped>
.vue3dLoader {
  height: 100vh;
  width: 100%;
}
</style> -->
