<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const menuList = ref([
  {
    name: "threeJs模型加载",
    url: "/chapter2",
  },
  {
    name: "天地图定位-飞行",
    url: "/chapter3",
  },
  {
    name: "cesuim-Json加载",
    url: "/chapter4",
  },
  {
    name: "cesuim-tiles",
    url: "/chapter5",
  },
  {
    name: "cesuim-标记",
    url: "/chapter6",
  },
  {
    name: "cesuim-电子围栏",
    url: "/chapter7",
  },
]);
const router = useRouter();
const toClick = (value: string) => {
  router.push(value);
};
</script>

<template>
  <div class="menu-demo">
    <a-menu
      mode="horizontal"
      theme="dark"
      :default-selected-keys="[0]"
      @sub-menu-click="toClick"
    >
      <a-menu-item
        v-for="(item, index) in menuList"
        :key="index"
        @click="toClick(item.url)"
        >{{ item.name }}</a-menu-item
      >
    </a-menu>
  </div>
  <router-view />
</template>

<style>
body {
  margin: 0px;
}
#cesiumContainer {
  height: calc(100vh-50px) !important;
}
</style>
