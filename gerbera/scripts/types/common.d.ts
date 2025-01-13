declare global {
    function getPlaylistType(mimetype: string): string;
    function addAudioStructured(obj: Orig, cont: Orig, rootPath: string, containerType: string): any[];
    function addAudio(obj: Orig, cont: Orig, rootPath: string, containerType: string): any[];
    function addVideo(obj: Orig, cont: Orig, rootPath: string, containerType: string): any[];
    function addImage(obj: Orig, cont: Orig, rootPath: string, containerType: string): any[];
}
