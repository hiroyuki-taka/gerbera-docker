/*! For license information please see import.js.LICENSE.txt */
!function () {
    "use strict";
    var e = {
        "./src/common.ts": function (e, t, n) {
            function r(e) {
                return "audio/x-mpegurl" === e ? "m3u" : "audio/x-scpls" === e ? "pls" : ""
            }

            function i(e) {
                return e.replace(/\\/g, "\\\\").replace(/\//g, "\\/")
            }

            function o(e) {
                var t = e.split("/");
                return t.length > 1 && t[t.length - 2] ? t[t.length - 2] : ""
            }

            function a(e, t) {
                if (e && e.length > 0) {
                    var n = e.substring(0, e.lastIndexOf("/"));
                    return "/" === (r = t.substring(n.length, t.lastIndexOf("/"))).charAt(0) ? r.substring(1).split("/") : r.split("/")
                }
                var r;
                return "" !== (r = o(t)) ? [i(r)] : []
            }

            function c(e) {
                return "/" + e.map((function (e) {
                    return i(e)
                })).join("/")
            }

            n.r(t), n.d(t, {
                getPlaylistType: function () {
                    return r
                }, escapeSlash: function () {
                    return i
                }, getLastPath: function () {
                    return o
                }, getRootPath: function () {
                    return a
                }, createContainerChain: function () {
                    return c
                }
            })
        }
    }, t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {exports: {}};
        return e[r](i, i.exports, n), i.exports
    }

    n.d = function (e, t) {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    };
    var r = {};
    !function () {
        n.r(r);
        var e = n("./src/common.ts"), t = undefined && undefined.__assign || function () {
            return (t = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        };
        var i = /.*\/(.)\/([0-9]{4})([1-4]Q) (.*)\/(.*?)(-[0-9]+年[0-9]+月[0-9]+日[0-9]+時[0-9]+分)?(-cm)?\.mp4$/;
        if ("" === (0, e.getPlaylistType)(orig.mimetype)) {
            var o = orig.mimetype.split("/")[0], a = t(t({}, orig), {refID: orig.id});
            "video" === o && (a.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS || function (n) {
                var r = n.location.match(i);
                if (print("addVideo", r), r) {
                    var o = r[1], a = r[2], c = r[3], u = r[4], d = r[5], s = (r[6], "-cm" === r[7]);
                    print((0, e.createContainerChain)(["Video", "All Video", "" + a + c + " " + u])), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "All Video", "" + a + c + " " + u])), s ? (addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Title", u, "CM"])), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Directories", o, u, "CM"])), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Season", a, c, u, "CM"]))) : (n = t(t({}, n), {title: d}), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Title", u])), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Directories", o, u])), addCdsObject(t({}, n), (0, e.createContainerChain)(["Video", "Season", a, c, u])))
                }
            }(a)), "application/ogg" === orig.mimetype && orig.theora
        }
    }()
}();
//# sourceMappingURL=import.js.map