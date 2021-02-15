import {createContainerChain, getPlaylistType, getRootPath} from "./common";

declare const object_script_path: string

declare const ONLINE_SERVICE_APPLE_TRAILERS
declare const ONLINE_SERVICE_NONE

declare const OBJECT_TYPE_CONTAINER
declare const OBJECT_TYPE_ITEM
declare const OBJECT_TYPE_ITEM_EXTERNAL_URL

declare const M_TITLE
declare const M_ARTIST
declare const M_ALBUM
declare const M_DATE
declare const M_GENRE
declare const M_DESCRIPTION
declare const M_REGION
declare const M_TRACKNUMBER
declare const M_PARTNUMBER
declare const M_AUTHOR

declare function addCdsObject(obj: Orig, containerChain: string, lastContainerClass?: string)
declare function copyObject<T>(originalObject: T): T
declare function print(...values)
declare function f2i(s: string): string
declare function m2i(s: string): string
declare function p2i(s: string): string
declare function j2i(s: string): string


interface Orig {
    readonly id: number
    readonly parentID: number
    objectType: any
    mimetype: string
    upnpclass: string
    readonly location: string
    title: string
    readonly onlineservice: any
    readonly theora: number
    readonly aux
    playlistOrder: number
    meta: any
}

declare const orig: Orig

function addAudio(obj: Orig) {
    const desc: string[] = []
    let artist_full
    let album_full

    const title = obj.meta[M_TITLE] || obj.title

    let artist = obj.meta[M_ARTIST]
    if (artist) {
        artist_full = artist
        desc.push(artist)
    } else {
        artist = 'Unknown'
        artist_full = null
    }

    let album = obj.meta[M_ALBUM]
    if (album) {
        album_full = album
        desc.push(album)
    } else {
        album = 'Unknown'
        album_full = null
    }

    desc.push(title)
}

function addVideo(obj: Orig) {
    print('addVideo', JSON.stringify(obj))

    addCdsObject(obj, createContainerChain(['Video', 'All Video']))

    const dir = getRootPath(object_script_path, obj.location)
    if (dir.length > 0) {
        const chain = ['Video', 'Directories', ...dir]
        addCdsObject(obj, createContainerChain(chain))
    }
}

if (getPlaylistType(orig.mimetype) === '') {
    const arr = orig.mimetype.split('/');
    const mime = arr[0]

    const obj = {...orig, refID: orig.id}

    if (mime === 'audio') {

    }

    if (mime === 'video') {
        if (obj.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS) {

        } else {
            addVideo(obj)
        }
    }

    if (mime === 'video') {

    }

    if (orig.mimetype === 'application/ogg') {
        if (orig.theora === 1) {

        } else {

        }
    }
}