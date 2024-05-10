<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { saveAs } from 'file-saver'
import {
  getGeneratorVoByIdUsingGet,
  useGeneratorUsingPost,
} from '~/autoapi/api/generatorController.ts'
import router from '~/router'

const loading = shallowRef(false)
const route = useRoute()

const generatorData = ref<any>({})

const id = route.params.id as string
const activeKey = ref([])
const formRef = ref<FormInstance>()

const formState = reactive({})

/**
 * 加载数据
 */
async function loadData() {
  if (!id)
    return
  loading.value = true
  try {
    const res = await getGeneratorVoByIdUsingGet({ id })
    generatorData.value = res.data || {}
    for (const generator of generatorData.value.modelConfig?.models || []) {
      if (generator.groupKey && !formState[generator.groupKey])
        formState[generator.groupKey] = {}
    }
  }
  catch (error: any) {
    message.error(`获取数据失败，${error.message}`)
  }
  loading.value = false
}

watchEffect(() => {
  loadData()
})

async function useGenerator() {
  const res = await useGeneratorUsingPost(
    {
      id,
      dataModel: toRaw(formState),
    },
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
  <div h-full flex flex-col flex-1 max-w-1070px w-1070px mx-auto mt>
    <a-card>
      <a-row justify="space-between" :gutter="[32, 32]">
        <a-col flex="auto">
          <a-space size="large" align="center">
            <a-typography-title :level="4">
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
          <div style="margin-bottom: 24px" />
          <a-form
            v-for="generator in generatorData.modelConfig?.models"
            ref="formRef"
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
          >
            <template v-if="!generator.groupKey">
              <a-form-item :label="generator.description">
                <a-input v-if="generator.type === 'String'" v-model:value="formState[generator.fieldName]" />
                <a-radio-group v-if="generator.type === 'boolean'" v-model:value="formState[generator.fieldName]">
                  <a-radio value="true">
                    是
                  </a-radio>
                  <a-radio value="false">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
            <template v-if="generator.groupKey">
              <a-collapse v-model:activeKey="activeKey" collapsible="header">
                <a-collapse-panel :key="generator.groupKey" :header="`${generator.groupName}(分组)`" mb>
                  <template v-for="el in generator.models">
                    <a-form-item :label="el.description">
                      <a-input
                        v-if="el.type === 'String'"
                        v-model:value="formState[generator.groupKey][el.fieldName]"
                      />
                      <a-radio-group
                        v-if="el.type === 'boolean'"
                        v-model:value="formState[generator.groupKey][el.fieldName]"
                      >
                        <a-radio value="true">
                          是
                        </a-radio>
                        <a-radio value="false">
                          否
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </template>
                </a-collapse-panel>
              </a-collapse>
            </template>
          </a-form>
          <a-space size="middle" style="margin-top: 10px" >
            <a-button type="primary" @click="useGenerator">
              <template #icon>
                <DownloadOutlined />
              </template>
              生成代码
            </a-button>
            <a-button
              @click="router.push({
                name: '生成器详情',
                params: { id: generatorData.id },
              })"
            >
              查看详情
            </a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image :src="generatorData.picture" />
        </a-col>
      </a-row>
    </a-card>
    <div style="margin-bottom: 24px" />
  </div>
</template>

<style scoped lang="less">
:deep(.ant-col-8) {
  display: block;
  flex: none;
  max-width: 33.33333333333333%;
}
</style>
