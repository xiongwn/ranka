// pages/course/course.js
Page({

  data: {
    course: [],
    courseid: null,
    coursename: null,
    courseimg: null,
    subscribe: "订阅课程"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    this.setData({ courseid: options.id, coursename: options.name, courseimg: options.courseimg });
    let mine = wx.getStorageSync('mine');
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxvedio/findVedioSectionByCourseid.do?courseid=' + options.id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // wx.setStorageSync('subcourse', res.data)
        that.setData({ course: res.data })
        console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    for (let value of mine) {

      if (value == that.data.courseid) {
        that.setData({
          subscribe: "取消订阅"
        })
        console.log(that.data.subscribe)
        return;
      }
      else {
        that.setData({
          subscribe: "订阅课程"
        })
        console.log(that.data.subscribe)

      }
    }


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
  play: function (e) {
    let that = this;
    if(!e.target.dataset.name)
    {
      wx.showToast({
        title: '系统忙，尝试再次点击',
        duration:700,
        
      })
      return;
    }
    wx.navigateTo({
      url: '../play/play?videourl=' + e.target.dataset.videourl + "&calorie=" + e.target.dataset.calorie + "&name=" + e.target.dataset.name + "&index=" + e.target.dataset.index,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  subscribe: function (e) {
    let mine = wx.getStorageSync('mine');
    let that = this;
    if (that.data.subscribe == "取消订阅") {

      for (let i = 0; i < mine.length; i++) {
        if (mine[i] == that.data.courseid) {
          mine.splice(i, 1);
          wx.setStorageSync('mine', mine);
          console.log("splice")
          break;
        }
      }
      wx.request({
        url: 'https://www.hxjiachen.com/ranka/wxuser/wxCancelVedioSubscription.do',
        data: { openid: wx.getStorageSync('openid'), courseid: that.data.courseid },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log('取消订阅成功')
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      wx.showToast({
        title: "取消成功",
        duration: 1500
      })
      that.setData({
        subscribe: "订阅课程"
      })
      return;
    }
    else {
      mine.push(e.target.dataset.id);
      wx.setStorageSync('mine', mine)
      wx.request({
        url: 'https://www.hxjiachen.com/ranka/wxuser/wxAddVedioSubscription.do',
        data: { openid: wx.getStorageSync('openid'), courseid: that.data.courseid },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log('添加订阅成功')
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      wx.showToast({
        title: '订阅成功',
        duration: 1500
      })
      that.setData({
        subscribe: "取消订阅"
      })
    }
  },
  onShareAppMessage: function () {
    let that=this;
    return {
      title: '视频课程：'+that.data.coursename,
      path: '/pages/course/course?id='+that.data.courseid+'&name='+that.data.coursename+'&courseimg='+that.data.courseimg
    }
  }
})