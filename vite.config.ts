import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  base: '/threeDemo/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 核心配置

    }
  }
})
