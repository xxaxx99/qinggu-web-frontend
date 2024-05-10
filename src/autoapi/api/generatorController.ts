import request from '../http/request.ts'

/** addGenerator POST /api/generator/add */
export async function addGeneratorUsingPost(
  body: Api.GeneratorAddRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseLong_>('/api/generator/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** deleteGenerator POST /api/generator/delete */
export async function deleteGeneratorUsingPost(
  body: Api.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/generator/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** editGenerator POST /api/generator/edit */
export async function editGeneratorUsingPost(
  body: Api.GeneratorEditRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/generator/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getGeneratorVOById GET /api/generator/get/vo */
export async function getGeneratorVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.getGeneratorVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseGeneratorVO_>('/api/generator/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** listGeneratorByPage POST /api/generator/list/page */
export async function listGeneratorByPageUsingPost(
  body: Api.GeneratorQueryRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponsePageGenerator_>('/api/generator/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listGeneratorVOByPage POST /api/generator/list/page/vo */
export async function listGeneratorVoByPageUsingPost(
  body: Api.GeneratorQueryRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponsePageGeneratorVO_>('/api/generator/list/page/vo/fast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listMyGeneratorVOByPage POST /api/generator/my/list/page/vo */
export async function listMyGeneratorVoByPageUsingPost(
  body: Api.GeneratorQueryRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponsePageGeneratorVO_>('/api/generator/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateGenerator POST /api/generator/update */
export async function updateGeneratorUsingPost(
  body: Api.GeneratorUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<Api.BaseResponseBoolean_>('/api/generator/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** downloadGeneratorById GET /api/generator/download */
export async function downloadGeneratorByIdUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: Api.downloadGeneratorByIdUsingGETParams,
    options?: { [key: string]: any },
) {
  return request<any>('/api/generator/download', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** useGenerator POST /api/generator/use */
export async function useGeneratorUsingPost(
    body: Api.GeneratorUseRequest,
    options?: { [key: string]: any },
) {
  return request<any>('/api/generator/use', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** makeGenerator POST /api/generator/make */
export async function makeGeneratorUsingPost(
    body: Api.GeneratorMakeRequest,
    options?: { [key: string]: any },
) {
  return request<any>('/api/generator/make', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
