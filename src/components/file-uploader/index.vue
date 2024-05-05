<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue'
import {uploadFileUsingPost} from "~/autoapi/api/fileController.ts";

interface UploadProps {
  biz: string
  value: UploadFile[]
  description?: string
}
const props = withDefaults(defineProps<UploadProps>(), {
  biz: '',
  //@ts-expect-error
  value: [] as UploadFile[],
  description: '',
})

const fileList = ref<any[]>([])
const fileStore = useFileStore();
// 初始化时从 Pinia store 中获取 fileList
setTimeout(() => { fileList.value = fileStore.fileList }, 200)
const customRequest = async (fileObj: any) => {
  try {
    const res = await uploadFileUsingPost(
        {biz: props.biz},
        fileObj.file,
    ) as any
    if (res.code === 40000)
      message.error(`上传失败，${res.message}`)
    fileObj.onSuccess(res.data)
    fileStore.addFile({
      uid: fileObj.file.uid,
      name: fileObj.file.name,
      status: 'done',
      url: res.data,
    }) // 将图片信息存储到 Pinia store 中
  } catch (e: any) {
    message.error(`上传失败，${e.message}`)
    fileObj.onError(e)
  }
}
</script>

<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    list-type="text"
    name="file"
    :multiple="false"
    :max-count="1"
    :custom-request="customRequest"
    @remove="fileStore.clearFileList()"
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
