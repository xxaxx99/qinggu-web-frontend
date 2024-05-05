<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { delayTimer } from '@v-c/utils'
import { AxiosError } from 'axios'
import GlobalLayoutFooter from '~/layouts/components/global-footer/index.vue'
import pageBubble from '@/utils/page-bubble'
import { userRegisterUsingPost } from '~/autoapi/api/userController.ts'
import UserRegisterRequest = Api.UserRegisterRequest;

const notification = useNotification()
const appStore = useAppStore()
const { layoutSetting } = storeToRefs(appStore)
const router = useRouter()
const registerModel = reactive({
  userAccount: undefined,
  userPassword: undefined,
  checkPassword: undefined,
  mobile: undefined,
  code: undefined,
  type: 'account',
  remember: true,
})
const { t } = useI18nLocale()
const formRef = shallowRef()
const resetCounter = 60
const submitLoading = shallowRef(false)
const errorAlert = shallowRef(false)
const bubbleCanvas = ref<HTMLCanvasElement>()
const { pause } = useInterval(1000, {
  controls: true,
  immediate: false,
  callback(count) {
    if (count) {
      if (count === resetCounter)
        pause()
    }
  },
})

async function registerSubmit() {
  submitLoading.value = true
  try {
    await formRef.value?.validate()
    let params: UserRegisterRequest
    if (registerModel.type === 'account') {
      if (registerModel.userPassword !== registerModel.checkPassword) {
        // 两个密码不相等，处理错误
        notification.error({
          message: '注册失败',
          description: '两次输入的密码不一致',
        })
        submitLoading.value = false
        return // 结束函数，不继续执行下面的代码
      }
      params = {
        userAccount: registerModel.userAccount,
        userPassword: registerModel.userPassword,
        checkPassword: registerModel.checkPassword,
      } as unknown as UserRegisterRequest
    }
    else {
      params = {
        mobile: registerModel.mobile,
        code: registerModel.code,
        type: 'mobile',
      } as unknown as UserRegisterRequest
    }
    const data = await userRegisterUsingPost(params) as any
    if (data?.code === 0) {
      console.log(data)
      notification.success({
        message: '注册成功',
      })
      await router.push({
        path: '/login',
        replace: true,
      })
    }
    else {
      notification.error({
        message: '注册失败',
        description: `${data.message}`,
      })
      submitLoading.value = false
    }
  }
  catch (e) {
    if (e instanceof AxiosError)
      errorAlert.value = true
    submitLoading.value = false
  }
}

onMounted(async () => {
  await delayTimer(300)
  pageBubble.init(unref(bubbleCanvas)!)
})

onBeforeUnmount(() => {
  pageBubble.removeListeners()
})
</script>

