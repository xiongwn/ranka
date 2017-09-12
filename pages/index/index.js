
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    lesson: [],
    avatarurl: "",
    window_width: wx.getStorageSync('window_width'),
    foodarray: wx.getStorageSync('foodarray') || [],
    selfsport: wx.getStorageSync('selfsport') || [],
    type: [{ kind: "胸肌", index: 0 }, { kind: "腹肌", index: 1 }, { kind: "全身", index: 2 }, { kind: "手臂", index: 3 }],
    
    vertical: false,
    interval: 3000,
    duration: 1200,
    course: wx.getStorageSync('course'),
    current: 1,
    allcourse: wx.getStorageSync('allcourse')
  },

  change: function (e) {

    var target = e.target.dataset.index, that = this;
    if (target  == this.data.current)
    { return }
    wx.setStorageSync('current1', parseInt(target) );

    this.setData({ current: wx.getStorageSync('current1'), course: this.data.allcourse[parseInt(target)-1]["course"] })
  },
  onLoad: function () {

    let that = this


    let aa = setInterval(function () {
      if (wx.getStorageSync('allcourse') !== undefined && wx.getStorageSync('allcourse') !== null) {
        let arr = wx.getStorageSync('allcourse'), cache = []
        for (let v of arr) {
          let obj = {}
          obj["kind"] = v.type;
          obj["index"] = v.index;
          cache.push(obj);
        }
        that.setData({ allcourse: arr, type: cache })
        console.log(wx.getStorageSync('allcourse'))
        that.setData({ course: that.data.allcourse[that.data.current - 1]["course"] })

        clearInterval(aa)

      }
      else {
        let arr=wx.getStorageSync('allcourse'),cache=[]
        for(let v of arr)
        {
          let obj={}
          obj["kind"]=v.type;
          obj["index"]=v.index;
          cache.push(obj);
        }
        that.setData({
          allcourse: wx.getStorageSync('allcourse'),
          type:cache
        })
      }

    }, 500)

    aa
    //调用应用实例的方法获取全局数据
    if (this.data.foodarray != []) {
      let cal = 0
      for (let value of that.data.foodarray) {
        cal = parseInt(value.calorie) + cal;
      }
      that.setData({
        foodcalorie: cal
      })
    }

    wx.getStorageSync('current1') ? this.setData({ current: wx.getStorageSync('current1') }) : wx.setStorageSync('current1', 1);

    this.setData({
      current: wx.getStorageSync('current1'),
      //course:this.data.allcourse[this.data.current-1]["course"],
      avatarurl: wx.getStorageSync('avatarurl')
    })

    let ava = setInterval(function () {
      if (that.data.avatarurl == "")
      { that.setData({ avatarurl: wx.getStorageSync('avatarurl') }); }
      else {
        clearInterval(ava);
      }

      // console.log(that.data.avatarurl)

    }, 500);
    ava;
    
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxFindVedioSubscription.do',
      data: { openid: wx.getStorageSync('openid') },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        let arr = res.data, cache = [];
        for (let value of arr) {
          cache.push(value.courseid);
        }
        wx.setStorageSync('mine', cache)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  
  goto: function (e) {
    wx.navigateTo({
      url: '../course/course?id=' + e.target.dataset.id,
      success: function (res) {

        //wx.setStorageSync('lessonname', e.target.dataset.name)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  
  gotocourse: function (e) {
    wx.navigateTo({
      url: '../course/course?id=' + e.target.dataset.id + "&name=" + e.target.dataset.name + "&courseimg=" + e.target.dataset.courseimg,
      success: function (res) {

        //wx.setStorageSync('lessonname', e.target.dataset.name)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onPullDownRefresh: function () {
    let that = this;
    wx.showToast({
      title: '正在刷新数据',
      duration: 5000,
      icon: 'loading'
    })
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxlogin.do',

      data: {
        openid: wx.getStorageSync('openid'),
        nickname: encodeURI(wx.getStorageSync('nickname')),
        avaturl: wx.getStorageSync('avatarurl')
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'charset=UTF-8' }, // 设置请求的 header
      success: function (res1) {
        // wx.hideToast()
        wx.showToast({
          title: '加载完毕',
          duration: 700,
          icon: 'success'
        })

        console.log(res1)
        wx.setStorageSync('allcourse', res1.data.vedios)
        that.setData({ allcourse: res1.data.vedios, course: res1.data.vedios[wx.getStorageSync('current1') - 1]['course'] })
        wx.stopPullDownRefresh()
      },
      fail: function () {
        console.log("fail")
        //  wx.hideToast()
        wx.showToast({
          title: '网络出错',
          duration: 700,
          icon: 'loading'
        })
        wx.stopPullDownRefresh()
      },
      complete: function () {

      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '藜麦视频点播小程序',
      path: '/pages/index/index'
    }
  }
})
