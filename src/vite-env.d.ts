/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-20 16:09:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-02-27 15:50:09
 * @FilePath: /threejs-vite-vue/src/vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// src/typings.d.ts
declare module "*.geojson" {
  const value: {
    type: string;
    features: Array<{
      type: string;
      geometry: {
        type: string;
        coordinates: number[][][] | number[][][][];
      };
      properties: Record<string, any>;
    }>;
  };
  export default value;
}