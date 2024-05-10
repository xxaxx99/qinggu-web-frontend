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
      <a-form w-352px mx-auto>
        <a-form-item>
          <FileUploader v-model:value="templateFilePath" :description="`请上传压缩包,打包时不要添加最外层目录！`" :biz="`generator_make_template`" style="width: 352px"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doSubmit()">制作</a-button>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {message} from "ant-design-vue";
import {saveAs} from "file-saver";
const templateFilePath = ref('')
import {makeGeneratorUsingPost} from "~/autoapi/api/generatorController.ts";
import Meta = Api.Meta;
import GeneratorEditRequest = Api.GeneratorEditRequest;
import GeneratorAddRequest = Api.GeneratorAddRequest;

const activeKey = ref([]);

const templateFileStore = useTemplateFileStore();

const id = useUrlSearchParams('history').id as string;

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
const oldData = ref(props.oldData)
const formState = ref<Meta>(props.formState)

const temp = () => {
  oldData.value = props.oldData
}
setTimeout(() => { temp() }, 500)


const doSubmit = async () => {
  if (id){
    // 数据转换
    if (!oldData.value.name) {
      message.error('请填写生成器名称');
      return;
    }

    // 文件列表转 url
    const zipFilePath = templateFileStore.fileList[0].url;
    console.log(zipFilePath);
    if (!zipFilePath || zipFilePath.length < 1) {
      message.error('请上传模板文件压缩包');
      return;
    }

    try {
      const res = await makeGeneratorUsingPost(
          {
            meta: oldData.value,
            zipFilePath,
          },
          {
            responseType: 'blob',
          },
      );
      const blob = new Blob([res.data])
      // 使用 file-saver 来保存文件
      saveAs(blob, oldData.value.name + '.zip');
    } catch (error: any) {
      message.error('制作失败，' + error.message);
    }
  }
  else{
    // 数据转换
    if (!formState.value.name) {
      message.error('请填写生成器名称');
      return;
    }

    // 文件列表转 url
    const zipFilePath = templateFileStore.fileList[0].url;
    console.log(zipFilePath);
    if (!zipFilePath || zipFilePath.length < 1) {
      message.error('请上传模板文件压缩包');
      return;
    }

    try {
      const res = await makeGeneratorUsingPost(
          {
            meta: formState.value,
            zipFilePath,
          },
          {
            responseType: 'blob',
          },
      );
      const blob = new Blob([res.data])
      // 使用 file-saver 来保存文件
      saveAs(blob, formState.value.name + '.zip');
    } catch (error: any) {
      message.error('制作失败，' + error.message);
    }
  }

};


</script>

<style scoped lang="less">
:deep(.ant-collapse-header-text){
  display: flex;
}
</style>