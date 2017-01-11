//index.js
//获取应用实例
var app = getApp()
var page = 1;
var pageNum = "list";
var requestUrl = "http://www.quanmin.tv/json/play/" + pageNum + ".json";
var uid = "";
var nick = "";
var title = "";

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    json: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    this.getJson();
  },
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    var that = this;
    var page = 1;
    var pageNum = "list";
    this.getJson();
  },
  onReachBottom: function () {
    console.log("onReachBottom");
    var that = this;
    pageNum = "list_" + page;
    page++;
    //request
    this.getJson();
  },

  viewClick: function (e) {
    //item click object
    console.log(e.currentTarget.dataset.obj.uid);
    uid = e.currentTarget.dataset.obj.uid;
    nick = e.currentTarget.dataset.obj.nick;
    title = e.currentTarget.dataset.obj.title;

    wx.navigateTo({
      url: '../video/video?uid=' + uid + '&nick=' + nick + '&title=' + title + '',
      success: function (res) {
        // success
        console.log("res::");
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  getJson: function () {
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: requestUrl,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        if (page == 1) {
          that.setData({ json: res.data.data });
        } else {
          //loading...
          that.setData({ json: that.data.json.concat(res.data.data) });
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        if (page == 1) {
          wx.stopPullDownRefresh();
        }
        wx.hideNavigationBarLoading();
      }
    })
  }

})
