import request from '../src/autoapi/http/request';

/** uploadFile POST /api/file/upload */
export async function uploadFileUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.uploadFileUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {

  return request<Api.BaseResponseString_>('/api/file/upload', {
    method: 'POST',
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
