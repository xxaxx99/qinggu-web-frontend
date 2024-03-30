<template>
  <div>
    <a-card>
      <a-row justify="space-between" :gutter="[32,32]">
        <a-col flex="auto">
          <a-space size="large" align="center">
            <a-typography-title :level="4" style="margin-bottom: 16px;">
              {{ generatorData.name }}
            </a-typography-title>
            <a-tag v-for="(item, index) in generatorData.tags" :key="index" color="blue" style="margin-bottom: 16px;margin-right: -10px;">{{ item }}</a-tag>
          </a-space>
          <a-typography-paragraph type="secondary">{{generatorData.description}}</a-typography-paragraph>
          <a-typography-paragraph type="secondary">
            创建时间：{{moment(generatorData.createTime).format('YYYY-MM-DD hh:mm:ss')}}
          </a-typography-paragraph>
          <a-typography-paragraph type="secondary">基础包：{{generatorData.basePackage}}</a-typography-paragraph>
          <a-typography-paragraph type="secondary">版本：{{generatorData.version}}</a-typography-paragraph>
          <a-typography-paragraph type="secondary">作者：{{generatorData.author}}</a-typography-paragraph>
          <div style="margin-bottom: 24px"/>
          <a-space size="middle">
            <a-button type="primary">立即使用</a-button>
            <a-button @click="downloadGenerator">
              <template #icon>
                <DownloadOutlined />
              </template>
              下载
            </a-button>
            <a-button v-if="userId === generatorData.userId" @click="updateGenerator">
              <template #icon>
                <EditOutlined />
              </template>
              编辑
            </a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image :src="generatorData.picture"/>
        </a-col>
      </a-row>
    </a-card>
    <div style="margin-bottom: 24px"/>
    <a-card>
      <a-tabs v-model:activeKey="activeKey" size="large" defa>
        <a-tab-pane key="1" tab="文件配置">
          <FileConfig :data="generatorData.fileConfig"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="模型配置">
          <ModelConfig :data="generatorData.modelConfig"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="作者信息">
          <BasicInfo :data="generatorData.user"/>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {downloadGeneratorByIdUsingGet, getGeneratorVoByIdUsingGet} from "~/autoapi/api/generatorController.ts";
import {message} from "ant-design-vue";
import { DownloadOutlined, EditOutlined } from '@ant-design/icons-vue';
import moment from "moment";
import BasicInfo from "~/pages/Generator/Detail/components/BasicInfo.vue";
import FileConfig from "~/pages/Generator/Detail/components/FileConfig.vue";
import ModelConfig from "~/pages/Generator/Detail/components/ModelConfig.vue";
import GeneratorVO = Api.GeneratorVO;
import router from "~/router";

const activeKey = ref('1');
const userStore = useUserStore();
const userId = ref(userStore.userInfo?.id)
const loading = shallowRef(false)
const generatorData = ref<GeneratorVO>({})
const props = defineProps({
  id: String
})
console.log(props.id)

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  loading.value = true
  const id = props.id
  try {
    const res = await getGeneratorVoByIdUsingGet({
      id,
    }) as any;
    generatorData.value = res.data || {};
  } catch (error: any) {
    message.error('获取数据失败，' + error.message);
  }
  loading.value = false
  console.log(generatorData.value)
};

watchEffect(() => {
  loadData();
})

const updateGenerator = () => {
  router.push({
    path:'/generator/add',
    query:{
      id: generatorData.value.id
    }
  })
}

const downloadGenerator = async () => {
  const blob = await downloadGeneratorByIdUsingGet(
      {id: props.id},
      {
        responseType: 'blob',
      },
  );
  const fullPath = generatorData.value.distPath || ''
}
</script>

<style scoped lang="less">

</style>