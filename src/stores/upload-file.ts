import {FileListItem} from "~/stores/upload-picture.ts";

export const useFileStore = defineStore('file', () => {
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

