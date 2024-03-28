<script lang="ts" setup>
import { ref } from 'vue'
import BasicInfo from '~/pages/Generator/Add/components/BasicInfo.vue'
import FileConfig from "~/pages/Generator/Add/components/FileConfig.vue";
import ModelConfig from "~/pages/Generator/Add/components/ModelConfig.vue";
import GeneratorFile from "~/pages/Generator/Add/components/GeneratorFile.vue";
import GeneratorAddRequest = Api.GeneratorAddRequest;



const current = ref<number>(0)
function next() {
  current.value++
}
function prev() {
  current.value--
}
const steps = [
  {
    title: '基本信息',
    content: '',
    component: BasicInfo
  },
  {
    title: '文件配置',
    content: 'Second-content',
    component: FileConfig
  },
  {
    title: '模型配置',
    content: 'Last-content',
    component: ModelConfig
  },
  {
    title: '生成器文件',
    content: 'Last-content',
    component: GeneratorFile
  },
]
const items = steps.map(item => ({ key: item.title, title: item.title }))

const formState = ref<GeneratorAddRequest>({
  name: '',
  description: '',
  basePackage: '',
  version: '',
  author: '',
  tags: undefined,
  picture: '',
  fileConfig: {},
  modelConfig: {},
})

const generateAdd = (formState:GeneratorAddRequest) => {
  console.log(formState)
}
</script>

<template>
  <div>
    <div class="steps-content">
      <a-steps :current="current" :items="items" style="width: 1150px;margin: 0 auto;padding-bottom:30px " />
      <component :is="steps[current].component" :formState="formState" />
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>
        <a-button
          v-if="current === steps.length - 1"
          type="primary"
          @click="generateAdd(formState)"
        >
          提交
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 50px;
}

.steps-action {
  margin: 25px 0 18px 0;

}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
