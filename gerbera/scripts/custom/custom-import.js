/**
 *
 * @param obj {object} Original object as created in PC Directory
 * @param cont {object} Container in PC Directory containing the original object
 * @param {string} rootPath  Root folder of the autoscan directory
 * @param autoScanId
 * @param {string} containerType  UPnP type configured to create containers
 */
function importVideo(obj, cont, rootPath, autoScanId, containerType) {
    print2("Info", obj, cont, rootPath, authScanId, containerType)

    try {
        addVideo(obj, cont, rootPath, containerType)
    } catch (err) {
        print2("Error", err)
    }
}
