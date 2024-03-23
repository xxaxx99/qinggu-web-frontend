import type { AccessEnum, STATUS } from '~@/utils/constant'

interface ConsultTableModel {
  /**
   * key
   */
  key: string
  /**
   * id
   */
  id: number
  /**
   * 用户名
   */
  userName: string
  /**
   * 用户账号
   */
  userAccount: string
  /**
   * userProfile
   */
  userProfile: string
  /**
   * 状态
   */
  userRole: AccessEnum
  /**
   * 用户创建时间
   */
  createTime: string

  /**
   * 用户更新时间
   */
  updateTime: string

  // 分页
  current?: number
  // size
  pageSize?: number
}

type ConsultTableParams = Partial<ConsultTableModel>

export async function getUserListApi(params?: ConsultTableParams) {
  return usePost<ConsultTableModel[]>('/api/user/list/page', params)
}

export async function deleteUserApi(id: string | number) {
  return useDelete(`/list/${id}`)
}

export type{
  ConsultTableParams,
  STATUS,
  ConsultTableModel,
}
