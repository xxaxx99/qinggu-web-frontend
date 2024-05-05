<script setup lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { isEqual } from 'lodash-es'
import type { UserInfo } from '~/api/common/user.ts'
import { updateUserUsingPost } from '~/autoapi/api/userController.ts'
import { uploadFileUsingPost } from '~/autoapi/api/fileController.ts'

const { t } = useI18n()
const reload = inject('reload', () => {
})
const userStore = useUserStore()
const { userInfo } = useUserStore()
const formRef = ref()
const labelCol = { span: 0 }
const wrapperCol = { span: 13 }
const originalFormState = ref<UserInfo>({
  id: userInfo!.id,
  userName: userInfo!.userName,
  userAvatar: userInfo!.userAvatar,
  userProfile: userInfo!.userProfile,
})

const formState = ref<UserInfo>({...originalFormState.value})

async function onSubmit(values: any) {
  console.log(originalFormState.value)
  console.log(values)
  if (isEqual(originalFormState.value, toRaw(values))) {
    message.warning({
      title: '提示',
      content: '您尚未进行任何修改！',
    })
    return
  }
  try {
    const res = await updateUserUsingPost(values) as any
    if (res.code === 0) {
      message.success('修改成功')
      // 更新 userInfo
      userStore.userInfo = { ...userStore.userInfo, ...values }
      originalFormState.value.userName = userStore.userInfo!.userName
      originalFormState.value.userAvatar = userStore.userInfo!.userAvatar
      originalFormState.value.userProfile = userStore.userInfo!.userProfile
    }
  }
  catch (error: any) {
    console.log(error)
  }
}

async function customRequest(fileObj: any) {
  try {
    const res = await uploadFileUsingPost(
      { biz: 'user_avatar' },
      fileObj.file,
    ) as any
    // @ts-expect-error
    userStore.userInfo = {
      ...userStore.userInfo,
      userAvatar: res.data
    };
    originalFormState.value.userAvatar = userStore.userInfo!.userAvatar;
    reload()
  }
  catch (e: any) {
    message.error(`上传失败，${e.message}`)
  }
}
</script>

<template>
  <a-card :title="t('account.settings.basic-setting')" :bordered="false">
    <a-row>
      <a-col :span="12">
        <a-form
          ref="formRef"
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item :label-col="{ span: 24 }" :label="t('account.settings.form-name')" name="name">
            <a-input
              v-model:value="formState.userName" :placeholder="t('account.settings.form-input-plac')"
              style="width: 320px;"
            />
          </a-form-item>
          <a-form-item name="desc" :label="t('account.settings.form-desc')" :label-col="{ span: 24 }">
            <a-textarea
              v-model:value="formState.userProfile" :placeholder="t('account.settings.form-input-plac')"
              style="width: 320px"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSubmit(formState)">
              {{ t('account.settings.form-submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="4">
        <p>
          {{ t('account.settings.basic-avatar') }}
        </p>
        <div class="flex flex-col items-center">
          <a-avatar :size="100"  :key="originalFormState?.userAvatar">
            <template #icon>
              <img :src="originalFormState.userAvatar" alt="">
            </template>
          </a-avatar>
          <a-upload
            name="file"
            :file-list="[]"
            :custom-request="customRequest"
          >
            <a-button class="mt-4">
              <UploadOutlined />
              {{ t('account.settings.basic-avatar.upload') }}
            </a-button>
          </a-upload>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped lang="less">
:deep(textarea:where(.css-dev-only-do-not-override-metyi7).ant-input) {
  max-width: none;
  height: auto;
  min-height: 32px;
  line-height: 1.5714285714285714;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
  resize: vertical;
}
</style>
