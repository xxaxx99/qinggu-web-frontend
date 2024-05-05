export interface UserInfo {
  id: number | string
  userName: string
  userAvatar: string
  userRole?: string | number
  userProfile? :string
  userAccount? :string
}

export function getUserInfoApi() {
  return useGet<UserInfo>('/api/user/get/login')
}
