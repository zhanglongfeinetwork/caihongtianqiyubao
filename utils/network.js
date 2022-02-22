module.exports = {
    _get: function(t, e, u, c, n) {
        wx.request({
            url: t,
            method: "GET",
            data: e,
            success: function(t) {
                u(t);
            },
            fail: function(t) {
                c(t);
            },
            complete: function() {
                n();
            }
        });
    }
};