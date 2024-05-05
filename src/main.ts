import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { App } from 'vue'
import Root from './App.vue'
import { setupI18n } from './locales'
import {
  setupAccessDirective,
  setupLoadingDirective,
} from './directive'
import router from '~/router'
import '~/router/router-guard'
import 'ant-design-vue/dist/reset.css'
import '~/assets/styles/reset.css'
import 'uno.css'

const pinia = createPinia()
import JsonViewer from 'vue-json-viewer'

async function start() {
  const app: App = createApp(Root)
  app.use(pinia)
  await setupI18n(app)
  setupDirective(app)
  app.use(router)
  app.use(JsonViewer)
  app.mount('#app')
  app.config.performance = true
}

function setupDirective(app: App) {
  // 注册loading自定义指令
  setupLoadingDirective(app)
  setupAccessDirective(app)
}
start()
