
// Constant
// objectType
declare const OBJECT_TYPE_CONTAINER: number
declare const OBJECT_TYPE_ITEM: number
declare const OBJECT_TYPE_ITEM_EXTERNAL_URL: number

// - For default Video Layout:
declare const BK_videoAllDates: string
declare const BK_videoAllDirectories: string
declare const BK_videoAll: string
declare const BK_videoAllYears: string
declare const BK_videoRoot: string
declare const BK_videoUnknown: string

// Types
type ContainerId = string
interface FileObject {
    title: string
    objectType: number
    upnpclass: string
}

interface Orig {
    objectType: number
    title: string
    readonly id: number
    readonly parentID: number
    searchable: boolean
    upnpclass: string
    readonly location: string
    readonly theora: boolean
}

// Functions
declare function addCdsObject(obj: FileObject, containerId: ContainerId)
declare function addContainerTree(obj: FileObject[]): ContainerId
declare function copyObject(originalObject: FileObject): FileObject
declare function print(...data)
declare function print2(level: "Error" | "Warning" | "Info" | "Debug", ...data)

declare function escapeSlash(name: string): string
declare function createContainerChain(arr: string[]): string
