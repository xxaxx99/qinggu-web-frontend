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

    return {
        fileList,
        addFile
    }
})

