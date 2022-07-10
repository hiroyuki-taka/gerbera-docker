import {createContainerChain, getPlaylistType, getRootPath} from "./common";

declare const config: any

declare const object_script_path: string

declare const ONLINE_SERVICE_APPLE_TRAILERS
declare const ONLINE_SERVICE_NONE

declare const OBJECT_TYPE_CONTAINER
declare const OBJECT_TYPE_ITEM
declare const OBJECT_TYPE_ITEM_EXTERNAL_URL
declare const UPNP_CLASS_CONTAINER

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
declare function addContainerTree(tree: any): string
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
    readonly res
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

const regex = /.*\/(.)\/([0-9]{4})([0-4]Q) (.*)\/(.*?)(-[0-9]+年[0-9]+月[0-9]+日[0-9]+時[0-9]+分)?(-cm)?\.mp4$/

function addVideo(obj: Orig) {

    const found = obj.location.match(regex)

    const dir = getRootPath(object_script_path, obj.location)
    print('addVideo::Item', found, dir)

    const chain = {
        video: {title: 'Video', objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER, metaData: []},
        title: {title: 'Title', objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER},
        directories: {title: 'Directories', objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER},
        season: {title: 'Season', objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER},
        parentItem: {title: '...', objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER, metaData: [], res: obj.res, aux: obj.aux, refID: obj.id},
    }

    if (found) {
        const [full, container, year, season, title, subtitle, airtime, is_cm] = found

        if (airtime) {
            obj.meta[M_DATE] = airtime.replace(/-([0-9]+)年([0-9]+)月([0-9]+)日[0-9]+時[0-9]+分/, '$1-$2-$3')
        } else {
            switch (season) {
                case '1Q':
                    obj.meta[M_DATE] = `${year}-01-01`
                    break
                case '2Q':
                    obj.meta[M_DATE] = `${year}-04-01`
                    break
                case '3Q':
                    obj.meta[M_DATE] = `${year}-07-01`
                    break
                case '4Q':
                    obj.meta[M_DATE] = `${year}-10-01`
            }
        }
        print('addVideo::meta', JSON.stringify(obj.meta))

        if (is_cm === '-cm') {
            const titleItem = {title: title, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}
            const containerItem = {title: container, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}
            const yearItem = {title: year, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}
            const seasonItem = {title: season, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}

            addCdsObject({...obj}, addContainerTree([chain.video, chain.title, titleItem, {...chain.parentItem, title: 'CM'}]))
            addCdsObject({...obj}, addContainerTree([chain.video, chain.directories, containerItem, titleItem, {...chain.parentItem, title: 'CM'}]))
            addCdsObject({...obj}, addContainerTree([chain.video, chain.season, yearItem, seasonItem, titleItem, {...chain.parentItem, title: 'CM'}]))
        } else {
            obj = {...obj, title: subtitle}

            const containerItem = {title: container, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}
            const yearItem = {title: year, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}
            const seasonItem = {title: season, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER}

            addCdsObject({...obj}, addContainerTree([chain.video, chain.title, {...chain.parentItem, title: title}]))
            addCdsObject({...obj}, addContainerTree([chain.video, chain.directories, containerItem, {...chain.parentItem, title: title}]))
            addCdsObject({...obj}, addContainerTree([chain.video, chain.season, yearItem, seasonItem, {...chain.parentItem, title: title}]))
        }
    }
}

if (getPlaylistType(orig.mimetype) === '') {
    const arr = orig.mimetype.split('/');
    let mime = arr[0]

    const obj = {...orig, refID: orig.id}

    const upnpClass = orig.upnpclass
    const audioLayout = config['/import/scripting/virtual-layout/attribute::audio-layout'] || 'Default'

    switch (upnpClass) {
        case 'object.item.videoItem':
        case 'object.item.videoItem.movie':
            addVideo(obj)
            break
        case 'object.item.audioItem':
        case 'object.item.audioItem.multiTrack':
        case 'object.item.audioItem.audioBook':
        case 'object.item.audioItem.audioBroadcast':
        default:
            print(`Unable to handle upnp class: ${upnpClass} for ${obj.location}`)
            if (mime === 'video' && obj.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS) {
                mime = 'trailer'
            }
            if (orig.mimetype === 'application/ogg') {
                mime = (orig.theora === 1) ? 'video' : 'audio'
            }
            switch (mime) {
                case 'video':
                    addVideo(obj)
                    break
                default:
                    print(`Unable to handle mime type: ${orig.mimetype} for ${obj.location}`)
            }
    }
}