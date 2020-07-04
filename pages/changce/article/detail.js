var e = getApp(), t = e.requirejs("wxParse/wxParse"), a = e.requirejs("core");

Page({
    data: {
        aid: 0,
        loading: !1,
        show: !1,
        article: [],
        list: [],
        likenum: 0,
        approot: e.globalData.approot
    },
    onLoad: function(t) {
        t = t || {};
        var i = decodeURIComponent(t.scene);
        if (!t.id && i) {
            var r = a.str2Obj(i);
            t.id = r.id, r.mid && (t.mid = r.mid);
        }
        this.setData({
            aid: t.id
        }), e.url(t), this.getDetail();
    },
    getDetail: function() {
        var e = this;
        a.get("changce/article/get_detail", {
            id: e.data.aid
        }, function(i) {
			console.log(i);
            if (!i.article) return a.alert(i.error), !1;
            wx.setNavigationBarTitle({
                title: i.article.article_title
            }), e.setData({
                article: i.article,
                list: i.list,
                likenum: i.article.likenum,
                show: !0
            }), t.wxParse("wxParseData", "html", i.article.article_content, e, "15");
        });
    },
    callme: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.id
        });
    },
    likeit: function(e) {
        var t = this, i = t.data.likenum, r = t.data.aid;
        a.get("changce/article/like", {
            id: r
        }, function(e) {
            if (!e.success) return a.alert(e.error), !1;
            1 == e.status ? i++ : i--, t.setData({
                likenum: i
            });
        });
    },
    phone: function(e) {
        a.phone(e);
    },
    tohome: function(e) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage("/pages/changce/article/detail?id=" + this.data.aid, this.data.article.article_title);
    }
});