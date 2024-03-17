// https://docs.gerbera.io/en/stable/scripting.html#constants
export declare const OBJECT_TYPE_CONTAINER: 1
export declare const OBJECT_TYPE_ITEM: 2
export declare const OBJECT_TYPE_ITEM_EXTERNAL_URL: 8

type ObjectType = typeof OBJECT_TYPE_CONTAINER | typeof OBJECT_TYPE_ITEM | typeof OBJECT_TYPE_ITEM_EXTERNAL_URL;

export declare const UPNP_CLASS_CONTAINER: "object.container"
export declare const UPNP_CLASS_PLAYLIST_CONTAINER: "object.container.playlistContainer"
export declare const UPNP_CLASS_ITEM: "object.item"
export declare const UPNP_CLASS_AUDIO_ITEM: "object.item.audioItem"
export declare const UPNP_CLASS_ITEM_MUSIC_TRACK: "object.item.audioItem.musicTrack"
export declare const UPNP_CLASS_AUDIO_BOOK: "object.item.audioItem.audioBook"
export declare const UPNP_CLASS_AUDIO_BROADCAST: "object.item.audioItem.audioBroadcast"
export declare const UPNP_CLASS_VIDEO_ITEM: "object.item.videoItem"
export declare const UPNP_CLASS_VIDEO_MOVIE: "object.item.videoItem.movie"

type UpnpClass = typeof UPNP_CLASS_CONTAINER
    | typeof UPNP_CLASS_PLAYLIST_CONTAINER
    | typeof UPNP_CLASS_ITEM
    | typeof UPNP_CLASS_AUDIO_ITEM
    | typeof UPNP_CLASS_ITEM_MUSIC_TRACK
    | typeof UPNP_CLASS_AUDIO_BOOK
    | typeof UPNP_CLASS_AUDIO_BROADCAST
    | typeof UPNP_CLASS_VIDEO_ITEM
    | typeof UPNP_CLASS_VIDEO_MOVIE

export declare const M_TITLE
export declare const M_ARTIST
export declare const M_ALBUM
export declare const M_DATE
export declare const M_GENRE
export declare const M_DESCRIPTION
export declare const M_REGION
export declare const M_TRACKNUMBER
export declare const M_PARTNUMBER
export declare const M_AUTHOR

export declare const ONLINE_SERVICE_NONE: "ONLINE_SERVICE_NONE"
export declare const ONLINE_SERVICE_APPLE_TRAILERS: "ONLINE_SERVICE_APPLE_TRAILERS"

type OnlineServiceType = typeof ONLINE_SERVICE_NONE | typeof ONLINE_SERVICE_APPLE_TRAILERS

export interface Orig {
    readonly id?: number
    readonly parentID?: number
    objectType: ObjectType
    mimetype?: string
    upnpclass: UpnpClass
    readonly location?: string
    title: string
    readonly onlineservice?: OnlineServiceType
    readonly theora?: number
    readonly res?: any
    readonly aux?: any
    playlistOrder?: number
    meta?: any
    metaData?: Record<string, any>
}

export class ContainerOrig implements Orig {
    constructor(public title, public objectType=OBJECT_TYPE_CONTAINER, public upnpclass=UPNP_CLASS_CONTAINER) {
    }
}

type ContainerId = string


// https://docs.gerbera.io/en/stable/scripting.html#functions

// Native Functions Available To All Scripts
export declare function addCdsObject(obj: Orig, containerId: ContainerId)
export declare function addContainerTree(arr: Orig[]): ContainerId
export declare function copyObject(originalObject: Orig): Orig
export declare function  print(...values)
/** Converts filesystem charset to internal UTF-8 */
export declare function f2i(str: string): string
/** Converts metadata charset to internal UTF-8 */
export declare function m2i(str: string): string
/** Converts playlist charset to internal UTF-8 */
export declare function p2i(str: string): string
/** Converts js charset to internal UTF-8 */
export declare function j2i(str: string): string

// Native Functions Available To The Playlist Script
export declare function readln(): string

// Helper Functions
/** Escapes slash ‘/’ characters in a string */
export declare function escapeSlash(name: string): string
export declare function createContainerChain(arr: any[]): string
export declare function mapGenre(genre: string): string