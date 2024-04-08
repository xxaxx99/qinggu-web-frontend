<script setup lang="tsx">
import type { FormInstance, MenuProps, PaginationProps } from 'ant-design-vue'
import { Modal, Tag, message } from 'ant-design-vue'
import moment from "moment";

import {
  ColumnHeightOutlined,
  DownOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  UpOutlined,
} from '@ant-design/icons-vue'
import type { UnwrapRef } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { ConsultTableParams } from '~/api/list/table-list.ts'
import {
  addGeneratorUsingPost,
  deleteGeneratorUsingPost,
  listGeneratorByPageUsingPost,
  updateGeneratorUsingPost
} from '~/autoapi/api/generatorController.ts'

// const message = useMessage()
const reload = inject('reload', () => {
})

const columns = shallowRef([
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '基础包',
    dataIndex: 'basePackage',
  },
  {
    title: '版本',
    dataIndex: 'version',
  },
  {
    title: '作者',
    dataIndex: 'author',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    customRender: ({ record }) => {
      if (!record.tags)
        return <></>
      return (
        <div>
          {JSON.parse(record.tags).map((tag: string) => (
            <Tag color="blue" key={tag}>
              <>{tag}</>
            </Tag>
          ))}
        </div>
      )
    },
  },
  {
    title: '图片',
    dataIndex: 'picture',
    key: 'picture',
    slots: { customRender: 'picture' },
  },
  {
    title: '文件配置',
    dataIndex: 'fileConfig',
  },
  {
    title: '模型配置',
    dataIndex: 'modelConfig',
  },
  {
    title: '产物包路径',
    dataIndex: 'distPath',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (status: string) => {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      return status?.value === '0' ? '默认' : '默认'
    },
  },
  {
    title: '创建用户',
    dataIndex: 'userId',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 110,
  },
])

const data: ConsultTableParams[] = []
const dataSource = ref(data)

const loading = shallowRef(false)
const pagination = reactive<PaginationProps>({
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '40'],
  current: 1,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `总数据条数：${total}`,
  onChange(current, pageSize) {
    pagination.pageSize = pageSize
    pagination.current = current
    init()
  },
})
// const dataSource = shallowRef<ConsultTableModel[]>([])
const formModel = reactive({
  name: undefined,
  description: undefined,
  basePackage: undefined,
  version: undefined,
  author: undefined,
  tags: [],
  picture: undefined,
  fileConfig: undefined,
  modelConfig: undefined,
  distPath: undefined,
  status: undefined,
})

const tableSize = ref<string[]>(['large'])
const sizeItems = ref<MenuProps['items']>([
  {
    key: 'large',
    label: '默认',
    title: '默认',
  },
  {
    key: 'middle',
    label: '中等',
    title: '中等',
  },
  {
    key: 'small',
    label: '紧凑',
    title: '紧凑',
  },
])
const open = ref(false)
const options = computed(() => {
  return columns.value.map((item) => {
    if (item.dataIndex === 'action') {
      return {
        label: item.title,
        value: item.dataIndex,
        disabled: true,
      }
    }
    return {
      label: item.title,
      value: item.dataIndex,
    }
  })
})
const dropdownVisible = ref(false)
const getCheckList = computed(() => columns.value.map(item => item.dataIndex))
const state = reactive({
  indeterminate: false,
  checkAll: true,
  checkList: getCheckList.value,
})
interface FormValues {
  name: string
  description: string
  basePackage: string
  version: string
  author: string
  tags: string[]
  picture: string
  fileConfig: string
  modelConfig: string
  distPath: string
  status: string
}

const formRef = ref<FormInstance>()
const formState = reactive<FormValues>({
  name: '',
  description: '',
  basePackage: '',
  version: '',
  author: '',
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  tags: undefined,
  picture: '',
  fileConfig: '',
  modelConfig: '',
  distPath: '',
  status: '',
})

// todo 判断是否有值逻辑优化 bug 无法删除模态框
function hasValueProperty(formState: any) {
  return Object.keys(formState).some(property => formState[property] !== undefined && formState[property] !== null && formState[property] !== '')
}

function resetForm() {
  if (hasValueProperty(formState)) {
    formState.name = ''
    formState.description = ''
    formState.basePackage = ''
    formState.version = ''
    formState.author = ''
    formState.tags = []
    formState.picture = ''
    formState.fileConfig = ''
    formState.modelConfig = ''
    formState.distPath = ''
    formState.status = ''
    open.value = true
  }
  else {
    open.value = false
  }
}

