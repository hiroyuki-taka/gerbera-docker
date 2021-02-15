/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPlaylistType": () => (/* binding */ getPlaylistType),
/* harmony export */   "escapeSlash": () => (/* binding */ escapeSlash),
/* harmony export */   "getLastPath": () => (/* binding */ getLastPath),
/* harmony export */   "getRootPath": () => (/* binding */ getRootPath),
/* harmony export */   "createContainerChain": () => (/* binding */ createContainerChain)
/* harmony export */ });
function getPlaylistType(mimetype) {
    if (mimetype === 'audio/x-mpegurl') {
        return 'm3u';
    }
    if (mimetype === 'audio/x-scpls') {
        return 'pls';
    }
    return '';
}
function escapeSlash(name) {
    return name.replace(/\\/g, '\\\\').replace(/\//g, '\\/');
}
function getLastPath(location) {
    var p = location.split('/');
    if (p.length > 1 && p[p.length - 2]) {
        return p[p.length - 2];
    }
    else {
        return '';
    }
}
function getRootPath(rootPath, location) {
    if (rootPath && rootPath.length > 0) {
        var r = rootPath.substring(0, rootPath.lastIndexOf('/'));
        var dir = location.substring(r.length, location.lastIndexOf('/'));
        if (dir.charAt(0) === '/') {
            return dir.substring(1).split('/');
        }
        else {
            return dir.split('/');
        }
    }
    else {
        var dir = getLastPath(location);
        if (dir !== '') {
            return [escapeSlash(dir)];
        }
    }
    return [];
}
function createContainerChain(arr) {
    return arr.map(function (s) { return escapeSlash(s); }).join('/');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/import.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/common.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function addAudio(obj) {
    var desc = [];
    var artist_full;
    var album_full;
    var title = obj.meta[M_TITLE] || obj.title;
    var artist = obj.meta[M_ARTIST];
    if (artist) {
        artist_full = artist;
        desc.push(artist);
    }
    else {
        artist = 'Unknown';
        artist_full = null;
    }
    var album = obj.meta[M_ALBUM];
    if (album) {
        album_full = album;
        desc.push(album);
    }
    else {
        album = 'Unknown';
        album_full = null;
    }
    desc.push(title);
}
function addVideo(obj) {
    print('addVideo', JSON.stringify(obj));
    addCdsObject(obj, (0,_common__WEBPACK_IMPORTED_MODULE_0__.createContainerChain)(['Video', 'All Video']));
    var dir = (0,_common__WEBPACK_IMPORTED_MODULE_0__.getRootPath)(object_script_path, obj.location);
    if (dir.length > 0) {
        var chain = __spreadArrays(['Video', 'Directories'], dir);
        addCdsObject(obj, (0,_common__WEBPACK_IMPORTED_MODULE_0__.createContainerChain)(chain));
    }
}
if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.getPlaylistType)(orig.mimetype) === '') {
    var arr = orig.mimetype.split('/');
    var mime = arr[0];
    var obj = __assign(__assign({}, orig), { refID: orig.id });
    if (mime === 'audio') {
    }
    if (mime === 'video') {
        if (obj.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS) {
        }
        else {
            addVideo(obj);
        }
    }
    if (mime === 'video') {
    }
    if (orig.mimetype === 'application/ogg') {
        if (orig.theora === 1) {
        }
        else {
        }
    }
}

})();

/******/ })()
;