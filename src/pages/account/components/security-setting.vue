<script setup lang="ts">
import {CSSProperties} from "vue";
import {modifyPasswordUsingPost} from "~/autoapi/api/userController.ts";
import {message} from "ant-design-vue";
import router from "~/router";

interface DataItem {
  title: string
  desc: string
}

interface FormValues {
  id: number | string
  userAccount: string | undefined
  userPassword: string | undefined
  checkPassword: string | undefined
}

const {t} = useI18n()

const data = computed<DataItem[]>(() => {
  return [
    {
      title: t('account.settings.security.account-password'),
      desc: t('account.settings.security.account-password-desc'),
    },
  ]
})

const open = ref<boolean>(false);
const userStore = useUserStore()
const {userInfo} = useUserStore()
const formState = reactive<FormValues>({
  id: userInfo!.id,
  userAccount: userInfo?.userAccount,
  userPassword: '',
  checkPassword: ''
})
// @ts-expect-error
const modalTitleRef = ref<HTMLElement>(null);
const showModal = () => {
  open.value = true;
};
const {x, y, isDragging} = useDraggable(modalTitleRef);
const handleOk = async () => {
  const data = await modifyPasswordUsingPost(formState) as any
  if (data?.code === 0) {
    message.success("修改成功,请您重新登陆")
    open.value = false;
    await userStore.logout()
    await router.push({
      path: '/login',
      replace: true,
    })
  }
  else {
    message.error("修改失败," + data?.message)
  }
};
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({left: 0, right: 0, top: 0, bottom: 0});
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value;
    transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
</script>

<template>
  <a-card :title="t('account.settings.security-setting')" :bordered="false">
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
              :description="item.desc"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a-button type="primary" @click="showModal">
              {{ t('account.settings.modify') }}
            </a-button>
          </template>
          <div>
            <a-modal ref="modalRef" v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
              <a-form :model="formState" layout="vertical" name="form_in_modal">
                <a-form-item
                    name="userAccount"
                    label="用户账号"
                >
                  <a-input v-model:value="formState.userAccount" placeholder="请输入"/>
                </a-form-item>
                <a-form-item
                    name="userPassword"
                    label="新密码"
                >
                  <a-input-password v-model:value="formState.userPassword" placeholder="请输入"/>
                </a-form-item>
                <a-form-item
                    name="checkPassword"
                    label="确认密码"
                >
                  <a-input-password v-model:value="formState.checkPassword" placeholder="请输入"/>
                </a-form-item>
              </a-form>
              <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">修改密码</div>
              </template>
              <template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                  <component :is="originVNode"/>
                </div>
              </template>
            </a-modal>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<style scoped lang="less">
:deep(.ant-card-body) {
  padding-left: 0 !important;
}
</style>
