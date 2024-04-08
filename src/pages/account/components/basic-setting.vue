<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import {UserInfo} from "~/api/common/user.ts";
import {updateUserUsingPost} from "~/autoapi/api/userController.ts";
import {message} from "ant-design-vue";

const { t } = useI18n()

const { userInfo } = useUserStore();
const formRef = ref()
const labelCol = { span: 0 }
const wrapperCol = { span: 13 }
// @ts-expect-error
const formState: UnwrapRef<UserInfo> = reactive({
  id:userInfo?.id,
  userName: userInfo?.userName,
  userAvatar: userInfo?.userAvatar,
  userProfile: userInfo?.userProfile,
})

const onSubmit = async (values) => {
  console.log(values)
  try {
      const res = await updateUserUsingPost(values) as any;
      if (res.code === 0){
        message.success('更新成功')
      }
  }catch (error: any){
    console.log(error)
  }
}

function handleChange() {
  console.log('change')
}
</script>

<template>
<!--  todo 修改-->
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
            <a-input v-model:value="formState.userName" :placeholder="t('account.settings.form-input-plac')" style="width: 320px;" />
          </a-form-item>
          <a-form-item name="desc" :label="t('account.settings.form-desc')" :label-col="{ span: 24 }">
            <a-textarea v-model:value="formState.userProfile" :placeholder="t('account.settings.form-input-plac')" />
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
          <a-avatar :size="100">
            <template #icon>
              <img :src="userInfo?.userAvatar" alt="">
            </template>
          </a-avatar>
          <a-upload
            name="file"
            :file-list="[]"
            @change="handleChange"
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
