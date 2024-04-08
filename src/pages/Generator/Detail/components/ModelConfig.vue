<template>
  <a-descriptions>
    <template #title>
      <FileOutlined/>
      模型列表
    </template>
  </a-descriptions>
  <MyDescription :column="2" :model-config="modelConfig"/>
  <a-descriptions :column="1" v-for="(model,index) in modelConfig.models">
    <template #title v-if="model.groupKey && index != 0">
      <FileOutlined/>
      核心模板
    </template>
    <template v-if="model.groupKey">
      <a-descriptions-item label="分组key">{{model.groupKey}}</a-descriptions-item>
      <a-descriptions-item label="分组名">{{model.groupName}}</a-descriptions-item>
      <a-descriptions-item label="条件">{{model.condition}}</a-descriptions-item>
      <a-descriptions-item label="组内文件">
        <div>
          <MyDescription :column="2" :model-config="model"/>
        </div>
      </a-descriptions-item>
    </template>
  </a-descriptions>
  <div style="margin-bottom: 16px"/>
</template>

<script setup lang="ts">
import {FileOutlined} from '@ant-design/icons-vue';
import ModelConfig = Api.ModelConfig;
import MyDescription from "~/pages/Generator/Detail/components/MyDescription.vue";

interface ModelConfigProps {
  data: ModelConfig
}

const modelConfigProps = withDefaults(defineProps<ModelConfigProps>(), {
  //@ts-expect-error
  data: ''
})
const modelConfig = ref(modelConfigProps.data)
setTimeout(() => {
  modelConfig.value = modelConfigProps.data
}, 200)
</script>

<style scoped lang="less">

</style>