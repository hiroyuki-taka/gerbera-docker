export function getPlaylistType(mimetype: string) {
    if (mimetype === 'audio/x-mpegurl') {
        return 'm3u'
    }
    if (mimetype === 'audio/x-scpls') {
        return 'pls'
    }
    if (mimetype == 'video/x-ms-asf' || mimetype === 'video/x-ms-asx') {
        return 'asx';
    }

    return ''
}

export function escapeSlash(name): string {
    return name.replace(/\\/g, "\\\\").replace(/\//g, "\\/")
}

export function getLastPath(location: string) {
    const p = location.split('/')
    if (p.length > 1 && p[p.length - 2]) {
        return p[p.length - 2]
    } else {
        return ''
    }
}

export function getRootPath(rootPath: string | null, location: string): string[] {
    if (rootPath && rootPath.length > 0) {
        const r = rootPath.substring(0, rootPath.lastIndexOf('/'))
        const dir = location.substring(r.length, location.lastIndexOf('/'))
        if (dir.charAt(0) === '/') {
            return dir.substring(1).split('/')
        } else {
            return dir.split('/')
        }
    } else {
        const dir = getLastPath(location)
        if (dir !== '') {
            return [escapeSlash(dir)]
        }
    }
    return []
}

export function createContainerChain(arr: string[]): string {
    return '/' + (arr.map(s => escapeSlash(s)).join('/'))
}