/**
 * 新增事件
 *
 */
async function handleOk(values: FormValues) {
  values.fileConfig = JSON.parse((values.fileConfig || '{}') as string)
  values.modelConfig = JSON.parse((values.modelConfig || '{}') as string)
  // @ts-expect-error
  const res = await addGeneratorUsingPost(values) as any
  if (res?.code === 0) {
    message.success('添加成功')
    open.value = false
    Modal.destroyAll()
    reload()
  }
  else {
    message.error(`添加失败${res?.message}`)
    Modal.destroyAll()
    open.value = false
  }
}

async function init() {
  if (loading.value)
    return
  loading.value = true
  try {
    onReset()
    const { data } = await listGeneratorByPageUsingPost({
      ...formModel,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }) as any
    dataSource.value = data?.records ?? [] as any
    pagination.total = data?.total
    dataSource.value.forEach((data, index) => {
      data.key = (index + 1).toString()
    })
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

async function onSearch() {
  const res = await listGeneratorByPageUsingPost({
    name: formModel?.name,
    description: formModel?.description,
    author: formModel?.author,
    tags: formModel?.tags,
  }) as any
  if (res?.code === 0) {
    dataSource.value = [...res?.data?.records] ?? []
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    pagination.total = data?.total
    dataSource.value.forEach((data, index) => {
      data.key = (index + 1).toString()
    })
  }
  else {
    message.error(`${res?.message}`)
    reload()
  }
  pagination.current = 1
}

function onReset() {
  // 清空所有参数重新请求
  formModel.name = undefined
  formModel.description = undefined
  formModel.author = undefined
  formModel.tags = []
}

/**
 * 密度切换
 *
 */
const handleSizeChange: MenuProps['onClick'] = (e) => {
  tableSize.value[0] = e.key as string
}

/**
 * 过滤
 *
 */
function filterAction(value: string[]) {
  return columns.value.filter((item) => {
    return value.includes(item.dataIndex)
  })
}

// 备份columns
const filterColumns = ref(filterAction(getCheckList.value))

/**
 * 全选/反选事件
 *
 */

function handleCheckAllChange(e: any) {
  Object.assign(state, {
    checkList: e.target.checked ? getCheckList.value : [],
    indeterminate: true,
  })
  filterColumns.value = e.target.checked ? filterAction(getCheckList.value) : filterColumns.value.filter(item => item.dataIndex === 'action')
}

watch(
  () => state.checkList,
  (val) => {
    state.indeterminate = !!val.length && val.length < getCheckList.value.length
    state.checkAll = val.length === getCheckList.value.length
  },
)

/**
 * 重置事件
 *
 */
async function handleResetChange() {
  state.checkList = getCheckList.value
  filterColumns.value = filterAction(getCheckList.value)
}

/**
 * checkbox点击事件
 *
 */
function handleCheckChange(value: any) {
  filterColumns.value = filterAction(value)
}

onMounted(() => {
  init()
})

const expand = ref(false)

const visible = ref<boolean>(true)

const editableData: UnwrapRef<Record<string, ConsultTableParams>> = reactive({})

function edit(key: string) {
  visible.value = false
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0])
}

async function save(key: string, row: Api.Generator) {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key])
  delete editableData[key]
  console.log(row)
  row.fileConfig = JSON.parse((row.fileConfig || '{}') as string)
  row.modelConfig = JSON.parse((row.modelConfig || '{}') as string)
  row.tags = JSON.parse((row.tags || '[]') as string)
  console.log(row)
  const res = await updateGeneratorUsingPost(row) as any
  if (res?.code === 0) {
    message.success('更新成功')
    reload()
  }
  else {
    message.error(`更新失败,${res?.message}`)
    reload()
  }
}

function cancel(key: string) {
  delete editableData[key]
  visible.value = true
}

async function onDelete(row: Api.Generator) {
  console.log(row)
  if (!row)
    return true
  try {
    await deleteGeneratorUsingPost({
      id: row.id as any,
    }) as any
    message.success('删除成功')
    reload()
    return true
  }
  catch (error: any) {
    message.error(`系统错误,删除失败${error.message}`)
    return false
  }
}

function handleChange(value: SelectValue) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  formModel.tags = value
}
</script>

