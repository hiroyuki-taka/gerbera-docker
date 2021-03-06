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

const regex = /.*\/(.)\/([0-9]{4})([0-4]Q) (.*)\/(.*?)(-[0-9]+年[0-9]+月[0-9]+日[0-9]+時[0-9]+分)?(-cm)?\.mp4$/

function addVideo(obj: Orig) {

    const found = obj.location.match(regex)

    print('addVideo', found)

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
        print(JSON.stringify(obj.meta))

        // addCdsObject({...obj}, createContainerChain(['Video', 'All Video', `${year}${season} ${title}`]))

        if (is_cm === '-cm') {
            addCdsObject({...obj}, createContainerChain(['Video', 'Title', title, 'CM']))
            addCdsObject({...obj}, createContainerChain(['Video', 'Directories', container, title, 'CM']))
            addCdsObject({...obj}, createContainerChain(['Video', 'Season', year, season, title, 'CM']))
        } else {
            obj = {...obj, title: subtitle}
            addCdsObject({...obj}, createContainerChain(['Video', 'Title', title]))
            addCdsObject({...obj}, createContainerChain(['Video', 'Directories', container, title]))
            addCdsObject({...obj}, createContainerChain(['Video', 'Season', year, season, title]))
        }
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