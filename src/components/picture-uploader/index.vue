<script lang="ts" setup>
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { UploadFile, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { uploadFileUsingPost } from '~/autoapi/api/fileController.ts'
import type { FileListItem } from '~/stores/upload-picture.ts'

interface Props {
  biz: string
  value?: UploadFile[]
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  biz: '',
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  value: [] as UploadFile[],
  description: '',
})

const fileList = ref<FileListItem[]>([])
const pictureStore = usePictureStore()
// 初始化时从 Pinia store 中获取 fileList
setTimeout(() => {
  fileList.value = pictureStore.fileList
}, 200)

const previewVisible = ref(false)
const previewImage = ref('')

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
async function handlePreview(file: UploadProps['fileList'][number]) {
  if (!file.url && !file.preview)
    file.preview = (await getBase64(file.originFileObj)) as string

  previewImage.value = file.url || file.preview
  previewVisible.value = true
}

function handleCancel() {
  previewVisible.value = false
}

async function customRequest(fileObj: any) {
  try {
    const res = await uploadFileUsingPost(
      { biz: props.biz },
      fileObj.file,
    ) as any
    if (res.code === 40000)
      message.error(`上传失败，${res.message}`)
    fileObj.onSuccess(res.data)
    pictureStore.addFile({
      uid: fileObj.file.uid,
      name: fileObj.file.name,
      status: 'done',
      url: res.data,
    }) // 将图片信息存储到 Pinia store 中
  }
  catch (e: any) {
    message.error(`上传失败，${e.message}`)
    fileObj.onError(e)
  }
}
</script>

<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      name="user_avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :custom-request="customRequest"
      :max-count="1"
      method="post"
      style="margin-top: 12px"
      @remove="pictureStore.clearFileList()"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 1">
        <PlusOutlined />
        <div style="margin-top: 8px">
          上传
        </div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage">
    </a-modal>
  </div>
</template>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
