// pages/play/play.js
Page({
  video: null,
  data: {
    videourl: "",
    index: null,
    totaltime: 0,
    starttime: 0,
    second: 0,
    name: "",
    calorie: 0,
    controls: true,
    state: "播放",
    width: 0,
    height: 0,
    canvascss: '',
    icon: 'icon',
    canvas: 'canvas',
    src: '../../image/image/play.png',
   index_bg:0,
   image_src:""
  },
  onLoad: function (options) {

    let that = this;
    let videourl = options.videourl.replace("www.hxjiachen.com","47.93.87.98")
    that.setData({
      videourl: videourl, index: parseInt(options.index), name: options.name, calorie: options.calorie
    })
    this.video = wx.createVideoContext("video");
    wx.getSystemInfo({
      success: function (res) {
        that.setData({

          width: res.windowWidth,
          
        })
      }
    })
    console.log(this.data.videourl)
   
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
  EventHandle: function (e) {
    let that = this;
    if (this.data.state == "播放") {
      that.setData({
        state: "暂停",
        src: '../../image/image/pause.png'
      })
      this.video.play();
    }
    else {
      that.setData({
        state: "播放",
        src: '../../image/image/play.png'
      })
      this.video.pause();
    }
  },
  change:function(){
    let that=this;
    let str=that.data.videourl
    if(/www.hxjiachen.com/g.test(str))
    {
      
      this.setData({ videourl: str.replace("www.hxjiachen.com", "47.93.87.98")})
      that.EventHandle()
    }
    else{
      this.setData({ videourl: str.replace("47.93.87.98", "www.hxjiachen.com")})
      that.EventHandle()
    }
    
  },
  bindpause: function () {
    let time = this.data.totaltime, starttime = this.data.starttime;
    this.setData({
      state: "播放",
      totaltime: time + Date.now() - starttime,
      src: '../../image/image/play.png'
    })
    console.log(this.data.totaltime)

  },
  bindplay: function () {
    this.setData({
      state: "暂停",
      starttime: Date.now(),
      src: '../../image/image/pause.png'
    })

  },

  bindended: function () {

    let that = this;
    let time = this.data.totaltime, starttime = this.data.starttime;
    wx.getStorageSync("calorie") ? wx.setStorageSync("calorie",parseInt(wx.getStorageSync("calorie")) +parseInt(that.data.calorie) ) : wx.setStorageSync("calorie", that.data.calorie)
    console.log(wx.getStorageSync("calorie"))
    this.setData({
      totaltime: time + Date.now() - starttime,
      second: parseInt(that.data.totaltime / 1000)
    })
    // if(that.data.second<9)
    // {
    //   return;
    // }
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxUploadCalories.do',
      data: { openid: wx.getStorageSync('openid'), calories: that.data.calorie },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("卡路里上传成功")
        console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    wx.showModal({
      title: '自拍打卡',
      content: '自拍记录运动，照片可在我的历程中查看，是否自拍？',
      success: function (ress) {
        if (ress.confirm) {
          that.photo()
        }
      }
    })

  },
  choose:function(e){
    let that=this;
    let canvas = wx.createCanvasContext("photo"), width = that.data.width, height_real = 0, width_real = 0;
    
    let index=parseInt(e.target.dataset.bg)+1;
    this.setData({index_bg:index})
    let photo=that.data.image_src;
    wx.getImageInfo({
      src: photo,
      success: function (resp) {
        height_real = resp.height;
        width_real = resp.width;
        that.setData({ height: width * 1.78, canvascss: 'canvascss', canvas: '' })
        canvas.setFontSize(30);
        canvas.drawImage(photo, 40, 80, width - 80, parseInt(height_real * (width - 80) / width_real))
        let ss=""
        if (!wx.getStorageSync("bg_src")[(index - 1).toString()]) {
          wx.downloadFile({
            url: "https://www.hxjiachen.com/poster_image/"+index+".png",
            success: function (res_download) {
              ss=res_download.tempFilePath
              canvas.drawImage(res_download.tempFilePath, 40, 40, width - 80, (width - 80) * 1.78)
              canvas.draw();
              
            },
            complete:function(){
              setTimeout(function () {
                wx.saveFile({
                  tempFilePath: ss,
                  success: function (res_save) {
                    let obj = wx.getStorageSync("bg_src") ? wx.getStorageSync("bg_src") : {}
                    switch (index) {
                      case 1: obj["0"] = res_save.savedFilePath
                        wx.setStorageSync("bg_src", obj);
                        break;
                      case 2: obj["1"] = res_save.savedFilePath
                        wx.setStorageSync("bg_src", obj);
                        break;
                      case 3: obj["2"] = res_save.savedFilePath
                        wx.setStorageSync("bg_src", obj);
                        break;
                      case 4: obj["3"] = res_save.savedFilePath
                        wx.setStorageSync("bg_src", obj);
                        break;
                    }
                  }

                })},100)
              
            }
          })
        }
        else {
          canvas.drawImage(wx.getStorageSync("bg_src")[(index-1).toString()], 40, 40, width - 80, (width - 80) * 1.78)
          canvas.draw();
        }


        that.setData({ icon: '' })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  upload:function(){
    let that=this;
    let index=this.data.index_bg
    console.log(index)
    setTimeout(function () {
              wx.showModal({
                title: '提示',
                content: '是否上传图片',
                success: function (resa) {
                  if (resa.confirm) {
                    wx.showToast({
                      title: '上传中',
                      icon: 'loading',
                      duration: 10000
                    })
                    console.log('用户点击确定')
                    wx.uploadFile({
                      url: 'https://www.hxjiachen.com/ranka/wxuploadpic.do',
                      filePath: that.data.image_src,
                      name: 'file',
                      // header: {}, // 设置请求的 header
                      formData: { openid: wx.getStorageSync('openid'),index:index}, // HTTP 请求中其他额外的 form data
                      success: function (resp) {
                        // success
                       // wx.hideToast()
                        wx.showToast({
                          title: '上传成功',
                          icon: 'success',
                          duration: 700
                        })
                        that.clear()
                      },
                      fail: function () {
                        // fail
                        console.log("fail");
                        wx.showToast({
                          title: '上传失败,网络错误',
                          icon: 'loading',
                          duration: 1000
                        })
                      },
                      complete: function () {
                        // complete
                        console.log(index)
                      }
                    })
                  }
                  else {
                    canvas.clearRect(0, 0, width, parseInt(height_real * width / width_real))
                    canvas.draw()
                    that.setData({ icon: 'icon' })
                  }
                }
              })
            }, 700)
  },
  photo: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        that.setData({
          image_src:res.tempFilePaths[0]
        })
        let canvas = wx.createCanvasContext("photo"), width = that.data.width, height_real = 0, width_real = 0;
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (resp) {
            height_real = resp.height;
            width_real = resp.width;
            that.setData({ height: width*1.78, canvascss: 'canvascss', canvas: '' })
            canvas.setFontSize(30);
            canvas.drawImage(res.tempFilePaths[0], 40, 80, width - 80, parseInt(height_real * (width - 80) / width_real))
            if(!wx.getStorageSync("bg_src"))
            {
              wx.downloadFile({
                url: "https://www.hxjiachen.com/poster_image/1.png",
                success: function (res_download) {
                  
                  
                  canvas.drawImage(res_download.tempFilePath, 40, 40, width - 80, (width - 80) * 1.78)
                  canvas.draw();
                  wx.saveFile({
                    tempFilePath: res_download.tempFilePath,
                    success: function (res_save) { wx.setStorageSync("bg_src", { "0": res_save.savedFilePath })}
                  })
                }
              })
            }
            else
            {
              canvas.drawImage(wx.getStorageSync("bg_src")["0"], 40, 40, width - 80, (width - 80) * 1.78)
              canvas.draw();
            }
            
            
            that.setData({ icon: '' })

          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })

        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  clear: function () {
    let that = this;
    let canvas = wx.createCanvasContext({
      canvasId: 'photo'
    })
    let width = that.data.width;
    canvas.clearRect(0, 0, width, that.data.height)
    canvas.draw();
    this.setData({ icon: 'icon', canvas: 'canvas' })
  },
  onShareAppMessage: function () {
    let that=this;
    return {
      title: '视频课程',
      path: '/pages/play/play?videourl='+that.data.videourl+'&index='+that.data.index+'&name='+that.data.name+'&calorie='+that.data.calorie
    }
  }
})