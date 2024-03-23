import request from '../http/request.ts'

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: Api.UserAddRequest, options?: { [key: string]: any }) {
  return request<Api.BaseResponseLong_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  body: Api.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseUser_>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<Api.BaseResponseLoginUserVO_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  })
}

/** getUserVOById GET /api/user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseUserVO_>('/api/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** searchUsers GET /api/user/getUsers */
export async function searchUsersUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.searchUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseListUser_>('/api/user/getUsers', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** listUserByPage POST /api/user/list/page */
export async function listUserByPageUsingPost(
  body: Api.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponsePageUser_>('/api/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: Api.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponsePageUserVO_>('/api/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: Api.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseLoginUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<Api.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: Api.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: Api.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateMyUser POST /api/user/update/my */
export async function updateMyUserUsingPost(
  body: Api.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
