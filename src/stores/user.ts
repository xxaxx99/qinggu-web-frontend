import {logoutApi} from '~@/api/common/login'
import {getRouteMenusApi} from '~@/api/common/menu'
import type {UserInfo} from '~@/api/common/user'
import type {MenuData} from '~@/layouts/basic-layout/typing'
import {rootRoute} from '~@/router/constant'
import {generateFlatRoutes, generateRoutes, generateTreeRoutes} from '~@/router/generate-route'
import {DYNAMIC_LOAD_WAY, DynamicLoadEnum} from '~@/utils/constant'
import {getUserInfoApi} from '~@/api/common/user'
import {message} from "ant-design-vue";

export const useUserStore = defineStore('user', () => {
    const routerData = shallowRef()
    const menuData = shallowRef<MenuData>([])
    const userInfo = shallowRef<UserInfo>()
    const token = useAuthorization()
    const avatar = computed(() => userInfo.value?.userAvatar)
    const nickname = computed(() => userInfo.value?.nickName ?? userInfo.value?.userName)
    const roles = computed(() => userInfo.value?.userRole)
    const userName = computed(() => userInfo.value?.userName)

    const getMenuRoutes = async () => {
        const {data} = await getRouteMenusApi()
        return generateTreeRoutes(data ?? [])
    }

    const generateDynamicRoutes = async () => {
        const dynamicLoadWay = DYNAMIC_LOAD_WAY === DynamicLoadEnum.BACKEND ? getMenuRoutes : generateRoutes
        const {menuData: treeMenuData, routeData} = await dynamicLoadWay()
        menuData.value = treeMenuData
        routerData.value = {
            ...rootRoute,
            children: generateFlatRoutes(routeData),
        }
        return routerData.value
    }

    // 获取用户信息
    const getUserInfo = async () => {
        try {
            const res = await getUserInfoApi()
            if (res.code === 0)
                userInfo.value = res.data
        } catch (e: any) {
            message.error('您的登录状态已过期，请重新登陆')
        }
    }

    const logout = async () => {
        // 退出登录
        // 1. 清空用户信息
        try {
            await logoutApi()
        } finally {
            token.value = null
            userInfo.value = undefined
            routerData.value = undefined
            menuData.value = []
        }
    }

    return {
        userInfo,
        roles,
        getUserInfo,
        logout,
        routerData,
        menuData,
        generateDynamicRoutes,
        avatar,
        nickname,
        userName,
    }
})
