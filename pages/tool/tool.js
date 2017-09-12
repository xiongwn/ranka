// pages/tool/tool.js
Page({
  data: {
    window_height:wx.getStorageSync('window_height')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

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
  calculate: function (e) {
    wx.navigateTo({
      url: '../calculate/calculate?type=' + e.target.dataset.type,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
      onShareAppMessage: function () {
        return {
          title: '藜麦视频点播小程序',
          path: '/pages/tool/tool'
        }
      }

    })
  }
})