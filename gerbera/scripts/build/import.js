/*! For license information please see import.js.LICENSE.txt */
!function(){"use strict";var t={"./src/common.ts":function(t,e,n){function r(t){return"audio/x-mpegurl"===t?"m3u":"audio/x-scpls"===t?"pls":""}function i(t){return t.replace(/\\/g,"\\\\").replace(/\//g,"\\/")}function o(t){var e=t.split("/");return e.length>1&&e[e.length-2]?e[e.length-2]:""}function a(t,e){if(t&&t.length>0){var n=t.substring(0,t.lastIndexOf("/"));return"/"===(r=e.substring(n.length,e.lastIndexOf("/"))).charAt(0)?r.substring(1).split("/"):r.split("/")}var r;return""!==(r=o(e))?[i(r)]:[]}function c(t){return t.map((function(t){return i(t)})).join("/")}n.r(e),n.d(e,{getPlaylistType:function(){return r},escapeSlash:function(){return i},getLastPath:function(){return o},getRootPath:function(){return a},createContainerChain:function(){return c}})}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};!function(){n.r(r);var t=n("./src/common.ts"),e=undefined&&undefined.__assign||function(){return(e=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};var i=/.*\/(.)\/([0-9]{4})([1-4]Q) (.*)\/(.*)\.mp4$/;if(""===(0,t.getPlaylistType)(orig.mimetype)){var o=orig.mimetype.split("/")[0],a=e(e({},orig),{refID:orig.id});"video"===o&&(a.onlineservice===ONLINE_SERVICE_APPLE_TRAILERS||function(e){addCdsObject(e,(0,t.createContainerChain)(["Video","All Video"]));var n=e.location.match(i);if(print("addVideo",JSON.stringify(n)),n){var r=n[1],o=n[2],a=n[3],c=n[4],u=n[5];e.title=u,print((0,t.createContainerChain)(["Video","Directories",r,c]),e.title),print((0,t.createContainerChain)(["Video","Season",o,a,c]),e.title),addCdsObject(e,(0,t.createContainerChain)(["Video","Directories",r,c])),addCdsObject(e,(0,t.createContainerChain)(["Video","Season",o,a,c]))}}(a)),"application/ogg"===orig.mimetype&&orig.theora}}()}();
//# sourceMappingURL=import.js.map