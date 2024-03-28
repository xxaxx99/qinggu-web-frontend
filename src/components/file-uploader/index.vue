<script setup lang="ts">
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue'

interface UploadProps {
  biz: string
  value: UploadFile[]
  description?: string
}
const props = withDefaults(defineProps<UploadProps>(), {
  biz: '',
  // eslint-disable-next-line vue/require-valid-default-prop
  value: [],
  description: '',
})

const fileList = ref([])
function handleChange(info: UploadChangeParam) {
  const status = info.file.status
  if (status !== 'uploading')
    console.log(info.file, info.fileList)

  if (status === 'done')
    message.success(`${info.file.name} file uploaded successfully.`)
  else if (status === 'error')
    message.error(`${info.file.name} file upload failed.`)
}
function handleDrop(e: DragEvent) {
  console.log(e)
}
</script>

<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
    @drop="handleDrop"
    class="fileUploader"
  >
    <p class="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p class="ant-upload-text">
      点击或者拖拽文件上传
    </p>
    <p class="ant-upload-hint">
      {{props.description}}
    </p>
  </a-upload-dragger>
</template>

<style scoped lang="less">
.fileUploader {
  display: block;
  width: 460px;
  margin: 0 auto;
}
</style>
