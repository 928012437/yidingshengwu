var app = getApp(), core = app.requirejs("core");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomInfo: [],
    loadText: "加载中...",
    noData: false,
    loadMore: true,
    live_status_tip: {
      101: '直播中',
      102: '未开始',
      103: '已结束',
      104: '禁播',
      105: '暂停中',
      106: '异常',
      107: '已过期'
    }
  },
  page: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getData: function(){
    let that = this;
    wx.showLoading();

    core.get("livevideo/get_roominfo", {
      page: that.page
    }, function (res) {
      wx.hideLoading();
      if (res.code == 0) {
        let list = res.data || [];
        let h = {};
        h.showTabbar = res.showTabbar;
        if (list.length < 10) h.noMore = true, h.loadMore = false;
        let roomInfo = that.data.roomInfo;
        roomInfo = roomInfo.concat(list);
        h.roomInfo = roomInfo;
        that.page++;
        that.setData(h);
      } else {
        let h = {};
        if (that.page == 1) h.noData = true;
        h.showTabbar = res.showTabbar;
        h.loadMore = false;
        that.setData(h);
      }
    });

  },

  goLive: function(e){
    let roomid = e.currentTarget.dataset.roomid;
    roomid && wx.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomid}`,
    })
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
    this.data.loadMore && this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})