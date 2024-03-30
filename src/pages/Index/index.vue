<script lang="ts" setup>
import {type PaginationProps, message} from 'ant-design-vue'
import {ref} from 'vue'
import type {SelectValue} from 'ant-design-vue/es/select'
import _relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import {listGeneratorVoByPageUsingPost} from '~/autoapi/api/generatorController.ts'
import GeneratorDetail from '../Generator/Detail/index.vue'

import GeneratorQueryRequest = Api.GeneratorQueryRequest
import PageGeneratorVO = Api.PageGeneratorVO_

dayjs.extend(_relativeTime)
const activeKey = ref('1')
const loading = shallowRef(false)
const open = ref<boolean>(false);

const modalId = ref()
const showModal = (id) => {
  open.value = true;
  modalId.value = id
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const formModel = reactive({
  name: undefined,
  tags: [],
  description: undefined,
})

async function onReset() {
  // 清空所有参数重新请求
  formModel.name = undefined
  formModel.tags = []
  formModel.description = undefined
}

function handleChange(value: SelectValue) {
  formModel.tags = value as []
}

const searchText = ref('')

/**
 * 默认分页参数
 */
const DEFAULT_PAGE_PARAMS: GeneratorQueryRequest = {
  searchText: '',
  current: 1,
  pageSize: 10,
  sortField: 'createTIme',
  sortOrder: 'descend',
}
const data: Api.GeneratorVO[] = []
const dataList = ref(data)
// 搜索条件
const searchParams = ref({
  ...DEFAULT_PAGE_PARAMS,
})

const pagination = reactive<PaginationProps>({
  pageSize: 8,
  pageSizeOptions: ['8', '12', '16', '20'],
  current: 1,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `总数据条数：${total}`,
  onChange(current, pageSize) {
    // 更新分页参数
    searchParams.value.current = current;
    searchParams.value.pageSize = pageSize;
    pagination.pageSize = pageSize
    pagination.current = current
    doSearch()
  },
})

async function doSearch() {
  // console.log('我进来了')
  loading.value = true
  const currentSearchParams = ref<GeneratorQueryRequest>({...searchParams.value}) // 创建新引用
  try {
    const {data} = await listGeneratorVoByPageUsingPost(currentSearchParams.value)
    dataList.value = (data as PageGeneratorVO)?.records ?? []
    pagination.total = Number((data as PageGeneratorVO)?.total)
  } catch (e: any) {
    message.error(`获取数据失败${e.message}`)
  }
  loading.value = false
}

async function onSearch(value: string) {
  searchParams.value = {
    ...DEFAULT_PAGE_PARAMS,
    searchText: value,
  }
  loading.value = true
}

async function search() {
  try {
    const {data} = await listGeneratorVoByPageUsingPost({
      name: formModel?.name,
      description: formModel?.description,
      tags: formModel?.tags,
    })
    dataList.value = (data as PageGeneratorVO)?.records ?? []
    pagination.total = Number((data as PageGeneratorVO)?.total)
  } catch (e: any) {
    message.error(`获取数据失败${e.message}`)
  }
  loading.value = false
  pagination.current = 1
}

watchEffect(() => {
  // console.log('我老了')
  doSearch()
})

</script>

<template>
  <div h-full flex flex-col flex-1 max-w-1152px w-1152px mx-auto>
    <div>
      <div style="display: flex; justify-content: center">
        <a-input-search
            v-model:value="searchText"
            placeholder="请搜索生成器"
            allow-clear
            enter-button="搜索"
            size="large"
            style="width: 40vw;min-width: 320px;"
            @search="onSearch(searchText)"
        />
      </div>
      <!-- todo 不同标签页响应不同的数据 -->
      <a-tabs v-model:activeKey="activeKey" size="large">
        <a-tab-pane key="newest" tab="最新">
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="recommend" tab="推荐" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
      </a-tabs>
      <div>
        <a-form :model="formModel">
          <a-row :gutter="[48, 0]">
            <a-col :span="12">
              <a-form-item name="tags" label="标签">
                <a-select
                    v-model:value="formModel.tags"
                    mode="tags"
                    style="width: 100%"
                    placeholder="请输入标签"
                    @change="handleChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="name" label="名称">
                <a-input v-model:value="formModel.name" placeholder="请输入名称"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="description" label="描述">
                <a-input v-model:value="formModel.description" placeholder="请输入描述"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-space flex justify-end w-full>
                <!-- todo 根据不同条件搜索 -->
                <a-button :loading="loading" type="primary" @click="search">
                  查询
                </a-button>
                <a-button :loading="loading" @click="onReset">
                  重置
                </a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="mt-4">
      <a-list :data-source="dataList" :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }"
              :pagination="pagination">
<!--        这里是一个插槽 我点击的不应该是每一项独立的吗 这里是自定义每一项的意思不是吗 item.id 应该是每个独立的吧因为这些每一项的卡片展示出来都不一样-->
        <template #renderItem="{ item }">
          <a-list-item style="padding: 0">
            <a-card hoverable>
              <template #cover>
                <a-image v-if="item.picture" :src="item.picture" height="254.76px"/>
                <!-- 假如用户没上传头像 给个默认的 -->
                <a-image v-else
                         src="https://partner-bucket-xx.oss-cn-beijing.aliyuncs.com/0152b8d0-3136-43f9-bf03-027f060064c6.png"
                         height="254.76px"/>
              </template>
              <div @click="showModal(item.id)">
                <a-card-meta :title="item.name">
                  <template #description>
                    <div class="h-44px">
                      <a-typography-paragraph
                          :ellipsis="{ rows: 2 }"
                          :content="item.description"
                      />
                    </div>
                  </template>
                </a-card-meta>
                <a-tag v-for="(tag, index) in item.tags" :key="index" color="blue">
                  {{ tag }}
                </a-tag>
                <div class="flex h-20px mt-16px mb--4px line-height-20px justify-between">
                  <span>{{ dayjs(item.createTime).fromNow() }}</span>
                  <div>
                    <a-avatar :src="item.user?.userAvatar " :size="22"/>
                  </div>
                </div>
              </div>
<!--              <div>-->
<!--                <a-modal-->
<!--                    v-model:open="open"-->
<!--                    width="100%"-->
<!--                    wrap-class-name="full-modal"-->
<!--                    @ok="handleOk"-->
<!--                >-->
<!--                  &lt;!&ndash;  这里是点击展示模态框 然后传id  &ndash;&gt;-->
<!--                  <GeneratorDetail :id="item.id"/>-->
<!--                  <template #footer>-->
<!--                    <a-button type="primary" @click="handleOk">关闭</a-button>-->
<!--                  </template>-->
<!--                </a-modal>-->
<!--              </div>-->
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
  <div>
    <a-modal
        v-model:open="open"
        width="100%"
        wrap-class-name="full-modal"
        @ok="handleOk"
    >
      <!--  这里是点击展示模态框 然后传id  -->
      <GeneratorDetail :id="modalId"/>
      <template #footer>
        <a-button type="primary" @click="handleOk">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    margin-bottom: 30px;
  }
}
</style>