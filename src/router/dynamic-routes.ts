import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'
import { AccessEnum } from '~@/utils/constant'

export default [
  {
    path: '/',
    name: '主页',
    component: () => import('~/pages/Index/index.vue'),
    meta: {
      icon: 'BankOutlined',
      title: '主页',
      locale: '主页',
    },
  },
  {
    path: '/generator/add',
    name: '创建生成器',
    component: () => import('~/pages/Generator/Add/index.vue'),
    meta: {
      icon: 'PlusOutlined',
      title: '创建生成器',
      locale: '创建生成器',
    },
  },
  {
    path: '/admin',
    redirect: '/admin/user',
    name: 'List',
    meta: {
      title: '管理页',
      icon: 'TableOutlined',
      locale: 'menu.list',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/admin/generator',
        name: 'GeneratorAdmin',
        component: () => import('~/pages/Admin/Generator/index.vue'),
        meta: {
          title: '生成器管理',
          locale: 'menu.admin.generator-admin',
        },
      },
      {
        path: '/admin/user',
        name: 'UserAdmin',
        component: () => import('~/pages/Admin/User/index.vue'),
        meta: {
          title: '用户管理',
          locale: 'menu.admin.user-admin',
          access: AccessEnum.ADMIN,
        },
      },
    ],
  },
  {
    path: '/account',
    redirect: '/account/center',
    name: 'Account',
    meta: {
      title: '个人页',
      icon: 'UserOutlined',
      locale: 'menu.account',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('~/pages/account/center.vue'),
        meta: {
          title: '个人主页',
          locale: 'menu.account.center',
        },
      },
      {
        path: '/account/settings',
        name: 'AccountSettings',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置',
          locale: 'menu.account.settings',
        },
      },
      {
        path: '/account/settings/:id',
        name: 'AccountSettings1',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置1',
          locale: 'menu.account.settings',
          hideInMenu: true,
          parentKeys: ['/account/settings'],
        },
      },
    ],
  },
] as RouteRecordRaw[]
