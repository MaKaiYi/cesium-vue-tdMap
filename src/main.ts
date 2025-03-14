import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue'
import vue3dLoader from 'vue-3d-loader'
import * as Cesium from 'cesium'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYzVmZjMyNi1mOWNhLTQxYzctYWM4OS0wNWIyN2RlN2YzOTUiLCJpZCI6Mjc5MjkwLCJpYXQiOjE3NDA1NjMxNDJ9.Lu4CYihhKEh2gc56C3s0PRM4x6orU6UwahDMAwvR4OI'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

createApp(App).use(vue3dLoader).use(ArcoVue, { componentPrefix: 'arco' }).use(antDesignVue).use(router).mount('#app')
