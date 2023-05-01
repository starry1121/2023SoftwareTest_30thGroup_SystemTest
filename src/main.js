import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios"
import GoEasy from 'goeasy'

const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
  appkey:"BC-ffca8c4227f1465488ef31dd1d73c521",
  modules: ['im'],
});

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$axios = axios
app.provide('GoEasy', GoEasy);
app.provide('goEasy', goEasy);
app.use(router).mount('#app')