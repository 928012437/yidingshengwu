var e = getApp(), a = e.requirejs("jquery"), t = e.requirejs("core");

e.requirejs("foxui"), module.exports = {
    get: function(e, i, o) {
        t.get("diypage", {
            type: i
        }, function(i) {
            i.diypage = i.diypage || {};
            for (var r in i.diypage.items) "topmenu" == i.diypage.items[r].id && e.setData({
                topmenu: i.diypage.items[r]
            });
            e.setData({
                customer: i.customer,
                phone: i.phone,
                customercolor: i.customercolor
            });
            var g = {
                loading: !1,
                pages: i.diypage.page,
                usediypage: !0,
                startadv: i.startadv
            };
            if (i.diypage.page && e.setData({
                diytitle: i.diypage.page.title
            }), 0 == i.error) {
                if (void 0 != i.diypage.items) {
                    var p = [];
                    if (a.each(i.diypage.items, function(a, o) {
                        if (p.push(o.id), "topmenu" == o.id) e.setData({
                            topmenu: o,
                            istopmenu: !0
                        }), r = o.data[0].linkurl, t.get("diypage/getInfo", {
                            dataurl: r
                        }, function(a) {
                            o.data[0].data = a.goods.list, g.diypages = i.diypage, g.topmenuDataType = a.type, 
                            e.setData(g);
                        }); else if ("tabbar" == o.id) {
                            var r = o.data[0].linkurl;
                            t.get("diypage/getInfo", {
                                dataurl: r
                            }, function(a) {
                                o.data[0].data = a.goods.list, o.type = a.type, g.diypages = i.diypage, g.tabbarDataType = a.type, 
                                g.tabbarData = a.goods, e.setData(g);
                            });
                        }
                    }), wx.setNavigationBarTitle({
                        title: g.pages.title
                    }), wx.setNavigationBarColor({
                        frontColor: g.pages.titlebarcolor,
                        backgroundColor: g.pages.titlebarbg
                    }), o && o(i), -1 != p.indexOf("topmenu") || -1 != p.indexOf("tabbar")) return;
                    g.diypages = i.diypage, e.setData(g);
                }
                wx.setNavigationBarTitle({
                    title: g.pages.title
                }), wx.setNavigationBarColor({
                    frontColor: g.pages.titlebarcolor,
                    backgroundColor: g.pages.titlebarbg
                }), o && o(i);
            } else e.setData({
                diypages: !1,
                loading: !1
            });
        });
    }
};