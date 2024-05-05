import { AxiosError } from 'axios'
import router from '~/router'
import { useMetaTitle } from '~/composables/meta-title'
import { setRouteEmitter } from '~@/utils/route-listener'
import {message} from "ant-design-vue";
import {getLoginUserUsingGet} from "~/autoapi/api/userController.ts";
import BaseResponseLoginUserVO_ = Api.BaseResponseLoginUserVO_;

const allowList = ['/login','/register', '/error', '/401', '/404', '/403']
const loginPath = '/login'

router.beforeEach(async (to, _, next) => {
  setRouteEmitter(to)
  // 获取
  const userStore = useUserStore()
  const res = await getLoginUserUsingGet() as BaseResponseLoginUserVO_
  if (res.code === 40100) {
    if (!allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      next({
        path: loginPath,
        query: {
          redirect: encodeURIComponent(to.fullPath),
        },
      })
      message.error("请先登录后在使用")
      return
    }
  }
  else {
    if (!userStore.userInfo && !allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      try {
        // 获取用户信息
        await userStore.getUserInfo()
        // 获取路由菜单的信息
        const currentRoute = await userStore.generateDynamicRoutes()
        router.addRoute(currentRoute)
        next({
          ...to,
          replace: true,
        })
        return
      }
      catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          // 跳转到error页面
          next({
            path: '/401',
          })
        }
      }
    }
    else {
      // 如果当前是登录页面就跳转到首页
      if (to.path === loginPath) {
        next({
          path: '/',
        })
        return
      }
    }
  }
  next()
})

router.afterEach((to) => {
  useMetaTitle(to)
  useLoadingCheck()
  useScrollToTop()
})