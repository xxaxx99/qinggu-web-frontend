<script lang="tsx" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import BasicInfo from '~/pages/Generator/Add/components/BasicInfo.vue'
import FileConfig from "~/pages/Generator/Add/components/FileConfig.vue";
import ModelConfig from "~/pages/Generator/Add/components/ModelConfig.vue";
import GeneratorFile from "~/pages/Generator/Add/components/GeneratorFile.vue";

const current = ref<number>(0)
function next() {
  console.log()
  current.value++
}
function prev() {
  current.value--
}
const steps = [
  {
    title: '基本信息',
    content: '',
  },
  {
    title: '文件配置',
    content: 'Second-content',
  },
  {
    title: '模型配置',
    content: 'Last-content',
  },
  {
    title: '生成器文件',
    content: 'Last-content',
  },
]
const items = steps.map(item => ({ key: item.title, title: item.title }))
</script>

<template>
  <div>
    <div class="steps-content">
      <a-steps :current="current" :items="items" style="width: 1150px;margin: 0 auto;padding-bottom:30px " />
      <template v-if="current === 0">
        <BasicInfo style="margin: 0 auto" />
      </template>
      <template v-if="current === 1">
        <FileConfig/>
      </template>
      <template v-if="current === 2">
        <ModelConfig/>
      </template>
      <template v-if="current === 3">
        <GeneratorFile/>
      </template>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>
        <a-button
          v-if="current === steps.length - 1"
          type="primary"
          @click="message.success('Processing complete!')"
        >
          Done
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
