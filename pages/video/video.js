// pages/video/video.js
var app = getApp()
// var requestUrl = "http://www.quanmin.tv/json/rooms/" + uid + "/info1.json";

Page({
  data: {
    rooms: {}
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.uid);
    var that = this;
    this.getRoomsData(options.uid);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getRoomsData(uid) {
    // console.log("requestUrl__" + requestUrl);
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://www.quanmin.tv/json/rooms/' + uid + '/info1.json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data.live.ws.hls[3].src);
        that.setData({ rooms: res.data });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading();
      }
    })
  }

})