(() => {
    "use strict";
    var t = {
        200: (t, e) => {
            function r(t) {
                return t.replace(/\\/g, "\\\\").replace(/\//g, "\\/")
            }

            function n(t) {
                var e = t.split("/");
                return e.length > 1 && e[e.length - 2] ? e[e.length - 2] : ""
            }

            e.__esModule = !0, e.createContainerChain = e.getRootPath = e.getLastPath = e.escapeSlash = e.getPlaylistType = void 0, e.getPlaylistType = function (t) {
                return "audio/x-mpegurl" === t ? "m3u" : "audio/x-scpls" === t ? "pls" : ""
            }, e.escapeSlash = r, e.getLastPath = n, e.getRootPath = function (t, e) {
                if (t && t.length > 0) {
                    var i = t.substring(0, t.lastIndexOf("/"));
                    return "/" === (a = e.substring(i.length, e.lastIndexOf("/"))).charAt(0) ? a.substring(1).split("/") : a.split("/")
                }
                var a;
                return "" !== (a = n(e)) ? [r(a)] : []
            }, e.createContainerChain = function (t) {
                return t.map((function (t) {
                    return r(t)
                })).join("/")
            }
        }, 121: function (t, e, r) {
            var n = this && this.__assign || function () {
                return (n = Object.assign || function (t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }).apply(this, arguments)
            }, i = this && this.__spreadArrays || function () {
                for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
                var n = Array(t), i = 0;
                for (e = 0; e < r; e++) for (var a = arguments[e], o = 0, s = a.length; o < s; o++, i++) n[i] = a[o];
                return n
            };
            e.__esModule = !0;
            var a = r(200);
            if ("" === a.getPlaylistType(orig.mimetype)) {
                var o = orig.mimetype.split("/")[0], s = n(n({}, orig), {refID: orig.id});
                "video" === o && (s.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS || function (t) {
                    print("addVideo", JSON.stringify(t)), addCdsObject(t, a.createContainerChain(["Video", "All Video"]));
                    var e = a.getRootPath(object_script_path, t.location);
                    if (e.length > 0) {
                        var r = i(["Video", "Directories"], e);
                        addCdsObject(t, a.createContainerChain(r))
                    }
                }(s)), "application/ogg" === orig.mimetype && orig.theora
            }
        }
    }, e = {};
    !function r(n) {
        if (e[n]) return e[n].exports;
        var i = e[n] = {exports: {}};
        return t[n].call(i.exports, i, i.exports, r), i.exports
    }(121)
})();