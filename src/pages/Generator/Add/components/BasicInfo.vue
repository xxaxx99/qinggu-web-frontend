<script setup lang="ts">
import GeneratorAddRequest = Api.GeneratorAddRequest
import GeneratorEditRequest = Api.GeneratorEditRequest;
import {ref} from "vue";

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
// 父组件在哪
const formStateProps = props.formState
const oldData = ref(props.oldData)
const formState = reactive<GeneratorAddRequest>(formStateProps)

const temp = () => {
  oldData.value = props.oldData
}
setTimeout(() => { temp() }, 500)

</script>

<template>
  <template v-if="!props.oldData.name">
    <a-form :model="formState" layout="vertical" name="form_in_modal" style="width: 420px;margin: 0 auto">
    <a-form-item
        name="name"
        label="名称"
    >
      <a-input v-model:value="formState.name" placeholder="请输入"/>
    </a-form-item>
    {{}}
    <a-form-item
        name="description"
        label="描述"
    >
      <a-textarea v-model:value="formState.description" placeholder="请输入描述"/>
    </a-form-item>
    <a-form-item name="basePackage" label="基础包">
      <a-input v-model:value="formState.basePackage" placeholder="请输入基础包"/>
    </a-form-item>
    <a-form-item name="version" label="版本">
      <a-input v-model:value="formState.version" placeholder="请输入版本"/>
    </a-form-item>
    <a-form-item name="author" label="作者">
      <a-input v-model:value="formState.author" placeholder="请输入作者"/>
    </a-form-item>
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
      <!-- todo props传值 -->
      <picture-uploader style="margin-top: 15px" :biz="`user_avatar`" :image-url="formState.picture"/>
    </div>
  </a-form>
  </template>

  <template v-else>
    <a-form :model="props.oldData" layout="vertical" name="form_in_modal" style="width: 420px;margin: 0 auto">
      <a-form-item
          name="name"
          label="名称"
      >
        <a-input v-model:value="props.oldData.name" placeholder="请输入"/>
      </a-form-item>
      {{}}
      <a-form-item
          name="description"
          label="描述"
      >
        <a-textarea v-model:value="props.oldData.description" placeholder="请输入描述"/>
      </a-form-item>
      <a-form-item name="basePackage" label="基础包">
        <a-input v-model:value="props.oldData.basePackage" placeholder="请输入基础包"/>
      </a-form-item>
      <a-form-item name="version" label="版本">
        <a-input v-model:value="props.oldData.version" placeholder="请输入版本"/>
      </a-form-item>
      <a-form-item name="author" label="作者">
        <a-input v-model:value="props.oldData.author" placeholder="请输入作者"/>
      </a-form-item>
      <a-form-item name="tags" label="标签">
        <a-select
            v-model:value="props.oldData.tags"
            mode="tags"
            style="width: 100%"
            placeholder="请输入标签"
            auto-clear-search-value
        />
      </a-form-item>
      <div style="width: min-content">
        <span style="float: left">图片</span>
        <!-- todo props传值 -->
        <picture-uploader style="margin-top: 15px" :biz="`user_avatar`"/>
      </div>
    </a-form>
  </template>
</template>

<style scoped lang="less">

</style>
