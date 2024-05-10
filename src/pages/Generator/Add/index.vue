<script lang="ts" setup>
import { ref } from 'vue'
import BasicInfo from '~/pages/Generator/Add/components/BasicInfo.vue'
import FileConfig from "~/pages/Generator/Add/components/FileConfig.vue";
import ModelConfig from "~/pages/Generator/Add/components/ModelConfig.vue";
import GeneratorFile from "~/pages/Generator/Add/components/GeneratorFile.vue";
import GeneratorAddRequest = Api.GeneratorAddRequest;
import {
  addGeneratorUsingPost,
  editGeneratorUsingPost,
  getGeneratorVoByIdUsingGet
} from "~/autoapi/api/generatorController.ts";
import {message} from "ant-design-vue";
import GeneratorEditRequest = Api.GeneratorEditRequest;
import router from "~/router";
import {useFileStore} from "~/stores/upload-file.ts";

const pictureStore = usePictureStore();
const fileStore = useFileStore();
const current = ref<number>(0)
function next() {
  console.log(oldData.value)
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
    title: '模型配置',
    content: 'Last-content',
    component: ModelConfig
  },
  {
    title: '文件配置',
    content: 'Second-content',
    component: FileConfig
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
  tags: [],
  picture: '',
  fileConfig: {},
  modelConfig: {},
  distPath: ''
})

const id = useUrlSearchParams('history').id as string;
const oldData = ref<GeneratorEditRequest>({
  name: '',
  description: '',
  basePackage: '',
  version: '',
  author: '',
  tags: undefined,
  picture: '',
  fileConfig: {},
  modelConfig: {},
  distPath: ''
});


const loadData = async () => {
  if (!id){
    return;
  }
  try {
    const res = await getGeneratorVoByIdUsingGet({
      id,
    }) as any;
    if (res.data) {
      oldData.value = res.data
      // 这里获取数据存到了pictureStore
      if (res.data.picture){
        //@ts-expect-error
        pictureStore.addFile({
          url: res.data?.picture
        })
      }
      //@ts-expect-error
      fileStore.addFile({
        url: res.data?.distPath
      });
    }
  }catch (error: any){
    message.error('加载数据失败，' + error.message);
  }
}
watchEffect(() => {
  loadData()
})


/**
 * 创建
 * @param values
 */
const doAdd = async (values: GeneratorAddRequest) => {
  try {
    const res = await addGeneratorUsingPost(values) as any;
    if (res.code === 0) {
      message.success('创建成功');
      await router.push({
        path:'/'
      })
    }
    else {
      message.error('创建失败，' + res.message + '，名称或者描述不能为空');
    }
  } catch (error: any) {
    message.error('创建失败，' + error.message);
  }
};

/**
 * 更新
 * @param values
 */
const doUpdate = async (values: GeneratorEditRequest) => {
  try {
    const res = await editGeneratorUsingPost(values);
    if (res.data) {
      message.success('更新成功');
      await router.push({
        path:"/"
      })
    }
  } catch (error: any) {
    message.error('更新失败，' + error.message);
  }
};

/**
 * 提交
 * @param values
 */
const doSubmit = async (values: GeneratorAddRequest) => {
  setTimeout(() => { }, 200)
  console.log(values)
  // 数据转换
  if (!values.fileConfig) {
    values.fileConfig = {};
  }
  if (!values.modelConfig) {
    values.modelConfig = {};
  }
  values.picture = pictureStore.fileList[0]?.url
  values.distPath = fileStore.fileList[0]?.url

  if (id) {
    await doUpdate({
      id,
      ...values,
    });
  } else {
    await doAdd(values);
  }
};

onUnmounted(() => {
  pictureStore.clearFileList();
  fileStore.clearFileList();
})
</script>

<template>
  <div>
    <div class="steps-content">
      <a-steps :current="current" :items="items" style="width: 1150px;margin: 0 auto;padding-bottom:30px " />
      <keep-alive>
        <component :is="steps[current].component" :formState="formState" :oldData="oldData"/>
      </keep-alive>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>
        <a-button
          v-if="current === steps.length - 1 && !id"
          type="primary"
          @click="doSubmit(formState)"
        >
          提交
        </a-button>
        <a-button
            v-else-if="current === steps.length - 1 && id"
            type="primary"
            @click="doSubmit(oldData)"
        >
          修改
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
