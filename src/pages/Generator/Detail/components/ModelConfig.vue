<template>
  <div>
<!--    <a-descriptions :column="2" v-for="model in modelConfig.data">-->
<!--      <template #title>-->
<!--        <FileOutlined /> 模型列表-->
<!--      </template>-->
<!--      <a-descriptions-item label="字段名称">{{model.fieldName}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="类型">{{model.type}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="描述">{{model.description}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="默认值">{{model.defaultValue}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="缩写">{{model.abbr}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="条件">{{model.condition}}</a-descriptions-item>-->
<!--    </a-descriptions>-->
<!--    <div style="margin-bottom: 16px"/>-->
<!--    <a-descriptions :column="1">-->
<!--      <template #title>-->
        <FileOutlined /> 模型配置
<!--      </template>-->
<!--      <a-descriptions-item label="分组key">{{modelConfig.data.files}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="分组名">{{modelConfig.data.outputRootPath}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="条件">{{modelConfig.data.sourceRootPath}}</a-descriptions-item>-->
<!--      <a-descriptions-item label="组内文件">{{modelConfig.data.type}}</a-descriptions-item>-->
<!--    </a-descriptions>-->
    {{modelConfig}}
  </div>
</template>

<script setup lang="ts">
import { FileOutlined } from '@ant-design/icons-vue';
import ModelConfig = Api.ModelConfig;
interface ModelConfigProps {
  data: ModelConfig
}
const modelConfigProps = withDefaults(defineProps<ModelConfigProps>(),{
  //@ts-expect-error
  data: ''
})
const modelConfig = modelConfigProps.data
</script>

<style scoped lang="less">

</style>