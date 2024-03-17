import {getPlaylistType, getRootPath} from "./common";
import {
    addCdsObject,
    addContainerTree,
    ContainerOrig,
    M_ALBUM,
    M_ARTIST,
    M_DATE,
    M_TITLE,
    ONLINE_SERVICE_APPLE_TRAILERS,
    Orig,
    print,
    UPNP_CLASS_AUDIO_BOOK,
    UPNP_CLASS_AUDIO_BROADCAST,
    UPNP_CLASS_AUDIO_ITEM,
    UPNP_CLASS_ITEM_MUSIC_TRACK,
    UPNP_CLASS_VIDEO_ITEM,
    UPNP_CLASS_VIDEO_MOVIE
} from "./native-function";

declare const config: any
declare const object_script_path: string
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

    const chain: Record<string, Orig> = {
        video: new ContainerOrig("Video"),
        title: new ContainerOrig("Title"),
        directories: new ContainerOrig("Directory"),
        season: new ContainerOrig("Season"),
    }

    if (found) {
        const [_, container, year, season, title, subtitle, airtime, is_cm] = found

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

        const titleTree = [new ContainerOrig("Video"), new ContainerOrig("Title")]
        const directoryTree = [new ContainerOrig("Video"), new ContainerOrig("Directory")]
        const seasonTree = [new ContainerOrig("Video"), new ContainerOrig("Season")]

        if (is_cm === '-cm') {
            addCdsObject({...obj}, addContainerTree([...titleTree, new ContainerOrig(title), new ContainerOrig("CM")]))
            addCdsObject({...obj}, addContainerTree([...directoryTree, new ContainerOrig(container), new ContainerOrig(title), new ContainerOrig("CM")]))
            addCdsObject({...obj}, addContainerTree([chain.video, chain.season, new ContainerOrig(year), new ContainerOrig(season), new ContainerOrig(title), new ContainerOrig("CM")]))
        } else {
            obj = {...obj, title: subtitle}

            addCdsObject({...obj}, addContainerTree([...titleTree, new ContainerOrig(title)]))
            addCdsObject({...obj}, addContainerTree([...directoryTree, new ContainerOrig(container), new ContainerOrig(title)]))
            addCdsObject({...obj}, addContainerTree([...seasonTree, new ContainerOrig(year), new ContainerOrig(season), new ContainerOrig(title)]))
        }
    }
}

if (getPlaylistType(orig.mimetype) === '') {
    const arr = orig.mimetype.split('/');
    let mime = arr[0]

    const obj = {...orig, parentID: orig.id}

    const upnpClass = orig.upnpclass
    const audioLayout = config['/import/scripting/virtual-layout/attribute::audio-layout'] || 'Default'

    switch (upnpClass) {
        case UPNP_CLASS_VIDEO_ITEM:
        case UPNP_CLASS_VIDEO_MOVIE:
            addVideo(obj)
            break
        case UPNP_CLASS_AUDIO_ITEM:
        case UPNP_CLASS_ITEM_MUSIC_TRACK:
        case UPNP_CLASS_AUDIO_BOOK:
        case UPNP_CLASS_AUDIO_BROADCAST:
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