<template>
  <div class="login-container">
    <div h-screen w-screen absolute z-10>
      <canvas ref="bubbleCanvas" />
    </div>
    <div class="login-content flex-center">
      <div class="ant-pro-form-login-main rounded">
        <!-- 注册头部 -->
        <div
          class="flex-between h-15 px-4 mb-[2px]"
        >
          <div class="flex-end">
            <span class="ant-pro-form-login-logo">
              <img w-full h-full object-cover src="/logo.svg" alt="">
            </span>
            <span class="ant-pro-form-login-title">
              清谷代码生成
            </span>
            <span class="ant-pro-form-login-desc">
              {{ t("pages.layouts.userLayout.title") }}
            </span>
          </div>
        </div>
        <a-divider m-0 />
        <!-- 注册主体 -->
        <div class="box-border flex min-h-[520px]">
          <!-- 注册框左侧 -->
          <div class="ant-pro-form-login-main-left min-h-[520px] flex-center  bg-[var(--bg-color-container)]">
            <img src="@/assets/images/login-left.png" class="h-5/6 w-5/6">
          </div>
          <a-divider m-0 type="vertical" class="ant-pro-login-divider  min-h-[520px]" />
          <!-- 注册框右侧 -->
          <div class="ant-pro-form-login-main-right px-5 w-[335px] flex-center flex-col relative z-11">
            <div class="text-center py-6 text-2xl">
              {{ t('pages.login.tips') }}
            </div>
            <a-form ref="formRef" :model="registerModel">
              <a-tabs v-model:activeKey="registerModel.type" centered>
                <a-tab-pane key="account" :tab="t('pages.login.register.tab')" />
              </a-tabs>
              <template v-if="registerModel.type === 'account'" >
                <a-form-item name="userAccount" :rules="[{ required: true, message: t('pages.register.username.required') }]">
                  <a-input
                    v-model:value="registerModel.userAccount" allow-clear
                    autocomplete="off"
                    placeholder="请输入账号" size="large" @press-enter="registerSubmit"
                  >
                    <template #prefix>
                      <UserOutlined />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="userPassword" :rules="[{ required: true, message: t('pages.register.password.required') }]">
                  <a-input-password
                    v-model:value="registerModel.userPassword" allow-clear
                    placeholder="请输入密码" size="large" @press-enter="registerSubmit"
                  >
                    <template #prefix>
                      <LockOutlined />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item name="checkPassword" :rules="[{ required: true, message: t('pages.register.checkPassword.required') }]">
                  <a-input-password
                    v-model:value="registerModel.checkPassword" allow-clear
                    placeholder="请确认密码" size="large" @press-enter="registerSubmit"
                  >
                    <template #prefix>
                      <LockOutlined />
                    </template>
                  </a-input-password>
                </a-form-item>
              </template>
              <div class="mb-24px flex-between" style="justify-content: end">
                <router-link to="/login">
                  老用户登录
                </router-link>
              </div>
              <a-button type="primary" block :loading="submitLoading" size="large" @click="registerSubmit">
                {{ t('pages.register.submit') }}
              </a-button>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <div py-24px px-50px fixed bottom-0 z-11 w-screen :data-theme="layoutSetting.theme" text-14px>
      <GlobalLayoutFooter
        :copyright="layoutSetting.copyright"
      >
        <template #renderFooterLinks>
          <footer-links />
        </template>
      </GlobalLayoutFooter>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: var(--bg-color-container);
}

.login-lang {
  height: 40px;
  line-height: 44px;
}

.login-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.ant-pro-form-login-container {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  padding: 32px 0;
  overflow: auto;
  background: inherit
}

.ant-pro-form-login-header a {
  text-decoration: none
}

.ant-pro-form-login-title {
  color: var(--text-color);
  font-weight: 600;
  font-size: 33px;
  line-height: 1;
}

.ant-pro-form-login-logo {
  width: 44px;
  height: 44px;
  margin-right: 16px;
  vertical-align: top
}

.ant-pro-form-login-desc {
  color: var(--text-color-1);
  font-size: 14px;
  margin-left: 16px
}

.ant-pro-form-login-main-right {
  .ant-tabs-nav-list {
    margin: 0 auto;
    font-size: 16px;
  }

  .ant-pro-form-login-other {
    line-height: 22px;
    text-align: center
  }

}

.ant-pro-form-login-main {
  box-shadow: var(--c-shadow);
}

.icon {
  margin-left: 8px;
  color: var(--text-color-2);
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color .3s;

  &:hover {
    color: var(--pro-ant-color-primary);
  }
}

.login-media(@width:100%) {
  .ant-pro-form-login-main {
    width: @width;
  }
  .ant-pro-form-login-main-left {
    display: none;
  }
  .ant-pro-form-login-main-right {
    width: 100%;
  }
  .ant-pro-form-login-desc {
    display: none;
  }
}

@media (min-width: 992px) {
  .ant-pro-form-login-main-left {
    width: 700px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .ant-pro-login-divider {
    display: none;
  }

  .login-media(400px)
}

@media screen and (max-width: 767px) {
  .login-media(350px);

  .ant-pro-login-divider {
    display: none;
  }
}
</style>
