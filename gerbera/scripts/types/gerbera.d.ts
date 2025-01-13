export {}

declare global {
  // Constant
  // objectType
  const OBJECT_TYPE_CONTAINER: number
  const OBJECT_TYPE_ITEM: number
  const OBJECT_TYPE_ITEM_EXTERNAL_URL: number

  const M_CONTENT_CLASS: string
  const UPNP_CLASS_CONTAINER: string
  const UPNP_CLASS_VIDEO_ITEM: string

  // orig.metaData.key
  const M_TITLE: string = "dc:title"
  const M_ARTIST: string = "upnp:artist"
  const M_DATE: string = "dc:date"
  const M_GENRE: string
  const M_DESCRIPTION: string
  const M_TRACKNUMBER: string
  const M_PARTNUMBER: string

  // - For default Video Layout:
  const BK_videoAllDates: string
  const BK_videoAllDirectories: string
  const BK_videoAll: string
  const BK_videoAllYears: string
  const BK_videoRoot: string
  const BK_videoUnknown: string

  const object_script_path: string
  const grb_container_type_audio: string
  const grb_container_type_video: string
  const grb_container_type_image: string

  // Types
  type ContainerId = string

  interface CdsObject {
    id?: number
    title: string
    objectType: number
    upnpclass: string
    metaData?: any[]
  }

  // https://docs.gerbera.io/en/stable/scripting.html#general-properties
  interface Orig {
    objectType: number
    title: string
    id?: number
    parentID: number
    searchable: boolean
    upnpclass: string
    location: string
    theora: number
    mimetype: string
    metaData?: {
      [key: string]: string
    }
    [key: string]: any
  }

  interface Global {
    // Functions
    addCdsObject(obj: CdsObject, containerId: ContainerId)
    addContainerTree(obj: CdsObject[]): ContainerId

    copyObject(originalObject: CdsObject): CdsObject
    print(...data)
    print2(level: "Error" | "Warning" | "Info" | "Debug", ...data)

    escapeSlash(name: string): string

    createContainerChain(arr: string[]): string
  }

  // config
  // https://docs.gerbera.io/en/stable/scripting.html#configuration
  declare const config: {
    [key: string]: any
  }
}
