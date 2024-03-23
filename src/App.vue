<script setup lang="ts">
import { useLayoutMenuProvide } from '~/components/page-container/context.ts'

const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
const { antd } = useI18nLocale()
const layoutMenu = useLayoutMenu()
useLayoutMenuProvide(layoutMenu, appStore)

const isRouterAlive = ref(true)
function reload() {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<template>
  <a-config-provider :theme="theme" :locale="antd">
    <a-app class="h-full font-chinese antialiased">
      <TokenProvider>
        <RouterView v-if="isRouterAlive" :key="$route.path" />
      </TokenProvider>
    </a-app>
  </a-config-provider>
</template>
