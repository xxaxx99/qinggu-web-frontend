export interface FileListItem {
    uid: string;
    name: string;
    status: string;
    url: string;
}

export const usePictureStore = defineStore('picture', () => {
    const fileList = shallowRef([] as FileListItem[])

    const addFile = (file: FileListItem) => {
        fileList.value.push(file)
    }

    // 在组件销毁时清空 fileList 数据
    const clearFileList = () => {
        fileList.value = [];
    };

    return {
        fileList,
        addFile,
        clearFileList
    }
})

