function t(e) {
    if (0 != s) {
        if (i >= 100) {
            var n = o(a);
            e.updateTime(n);
        }
        i >= 5e3 && (e.getLocation(), i = 0), setTimeout, setTimeout(function() {
            i += 10, a += 10, t(e);
        }, 10);
    }
}

function o(t) {
    var o = Math.floor(t / 1e3), e = Math.floor(o / 3600), i = n(Math.floor((o - 3600 * e) / 60));
    return e + ":" + i + ":" + n(o - 3600 * e - 60 * i) + " ";
}

function e(t, o, e, n) {
    function i(t) {
        return t * Math.PI / 180;
    }
    var a = i(t), s = i(e), c = a - s, u = i(o) - i(n);
    return 6378137 * (2 * Math.asin(Math.sqrt(Math.pow(Math.sin(c / 2), 2) + Math.cos(a) * Math.cos(s) * Math.pow(Math.sin(u / 2), 2))));
}

function n(t) {
    return t < 10 ? "0" + t : t;
}

var i = 0, a = 0, s = 0, c = 0;

Page({
    data: {
        clock: "",
        isLocation: !1,
        latitude: 0,
        longitude: 0,
        markers: [],
        covers: [],
        meters: 0,
        time: "0:00:00"
    },
    onLoad: function(o) {
        this.getLocation(), console.log("onLoad"), t(this);
    },
    openLocation: function() {
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                wx.openLocation({
                    latitude: t.latitude,
                    longitude: t.longitude,
                    scale: 28
                });
            }
        });
    },
    starRun: function() {
        1 != s && (s = 1, t(this), this.getLocation());
    },
    stopRun: function() {
        s = 0, t(this);
    },
    updateTime: function(t) {
        var o = this.data;
        o.time = t, this.data = o, this.setData({
            time: t
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(o) {
                console.log("res----------"), console.log(o);
                var n = {
                    latitude: o.latitude,
                    longitude: o.longitude,
                    iconPath: "/resources/redPoint.png"
                }, i = t.data.covers;
                console.log("oriMeters----------"), console.log(c);
                var a = i.length;
                0 == a && i.push(n);
                var s = i[(a = i.length) - 1];
                console.log("oriCovers----------"), console.log(i, a);
                var u = e(s.latitude, s.longitude, o.latitude, o.longitude) / 1e3;
                u < .0015 && (u = 0), c += u, console.log("newMeters----------"), console.log(u);
                var r = new Number(c).toFixed(2);
                i.push(n), t.setData({
                    latitude: o.latitude,
                    longitude: o.longitude,
                    markers: [],
                    covers: i,
                    meters: r
                });
            }
        });
    }
});