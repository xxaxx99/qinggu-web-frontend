import { generateService } from '@umijs/openapi'

generateService({
  // openapi地址
  schemaPath: `http://localhost:8120/api/v2/api-docs`,
  // 文件生成目录
  serversPath: './src/autoapi',
  // 自定义网络请求函数路径
  requestImportStatement: 'import request from "@request"',
  // 代码组织命名空间, 例如：Api
  namespace: 'Api',
})
