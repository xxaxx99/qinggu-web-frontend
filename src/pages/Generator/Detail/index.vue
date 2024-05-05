<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'
import moment from 'moment'
import { downloadGeneratorByIdUsingGet, getGeneratorVoByIdUsingGet } from '~/autoapi/api/generatorController.ts'
import BasicInfo from '~/pages/Generator/Detail/components/BasicInfo.vue'
import ModelConfig from '~/pages/Generator/Detail/components/ModelConfig.vue'
import GeneratorVO = Api.GeneratorVO
import router from '~/router'

// eslint-disable-next-line import/order
import { saveAs } from 'file-saver'

const activeKey = ref('1')
const userStore = useUserStore()
const userId = ref(userStore.userInfo?.id)
const loading = shallowRef(false)
const route = useRoute()

const generatorData = ref<GeneratorVO>({})

const id = ref(route.params.id)

/**
 * 加载数据
 */
async function loadData() {
  if (!id.value)
    return

  loading.value = true
  try {
    const res = await getGeneratorVoByIdUsingGet({ id: id.value as string }) as any
    generatorData.value = res.data || {}
  }
  catch (error: any) {
    message.error(`获取数据失败，${error.message}`)
  }
  loading.value = false
}

watchEffect(() => {
  loadData()
})

function updateGenerator() {
  router.push({
    path: '/generator/update',
    query: {
      id: generatorData.value.id,
    },
  })
}

async function downloadGenerator() {
  const res = await downloadGeneratorByIdUsingGet(
    { id: id.value as string },
    {
      responseType: 'blob',
    },
  )
  const blob = new Blob([res.data])
  const fullPath = generatorData.value.distPath || ''
  saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1))
}
</script>

<template>
  <div h-full flex flex-col flex-1 max-w-1152px w-1152px mx-auto>
    <div>
      <a-card>
        <a-row justify="space-between" :gutter="[32, 32]">
          <a-col flex="auto">
            <a-space size="large" align="center">
              <a-typography-title :level="4" style="margin-bottom: 16px;">
                {{ generatorData.name }}
              </a-typography-title>
              <a-tag
                v-for="(item, index) in generatorData.tags" :key="index" color="blue"
                style="margin-bottom: 16px;margin-right: -10px;"
              >
                {{ item }}
              </a-tag>
            </a-space>
            <a-typography-paragraph type="secondary">
              {{ generatorData.description }}
            </a-typography-paragraph>
            <a-typography-paragraph type="secondary">
              创建时间：{{ moment(generatorData.createTime).format('YYYY-MM-DD hh:mm:ss') }}
            </a-typography-paragraph>
            <a-typography-paragraph type="secondary">
              基础包：{{ generatorData.basePackage }}
            </a-typography-paragraph>
            <a-typography-paragraph type="secondary">
              版本：{{ generatorData.version }}
            </a-typography-paragraph>
            <a-typography-paragraph type="secondary">
              作者：{{ generatorData.author }}
            </a-typography-paragraph>
            <div style="margin-bottom: 24px" />
            <a-space size="middle">
              <a-button
                type="primary" @click="router.push({
                  name: '使用生成器',
                  params: { id: generatorData.id },
                })"
              >
                立即使用
              </a-button>
              <a-button @click="downloadGenerator">
                <template #icon>
                  <DownloadOutlined />
                </template>
                下载
              </a-button>
              <a-button v-if="userId === generatorData.userId" @click="updateGenerator">
                <template #icon>
                  <EditOutlined />
                </template>
                编辑
              </a-button>
            </a-space>
          </a-col>
          <a-col flex="320px">
            <a-image :src="generatorData.picture" />
          </a-col>
        </a-row>
      </a-card>
      <div style="margin-bottom: 24px" />

      <a-card>
        <a-tabs v-model:activeKey="activeKey" size="large" defa>
          <a-tab-pane key="1" tab="模型配置">
            <ModelConfig :data="generatorData.modelConfig" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="作者信息">
            <BasicInfo :data="generatorData.user" />
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
