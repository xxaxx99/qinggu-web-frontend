<script setup lang="ts">
import type { FormInstance, MenuProps, PaginationProps, TableProps } from 'ant-design-vue'
import { Modal, message } from 'ant-design-vue'

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
import type { ConsultTableParams } from '~/api/list/table-list.ts'
import { getUserListApi } from '~/api/list/table-list.ts'
import {
  addUserUsingPost,
  deleteUserUsingPost,
  searchUsersUsingGet,
  updateUserUsingPost
} from '~/autoapi/api/userController.ts'

// const message = useMessage()
const reload = inject('reload', () => {
})

const columns = shallowRef([
  {
    title: 'id',
    dataIndex: 'id',
    width: 0,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 150,
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'avatar',
    slots: { customRender: 'avatar' },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '权限',
    dataIndex: 'userRole',
    customRender: (userRole: string) => {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      return userRole?.value === 'admin' ? '管理员' : '用户'
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
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
const formModel = reactive<ConsultTableParams>({
  id: undefined,
  userName: undefined,
  userAccount: undefined,
  userProfile: undefined,
  userRole: undefined,
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
  userAccount: string
  userName: string
  userProfile: string
  userRole: string
}

const formRef = ref<FormInstance>()
const formState = reactive<FormValues>({
  userAccount: '',
  userName: '',
  userProfile: '',
  userRole: '',
})

// todo 判断是否有值逻辑优化

function hasValueProperty(formState: any) {
  return Object.keys(formState).some(property => formState[property] !== undefined && formState[property] !== null && formState[property] !== '')
}

function resetForm() {
  if (hasValueProperty(formState)) {
    formState.userAccount = ''
    formState.userName = ''
    formState.userProfile = ''
    formState.userRole = ''
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
  const res = await addUserUsingPost(values) as any
  if (res?.code === 0) {
    message.success('添加成功')
    open.value = false
    Modal.destroyAll()
    reload()
  }
  else {
    message.error(`添加失败${res?.message}`)
  }
}

async function init() {
  if (loading.value)
    return
  loading.value = true
  try {
    const { data } = await getUserListApi({
      ...formModel,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    dataSource.value = data?.records ?? [] as any
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
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
  const res = await searchUsersUsingGet({
    userName: formModel?.userName,
    userAccount: formModel?.userAccount,
    userRole: formModel?.userRole,
  }) as any
  if (res?.code === 0) {
    dataSource.value = [...res?.data] ?? []
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    pagination.total = data?.total
    dataSource.value.forEach((data, index) => {
      data.key = (index + 1).toString()
    })
    console.log(dataSource.value)
  }
  else {
    message.error(`${res?.message}`)
    reload()
  }
  pagination.current = 1
  await init()
}

async function onReset() {
  // 清空所有参数重新请求
  formModel.userName = undefined
  formModel.userAccount = undefined
  formModel.id = undefined
  formModel.userProfile = undefined
  formModel.userRole = undefined
}

/**
 * 删除功能
 *  @param record
 *
 */
// async function handleDelete(record: ConsultTableModel) {
//   const close = message.loading('删除中......')
//   try {
//     const res = await deleteUserApi(record!.id)
//     if (res.code === 200)
//       await init()
//     message.success('删除成功')
//   }
//   catch (e) {
//     console.log(e)
//   }
//   finally {
//     close()
//   }
// }

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
  console.log('我来了')
  init()
})

const expand = ref(false)

const visible = ref<boolean>(true)

const editableData: UnwrapRef<Record<string, ConsultTableParams>> = reactive({})

function edit(key: string) {
  visible.value = false
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0])
  console.log(dataSource)
}

async function save(key: string, row: Api.User) {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key])
  delete editableData[key]
  console.log(row)
  const res = await updateUserUsingPost({
    id: row?.id,
    userName: row?.userName,
    userAccount: row?.userAccount,
    userProfile: row?.userProfile,
    userRole: row?.userRole,
  }) as any
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

async function onDelete(row: Api.User) {
  console.log(row)
  if (!row)
    return true
  try {
    await deleteUserUsingPost({
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
</script>

<template>
  <div>
    <a-typography-title :level="4" style="margin-bottom: 16px">
      用户管理
    </a-typography-title>
    <a-card mb-4>
      <a-form :label-col="{ span: 7 }" :model="formModel">
        <a-row :gutter="[15, 0]">
          <a-col :span="8">
            <a-form-item name="账号" label="账号">
              <a-input v-model:value="formModel.userAccount" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="用户名" label="用户名">
              <a-input v-model:value="formModel.userName" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="status" label="状态">
              <a-select
                v-model:value="formModel.userRole"
              >
                <a-select-option value="ADMIN">
                  管理员
                </a-select-option>
                <a-select-option value="USER">
                  用户
                </a-select-option>
              </a-select>
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

    <a-card title="用户管理">
      <template #extra>
        <a-space size="middle">
          <a-button type="primary" @click="() => open = true">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
          <a-tooltip title="刷新">
            <ReloadOutlined @click="onSearch" />
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
      <!--      <a-table :loading="loading" :columns="filterColumns" :data-source="dataSource" :pagination="pagination" :size="tableSize[0] as TableProps['size']"> -->
      <!--        <template #bodyCell="{ column, record }"> -->
      <!--          <template v-if="column.dataIndex === 'action'"> -->
      <!--            <div flex gap-2> -->
      <!--              <a c-error @click="handleDelete(record as ConsultTableModel)"> -->
      <!--                删除 -->
      <!--              </a> -->
      <!--            </div> -->
      <!--          </template> -->
      <!--        </template> -->
      <!--      </a-table> -->
      <a-table
        :loading="loading" :columns="filterColumns" :data-source="dataSource" :pagination="pagination"
        :size="tableSize[0] as TableProps['size']"
      >
        <template #avatar="avatarUrl">
          <img :src="avatarUrl.value" style="width:50px;heigth:50px" alt="">
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="['userName', 'userAccount', 'userProfile'].includes(column.dataIndex)">
            <div>
              <a-input
                v-if="editableData[record.key] as ConsultTableParams"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key] as ConsultTableParams">
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
                title="Sure to delete?"
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
      v-model:open="open" title="创建用户" width="400px" ok-text="提交" :closable="false"
      mask-closable cancel-text="重置" @ok="handleOk(formState)"
      @cancel="resetForm"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="userAccount"
          label="用户账号"
        >
          <a-input v-model:value="formState.userAccount" placeholder="请输入" />
        </a-form-item>
        <a-form-item
          name="userName"
          label="用户名"
        >
          <a-input v-model:value="formState.userName" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="userProfile" label="用户简介">
          <a-textarea v-model:value="formState.userProfile" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="用户权限" name="userRole">
          <a-select v-model:value="formState.userRole" placeholder="请选择">
            <a-select-option value="admin">
              管理员
            </a-select-option>
            <a-select-option value="user">
              用户
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
