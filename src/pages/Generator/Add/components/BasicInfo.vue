<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import GeneratorAddRequest = Api.GeneratorAddRequest

const formRef = ref<FormInstance>()
const formState = reactive<GeneratorAddRequest>({
  name: '',
  description: '',
  basePackage: '',
  version: '',
  author: '',
  // enableVersionControl: '',
  // enableMandatoryInteraction: '',
  tags: undefined,
})
const enableVersionControl = ref<string>('')
const enableMandatoryInteraction = ref<string>('')
</script>

<template>
  <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal" style="width: 420px">
    <a-form-item
      name="name"
      label="名称"
    >
      <a-input v-model:value="formState.name" placeholder="请输入" />
    </a-form-item>
    <a-form-item
      name="description"
      label="描述"
    >
      <a-textarea v-model:value="formState.fileConfig" placeholder="请输入描述" />
    </a-form-item>
    <a-form-item name="basePackage" label="基础包">
      <a-input v-model:value="formState.basePackage" placeholder="请输入基础包" />
    </a-form-item>
    <a-form-item name="version" label="版本">
      <a-input v-model:value="formState.version" placeholder="请输入版本" />
    </a-form-item>
    <a-form-item name="author" label="作者">
      <a-input v-model:value="formState.author" placeholder="请输入作者" />
    </a-form-item>
    <div style="width: 108px">
      <a-form-item label="开启版本控制">
        <a-radio-group v-model:value="enableVersionControl">
          <a-radio value="true">
            是
          </a-radio>
          <a-radio value="false">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="开启强制交互">
        <a-radio-group v-model:value="enableMandatoryInteraction">
          <a-radio value="true">
            是
          </a-radio>
          <a-radio value="false">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </div>
    <a-form-item name="tags" label="标签">
      <a-select
        v-model:value="formState.tags"
        mode="tags"
        style="width: 100%"
        placeholder="请输入标签"
        auto-clear-search-value
      />
    </a-form-item>
    <div style="width: min-content">
      <span style="float: left">图片</span>
      <picture-uploader style="margin-top: 15px" />
    </div>
  </a-form>
</template>

<style scoped lang="less">

</style>
