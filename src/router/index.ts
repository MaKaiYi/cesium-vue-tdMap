/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-20 16:24:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-04 16:30:08
 * @FilePath: /threejs-vite-vue/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory('/threeDemo/'),

  routes: [
    {
      path: '/chapter1',
      name: 'Home',
      component: () => import('../lesson/chapter1/index.vue'),
      meta: {
        title: '1'
      }
    },
    {
      path: '/chapter2',
      name: 'Home2',
      component: () => import('../lesson/chapter2/index.vue'),
      meta: {
        title: '2'
      }
    },
    {
      path: '/chapter3',
      name: 'Home3',
      component: () => import('../lesson/chapter3/index.vue'),
      meta: {
        title: '3'
      }
    },
    {
      path: '/chapter4',
      name: 'Home4',
      component: () => import('../lesson/chapter4/index.vue'),
      meta: {
        title: '4'
      }
    },
    {
      path: '/chapter5',
      name: 'Home5',
      component: () => import('../lesson/chapter5/index.vue'),
      meta: {
        title: '5'
      }
    },
    {
      path: '/chapter6',
      name: 'Home6',
      component: () => import('../lesson/chapter6/index.vue'),
      meta: {
        title: '6'
      }
    },
    {
      path: '/chapter7',
      name: 'Home7',
      component: () => import('../lesson/chapter7/index.vue'),
      meta: {
        title: '7'
      }
    },

  ],
});


export default router;
