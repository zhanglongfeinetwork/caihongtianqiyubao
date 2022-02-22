var t, e, o, n = require("../../utils/network.js"), a = (getApp(), !1);

Page({
    data: {
        location: "上海市",
        hasRefresh: !1,
        nowBackGround: [ 100, 8 ],
        nowTemperature: "0 ℃",
        nowWind: "晴/东北风  微风",
        nowAir: "50  优",
        hourlyArr: [],
        dailyForecast: [],
        lifeStyle: []
    },
    gotest: function() {
        wx.navigateTo({
            url: "../scrollView/scrollView"
        });
    },
    Weather: function(e, o) {
        var a = this, i = {
            key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
            location: t ? o + "," + e : "shanghai",
            lang: "zh",
            unit: "m"
        };
        n._get("https://free-api.heweather.com/s6/weather", i, function(t) {
            var e = t.data.HeWeather6[0].now, o = t.data.HeWeather6[0].hourly, n = t.data.HeWeather6[0].daily_forecast, i = t.data.HeWeather6[0].lifestyle;
            a.setData({
                nowBackGround: [ e.cond_code, e.tmp ],
                nowTemperature: e.tmp + "℃",
                nowWind: e.cond_txt + "/" + e.wind_dir + "   " + e.wind_sc,
                hourlyArr: o,
                dailyForecast: n,
                lifeStyle: [ i[2], i[1], i[6], i[5] ]
            });
        }, function(t) {}, function() {
            wx.stopPullDownRefresh(), wx.hideLoading();
        }), n._get("https://free-api.heweather.com/s6/air", i, function(t) {
            var e = t.data.HeWeather6[0].air_now_city;
            a.setData({
                nowAir: e.aqi + "  " + e.qlty
            });
        }, function(t) {}, function() {});
    },
    genCodeLocation: function(e, o) {
        var a = this, i = {
            key: "05e62c98ebc533cb8811ae71ca817033",
            location: o + "," + e
        };
        n._get("https://restapi.amap.com/v3/geocode/regeo", i, function(t) {
            a.setData({
                location: t.data.regeocode.addressComponent.district + t.data.regeocode.addressComponent.township
            });
        }, function(t) {}, function() {
            t = "youzhi", a.Weather(e, o);
        });
    },
    onLoad: function() {
        this.getLocationAction();
    },
    getLocationAction: function() {
        var t = this;
        wx.getLocation({
            success: function(n) {
                o = n.latitude, e = n.longitude, wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), t.genCodeLocation(o, e);
            },
            fail: function() {
                t.Weather("", "");
            }
        });
    },
    onShow: function() {},
    chooseLocation: function() {
        var n, i = this;
        wx.getSetting({
            success: function(c) {
                (n = c.authSetting["scope.userLocation"]) ? wx.chooseLocation({
                    success: function(n) {
                        i.setData({
                            location: n.address
                        }), e = n.longitude, o = n.latitude, t = n.latitude + ":" + n.longitude, i.Weather(n.latitude, n.longitude);
                    }
                }) : (wx.showToast({
                    title: "检测到您没获得位置权限，请先开启哦",
                    icon: "none",
                    duration: 3e3
                }), setTimeout(function() {
                    wx.openSetting({
                        success: function(t) {
                            a = t.authSetting["scope.userLocation"], i.getLocationAction();
                        }
                    });
                }, 3e3));
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "即时天气",
            path: "/pages/index/index"
        };
    },
    onPullDownRefresh: function() {
        this.Weather(e, o);
    }
});