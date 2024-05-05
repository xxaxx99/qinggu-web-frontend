<script setup lang="ts">
import { FileOutlined } from '@ant-design/icons-vue'
import ModelConfig = Api.ModelConfig
import ModelDescription from '~/pages/Generator/Detail/components/ModelDescription.vue'
const modelConfigProps = withDefaults(defineProps<ModelConfigProps>(), {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  data: '',
})
interface ModelConfigProps {
  data: ModelConfig
}

const modelConfig = ref(modelConfigProps.data)
setTimeout(() => {
  modelConfig.value = modelConfigProps.data
}, 500)
</script>

<template>
  <a-descriptions>
    <template #title>
      <FileOutlined />
      模型列表
    </template>
  </a-descriptions>
  <ModelDescription :column="2" :model-config="modelConfig" />
  <a-descriptions v-for="(model, index) in modelConfig.models" :column="1">
    <template v-if="model.groupKey && index != 0" #title>
      <FileOutlined />
      核心模板
    </template>
    <template v-if="model.groupKey">
      <a-descriptions-item label="分组key">
        {{ model.groupKey }}
      </a-descriptions-item>
      <a-descriptions-item label="分组名">
        {{ model.groupName }}
      </a-descriptions-item>
      <a-descriptions-item label="条件">
        {{ model.condition }}
      </a-descriptions-item>
      <a-descriptions-item label="组内文件">
        <div>
          <ModelDescription :column="2" :model-config="model" />
        </div>
      </a-descriptions-item>
    </template>
  </a-descriptions>
  <div style="margin-bottom: 16px" />
</template>

<style scoped lang="less">

</style>
