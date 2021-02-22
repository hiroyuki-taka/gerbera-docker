!function () {
    "use strict";

    function e(e) {
        return "/" + e.map((function (e) {
            return e.replace(/\\/g, "\\\\").replace(/\//g, "\\/")
        })).join("/")
    }

    var i, t = function () {
        return (t = Object.assign || function (e) {
            for (var i, t = 1, a = arguments.length; t < a; t++) for (var r in i = arguments[t]) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
            return e
        }).apply(this, arguments)
    }, a = /.*\/(.)\/([0-9]{4})([1-4]Q) (.*)\/(.*?)(-[0-9]+年[0-9]+月[0-9]+日[0-9]+時[0-9]+分)?(-cm)?\.mp4$/;
    if ("" == ("audio/x-mpegurl" === (i = orig.mimetype) ? "m3u" : "audio/x-scpls" === i ? "pls" : "")) {
        var r = orig.mimetype.split("/")[0], o = t(t({}, orig), {refID: orig.id});
        "video" === r && (o.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS || function (i) {
            var r = i.location.match(a);
            if (print("addVideo", r), r) {
                r[0];
                var o = r[1], c = r[2], d = r[3], n = r[4], s = r[5], p = r[6], m = r[7];
                if (p) i.meta[M_DATE] = p.replace(/-([0-9]+)年([0-9]+)月([0-9]+)日[0-9]+時[0-9]+分/, "$1-$2-$3"); else switch (d) {
                    case"1Q":
                        i.meta[M_DATE] = c + "-01-01";
                        break;
                    case"2Q":
                        i.meta[M_DATE] = c + "-04-01";
                        break;
                    case"3Q":
                        i.meta[M_DATE] = c + "-07-01";
                        break;
                    case"4Q":
                        i.meta[M_DATE] = c + "-10-01"
                }
                print(JSON.stringify(i.meta)), "-cm" === m ? (addCdsObject(t({}, i), e(["Video", "Title", n, "CM"])), addCdsObject(t({}, i), e(["Video", "Directories", o, n, "CM"])), addCdsObject(t({}, i), e(["Video", "Season", c, d, n, "CM"]))) : (i = t(t({}, i), {title: s}), addCdsObject(t({}, i), e(["Video", "Title", n])), addCdsObject(t({}, i), e(["Video", "Directories", o, n])), addCdsObject(t({}, i), e(["Video", "Season", c, d, n])))
            }
        }(o)), "application/ogg" === orig.mimetype && orig.theora
    }
}();
//# sourceMappingURL=import.js.map