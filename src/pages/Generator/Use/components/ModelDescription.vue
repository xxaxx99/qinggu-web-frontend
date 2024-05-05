<template>
  <template v-for="model in modelConfig.models" :key="model.fieldName">
    <a-descriptions :column="column">
      <template v-if="!model.groupKey">
        <a-descriptions-item label="字段名称">{{ model.fieldName }}</a-descriptions-item>
        <a-descriptions-item label="类型">{{ model.type }}</a-descriptions-item>
        <a-descriptions-item label="描述">{{ model.description }}</a-descriptions-item>
        <a-descriptions-item label="默认值">{{ model.defaultValue }}</a-descriptions-item>
        <a-descriptions-item label="缩写">{{ model.abbr }}</a-descriptions-item>
        <a-descriptions-item label="条件">{{ model.condition }}</a-descriptions-item>
      </template>
    </a-descriptions>
    <a-divider v-if="!model.groupKey"/>
  </template>
</template>

<script setup lang="ts">
import ModelConfig = Api.ModelConfig;

interface descriptionsProps {
  column: number
  modelConfig: ModelConfig
}

const modelConfigProps = withDefaults(defineProps<descriptionsProps>(), {
  column: 1,
  //@ts-expect-error
  modelConfig: {}
})
console.log(modelConfigProps)

</script>

<style scoped lang="less">

</style>