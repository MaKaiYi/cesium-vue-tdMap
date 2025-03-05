/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-02-20 16:09:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-03-05 10:28:46
 * @FilePath: /threejs-vite-vue/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  base: '/threeDemo/',
  server: {
    port: 8080,
    open: true,
    cors: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 接口的域名
        ws: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace("^/api", '/Demodata')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 核心配置
    }
  },

})
