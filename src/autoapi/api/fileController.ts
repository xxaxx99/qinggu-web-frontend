import request from '../http/request.ts';

/** uploadFile POST /api/file/upload */
export async function uploadFileUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.uploadFileUsingPOSTParams,
  file?: File,
  options?: { [key: string]: any },
) {

  return request<Api.BaseResponseString_>('/api/file/upload', {
    method: 'POST',
    // params: {
    //   biz: params.biz
    // },
    data: {
      biz: params.biz,
        file: file
    },
    headers: {
      'Content-Type': 'multipart/form-data', // 设置 Content-Type 为 multipart/form-data
    },
    ...(options || {}),
  });
}

/** testDownloadFile GET /api/file/test/download/ */
export async function testDownloadFileUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: Api.DownloadFileUsingGETParams,
    options?: { [key: string]: any },
) {
  return request<any>('/api/file/download/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
