import request from '../http/request.ts'

/** getMenu GET /api/menu/getMenu */
export async function getMenuUsingGet(options?: { [key: string]: any }) {
  return request<Api.BaseResponseListMenu_>('/api/menu/getMenu', {
    method: 'GET',
    ...(options || {}),
  })
}
