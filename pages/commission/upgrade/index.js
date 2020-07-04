// pages/commission/upgrade/index.js
// var t = getApp().requirejs("core");
var t = getApp(), a = t.requirejs("core");
 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    console.log('o',o);
    var th =  this;

   th.getData();
  },
  getData: function () {
    // console.log('123',123);

    var t = this;
    a.get("commission/index/upgrade", {}, function (a) {
      console.log('upgrade', a);
      
      t.setData({
        up:a.res,
        ln: a.levelname,

      });     

    });
  },
  // 购买
  goumai:function(g){
    console.log('g', g);
    console.log('this.data', this.data);
    var th = this;
    var data = th.data;
    var id = g.currentTarget.dataset.id,
        lid = data.ln.id;
    console.log('id', id);
    console.log('lid', lid);

    if (lid > id || lid == id ){
      wx.showModal({
        title: '提示',
        content: '请不要选同等级或者下级',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      var o = {
        id: id,
      };
      a.post("commission/index/submit", o, function (t) {
        console.log('su',t);
        // e.setData({
        //   submit: !1
        // }), 0 == t.error ? wx.navigateTo({
        //   url: "/pages/order/pay/index?id=" + t.orderid
        // }) : a.alert(t.message);

        if(t.error == 0){
          console.log('su', t);
          wx.navigateTo({
            url: "/pages/order/pay/index?id=" + t.orderid
          })
        }


      }, !0);






      
      // wx.navigateTo({
      //   url: "/pages/order/pay/index?id=" + id,
      //   success: function (t) { },
      //   fail: function (t) { },
      //   complete: function (t) { }
      // });


     
     

    }
  
  
  
  
  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

   

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})