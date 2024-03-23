export interface ListResultModel {
  id: number
  title: string
  username: string
  password: string
}

export type ListResultParams = Partial<Omit<ListResultModel, 'id' | 'password'>>

export async function getUserListApi(params?: ListResultParams) {
  return usePost<ListResultModel[]>('/list/basic-list', params)
}
