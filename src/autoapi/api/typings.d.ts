declare namespace Api {
  interface BaseResponseBoolean_ {
    code?: number
    data?: boolean
    message?: string
  }

  interface BaseResponseGeneratorVO_ {
    code?: number
    data?: GeneratorVO
    message?: string
  }

  interface BaseResponseListMenu_ {
    code?: number
    data?: Menu[]
    message?: string
  }

  interface BaseResponseListUser_ {
    code?: number
    data?: User[]
    message?: string
  }

  interface BaseResponseLoginUserVO_ {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  interface BaseResponseLong_ {
    code?: number
    data?: string
    message?: string
  }

  interface BaseResponsePageGenerator_ {
    code?: number
    data?: PageGenerator_
    message?: string
  }

  interface BaseResponsePageGeneratorVO_ {
    code?: number
    data?: PageGeneratorVO_
    message?: string
  }

  interface BaseResponsePageUser_ {
    code?: number
    data?: PageUser_
    message?: string
  }

  interface BaseResponsePageUserVO_ {
    code?: number
    data?: PageUserVO_
    message?: string
  }

  interface BaseResponseString_ {
    code?: number
    data?: string
    message?: string
  }

  interface BaseResponseUser_ {
    code?: number
    data?: User
    message?: string
  }

  interface BaseResponseUserVO_ {
    code?: number
    data?: UserVO
    message?: string
  }

  interface DeleteRequest {
    id?: string
  }

  interface FileConfig {
    files?: FileInfo[]
    inputRootPath?: string
    outputRootPath?: string
    sourceRootPath?: string
    type?: string
  }

  interface FileInfo {
    condition?: string
    files?: FileInfo[]
    generateType?: string
    groupKey?: string
    groupName?: string
    inputPath?: string
    outputPath?: string
    type?: string
  }

  interface Generator {
    author?: string
    basePackage?: string
    createTime?: string
    description?: string
    distPath?: string
    fileConfig?: string
    id?: string
    isDelete?: number
    modelConfig?: string
    name?: string
    picture?: string
    status?: number
    tags?: string
    updateTime?: string
    userId?: string
    version?: string
  }

  interface GeneratorAddRequest {
    author?: string
    basePackage?: string
    description?: string
    distPath?: string
    fileConfig?: FileConfig
    modelConfig?: ModelConfig
    name?: string
    picture?: string
    status?: number
    tags?: string[]
    version?: string
  }

  interface GeneratorEditRequest {
    author?: string
    basePackage?: string
    description?: string
    distPath?: string
    fileConfig?: FileConfig
    id?: string
    modelConfig?: ModelConfig
    name?: string
    picture?: string
    tags?: string[]
    version?: string
  }

  interface GeneratorQueryRequest {
    author?: string
    basePackage?: string
    current?: number
    description?: string
    distPath?: string
    id?: string
    name?: string
    notId?: string
    orTags?: string[]
    pageSize?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    status?: number
    tags?: string[]
    userId?: string
    version?: string
  }

  interface GeneratorUpdateRequest {
    author?: string
    basePackage?: string
    description?: string
    distPath?: string
    fileConfig?: FileConfig
    id?: string
    modelConfig?: ModelConfig
    name?: string
    picture?: string
    status?: number
    tags?: string[]
    version?: string
  }

  interface GeneratorUseRequest {
    dataModel?: Record<string, any>
    id?: string
  };

  interface GeneratorVO {
    author?: string
    basePackage?: string
    createTime?: string
    description?: string
    distPath?: string
    fileConfig?: FileConfig
    id?: string
    modelConfig?: ModelConfig
    name?: string
    picture?: string
    status?: number
    tags?: string[]
    updateTime?: string
    user?: UserVO
    userId?: string
    version?: string
  }

  interface getGeneratorVOByIdUsingGETParams {
    /** id */
    id?: string
  }

  interface getUserByIdUsingGETParams {
    /** id */
    id?: string
  }

  interface getUserVOByIdUsingGETParams {
    /** id */
    id?: string
  }

  interface downloadGeneratorByIdUsingGETParams {
    /** id */
    id?: string;
  };

  interface LoginUserVO {
    createTime?: string
    id?: string
    nickName?: string
    token?: string
    updateTime?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  interface Menu {
    component?: string
    createTime?: string
    icon?: string
    id?: string
    isDelete?: number
    keepAlive?: number
    locale?: string
    name?: string
    parentId?: string
    path?: string
    title?: string
    updateTime?: string
  }

  interface ModelConfig {
    models?: ModelInfo[]
  }

  interface ModelInfo {
    abbr?: string
    allArgsStr?: string
    condition?: string
    defaultValue?: string
    description?: string
    fieldName?: string
    groupKey?: string
    groupName?: string
    models?: ModelInfo[]
    type?: string
  }

  interface OrderItem {
    asc?: boolean
    column?: string
  }

  interface PageGenerator_ {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: Generator[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  interface PageGeneratorVO_ {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: GeneratorVO[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  interface PageUser_ {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: User[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  interface PageUserVO_ {
    countId?: string
    current?: string
    maxLimit?: string
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: string
    records?: UserVO[]
    searchCount?: boolean
    size?: string
    total?: string
  }

  interface searchUsersUsingGETParams {
    createTime?: string
    current?: number
    id?: string
    pageSize?: number
    sortField?: string
    sortOrder?: string
    updateTime?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  interface uploadFileUsingPOSTParams {
    /** biz */
    biz?: string
  }

  interface DownloadFileUsingGETParams {
    /** filepath */
    filepath?: string
  };

  interface User {
    createTime?: string
    id?: string
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  interface UserAddRequest {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userRole?: string
  }

  interface UserLoginRequest {
    userAccount?: string
    userPassword?: string
  }

  interface UserQueryRequest {
    createTime?: string
    current?: number
    id?: string
    pageSize?: number
    sortField?: string
    sortOrder?: string
    updateTime?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  interface UserRegisterRequest {
    checkPassword?: string
    userAccount?: string
    userPassword?: string
  }

  interface ModifyPasswordRequest {
    id: number | string
    checkPassword?: string
    userAccount?: string
    userPassword?: string
  }

  interface UserUpdateMyRequest {
    userAvatar?: string
    userName?: string
    userProfile?: string
  }

  interface UserUpdateRequest {
    id?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  interface UserVO {
    createTime?: string
    id?: string
    updateTime?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }
}
