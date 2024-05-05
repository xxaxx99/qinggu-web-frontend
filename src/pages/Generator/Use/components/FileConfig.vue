<template>
  <div>
    <a-descriptions :column="2">
      <template #title>
        <InfoCircleOutlined /> 基本信息
      </template>
      <a-descriptions-item label="输入根路径">{{fileConfig.inputRootPath}}</a-descriptions-item>
      <a-descriptions-item label="输出根路径">{{fileConfig.outputRootPath}}</a-descriptions-item>
      <a-descriptions-item label="项目根路径">{{fileConfig.sourceRootPath}}</a-descriptions-item>
      <a-descriptions-item label="文件类别">{{fileConfig.type}}</a-descriptions-item>
    </a-descriptions>
    <div style="margin-bottom: 16px"/>
    <a-descriptions :column="1">
      <template #title>
        <FileOutlined /> 文件列表
      </template>
      <a-descriptions-item label="分组key">{{fileConfig.files}}</a-descriptions-item>
      <a-descriptions-item label="分组名">{{fileConfig.outputRootPath}}</a-descriptions-item>
      <a-descriptions-item label="条件">{{fileConfig.sourceRootPath}}</a-descriptions-item>
      <a-descriptions-item label="组内文件">{{fileConfig.type}}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts">
import { InfoCircleOutlined,FileOutlined } from '@ant-design/icons-vue';
import FileConfig = Api.FileConfig;
interface FileConfigProps {
  data: Api.FileConfig
}
const fileConfigProps = withDefaults(defineProps<FileConfigProps>(),{
  //@ts-expect-error
  data: ''
})
const fileConfig:FileConfig = fileConfigProps.data
</script>

<style scoped lang="less">

</style>