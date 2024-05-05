<template>
  <div flex flex-col w-460px mx-auto mb-6>
    <div style="margin-right: auto" mb>产物包</div>
    <FileUploader :description="`请上传生成器文件压缩包`" :biz="`generator_dist`"/>
  </div>
  <a-collapse v-model:activeKey="activeKey" accordion  style="width: 460px;margin: 0 auto" >
    <a-collapse-panel key="1">
      <template #header>
        <span>生成器制作工具</span>
        <div></div>
      </template>
      <div mb>模板文件</div>
      <div w-352px mx-auto>
        <FileUploader :description="`请上传压缩包,打包时不要添加最外层目录！`" :biz="`generator_make_template`" style="width: 352px"/>
      </div>
      <a-button type="primary" @click="" mt>制作</a-button>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">

// import GeneratorAddRequest = Api.GeneratorAddRequest;
// import GeneratorEditRequest = Api.GeneratorEditRequest;

const activeKey = ref([]);
// const props = defineProps<{
//   formState: GeneratorAddRequest
//   oldData: GeneratorEditRequest
// }>()
// const formStateProps = props.formState
// const oldDataProps = props.oldData
// const formState = reactive<GeneratorAddRequest>(formStateProps)
// const oldData = reactive<GeneratorAddRequest>(oldDataProps)
</script>

<style scoped lang="less">
:deep(.ant-collapse-header-text){
  display: flex;
}
</style>