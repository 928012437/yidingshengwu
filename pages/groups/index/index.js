var n = getApp(), e = n.requirejs("core");

n.requirejs("jquery"), n.requirejs("foxui");

Page({
    onPullDownRefresh: function() {
        var n = this;
        console.log(1), e.get("groups", {}, function(e) {
            0 == e.error && (n.setData({
                res: e
            }), wx.stopPullDownRefresh());
        });
    },
    data: {},
    onLoad: function(t) {
        var o = this;
        n.getCache("isIpx") ? o.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : o.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), e.get("groups", {}, function(n) {
            o.setData({
                res: n
            });
        });
    },
    advheight: function(n) {
        var e = this, t = n.detail.width / n.detail.height;
        e.setData({
            advheight: 750 / t
        });
    },
    navigate: function(n) {
        var t = e.pdata(n).link;
        console.log(t), wx.navigateTo({
            url: t,
            fail: function() {
                wx.switchTab({
                    url: t
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.onPullDownRefresh();
    },
    onShareAppMessage: function() {}
});