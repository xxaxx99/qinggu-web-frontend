<template>
<FileUploader :description="`请上传生成器文件压缩包`" :biz="`generator_dist`"/>
</template>

<script setup lang="ts">

import GeneratorAddRequest = Api.GeneratorAddRequest;
import GeneratorEditRequest = Api.GeneratorEditRequest;

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
const formStateProps = props.formState
const oldDataProps = props.oldData
const formState = reactive<GeneratorAddRequest>(formStateProps)
const oldData = reactive<GeneratorAddRequest>(oldDataProps)
</script>

<style scoped lang="less">

</style>