<template>
  <div>
    <a-typography-title :level="4" style="margin-bottom: 16px">
      代码生成器管理
    </a-typography-title>
    <a-card mb-4>
      <a-form :label-col="{ span: 7 }" :model="formModel">
        <a-row :gutter="[15, 0]">
          <a-col :span="8">
            <a-form-item name="name" label="名称">
              <a-input v-model:value="formModel.name" placeholder="请输入您需要查找的名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="description" label="描述">
              <a-input v-model:value="formModel.description" placeholder="请输入您需要查找的描述" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="author" label="作者">
              <a-input v-model:value="formModel.author" placeholder="请输入您需要查找的作者" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand" :gutter="[15, 0]">
          <a-col :span="8">
            <a-form-item name="tags" label="标签">
              <a-select
                v-model:value="formModel.tags"
                mode="tags"
                style="width: 100%"
                placeholder="请输入您需要查找的标签"
                @change="handleChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24" style="text-align: right">
          <a-col :span="24">
            <a-space flex justify-end w-full>
              <a-button :loading="loading" type="primary" @click="onSearch">
                查询
              </a-button>
              <a-button :loading="loading" @click="onReset">
                重置
              </a-button>
              <a-button type="link" @click="expand = !expand">
                {{ expand ? '收起' : '展开' }}
                <UpOutlined v-if="expand" />
                <DownOutlined v-else />
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card title="代码生成器管理">
      <template #extra>
        <a-space size="middle">
          <a-button type="primary" @click="() => open = true">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
          <a-tooltip title="刷新">
            <ReloadOutlined @click="init()" />
          </a-tooltip>
          <a-tooltip title="密度">
            <a-dropdown trigger="click">
              <ColumnHeightOutlined />
              <template #overlay>
                <a-menu v-model:selected-keys="tableSize" :items="sizeItems" @click="handleSizeChange" />
              </template>
            </a-dropdown>
          </a-tooltip>
          <a-tooltip title="列设置">
            <a-dropdown v-model:open="dropdownVisible" trigger="click">
              <SettingOutlined />
              <template #overlay>
                <a-card>
                  <template #title>
                    <a-checkbox
                      v-model:checked="state.checkAll" :indeterminate="state.indeterminate"
                      @change="handleCheckAllChange"
                    >
                      列选择
                    </a-checkbox>
                  </template>
                  <template #extra>
                    <a-button type="link" @click="handleResetChange">
                      重置
                    </a-button>
                  </template>
                  <a-checkbox-group
                    v-model:value="state.checkList" :options="options"
                    style="display: flex; flex-direction: column;" @change="handleCheckChange"
                  />
                </a-card>
              </template>
            </a-dropdown>
          </a-tooltip>
        </a-space>
      </template>
      <a-table
        :loading="loading" :columns="filterColumns" :data-source="dataSource" :pagination="pagination"
        :size="tableSize[0] " :scroll="{ x: 1900 }"
      >
        <template #picture="avatarUrl">
          <img :src="avatarUrl.value" style="width:50px;heigth:50px" alt="">
        </template>
        <template #bodyCell="{ column, text, record }">
          <!-- todo 到底什么是可以改的 -->
          <template v-if="['name', 'description', 'author', 'basePackage', 'version'].includes(column.dataIndex)">
            <div>
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-if="column.dataIndex === 'createTime'">
            {{moment(record.createTime).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
          <template v-if="column.dataIndex === 'updateTime'">
            {{moment(record.updateTime).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <a-typography-link @click="save(record.key, record)">保存</a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.key)">修改</a>
              </span>
              <a-popconfirm
                v-if="dataSource.length"
                title="确定要删除吗?"
                @confirm="onDelete(record)"
              >
                <a v-if="visible" style="color: red">删除</a>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="open" title="创建代码生成器" width="500px" ok-text="提交" :closable="false"
      mask-closable cancel-text="重置" @ok="handleOk(formState)"
      @cancel="resetForm"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
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
          <a-input v-model:value="formState.description" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="basePackage" label="基础包">
          <a-input v-model:value="formState.basePackage" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="version" label="版本">
          <a-input v-model:value="formState.version" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="author" label="作者">
          <a-input v-model:value="formState.author" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="tags" label="标签">
          <a-select
            v-model:value="formState.tags"
            mode="tags"
            style="width: 100%"
            placeholder="Tags Mode"
            auto-clear-search-value
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item name="picture" label="图片">
          <a-input v-model:value="formState.picture" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="fileConfig" label="文件配置">
          <a-textarea v-model:value="formState.fileConfig" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="modelConfig" label="模型配置">
          <a-textarea v-model:value="formState.modelConfig" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formState.status" placeholder="请选择">
            <a-select-option value="0">
              默认
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
