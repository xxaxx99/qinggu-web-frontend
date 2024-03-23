import type { LayoutSetting } from '~@/stores/app'

export default {
  'title': '清谷代码生成',
  'theme': 'light',
  'logo': '/logo.svg',
  'collapsed': false,
  'drawerVisible': true,
  'colorPrimary': '#1677FF',
  'layout': 'top',
  'contentWidth': 'Fixed',
  'fixedHeader': false,
  'fixedSider': true,
  'splitMenus': false,
  'header': true,
  'menu': true,
  'watermark': false,
  'menuHeader': true,
  'footer': false,
  'colorWeak': false,
  'multiTab': false,
  'multiTabFixed': false,
  'keepAlive': false,
  'accordionMode': false,
  'leftCollapsed': true,
  'compactAlgorithm': false,
  'headerHeight': 48,
  'copyright': 'xxaxx99',
  'animationName': 'slide-fadein-up',
} as LayoutSetting

export const animationNameList = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Fadein Up',
    value: 'slide-fadein-up',
  },
  {
    label: 'Fadein Right',
    value: 'slide-fadein-right',
  },
  {
    label: 'Zoom Fadein',
    value: 'zoom-fadein',
  },
  {
    label: 'Fadein',
    value: 'fadein',
  },
]
export type AnimationNameValueType = 'none' | 'slide-fadein-up' | 'slide-fadein-right' | 'zoom-fadein' | 'fadein'
