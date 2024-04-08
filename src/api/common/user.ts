export interface UserInfo {
  id: number | string
  userName: string
  nickName: string
  userAvatar: string
  userRole?: string | number
  userProfile? :string
}

export function getUserInfoApi() {
  return useGet<UserInfo>('/api/user/get/login')
}
