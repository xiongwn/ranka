//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
     wx.getSystemInfo({
      success: function(res) {
        wx.setStorageSync('window_width', res.windowWidth)
        wx.setStorageSync('window_height',res.windowHeight)
      }
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo(this.call);
    
    wx.getStorageSync('mine')?{}:wx.setStorageSync('mine', [])
    // wx.setStorageSync('subcourse', [{time:10,index:0,title:"拉伸练习",calorie:153,imgurl:"http://img02.deviantart.net/c7e0/i/2010/364/1/c/fitness_stock_shot_6_by_jasonaaronbaca-d36142s.jpg",videourl:"http://cdn4.v.17173.com/advideo/2016/wy/12/09/dt-1209-640360aaww.mp4"},{time:10,index:1,title:"推举提拉",calorie:411,imgurl:"http://img02.deviantart.net/c7e0/i/2010/364/1/c/fitness_stock_shot_6_by_jasonaaronbaca-d36142s.jpg",videourl:"http://cdn4.v.17173.com/advideo/2016/wy/12/09/dt-1209-640360aaww.mp4"},{time:10,index:2,title:"缓解动作",calorie:260,imgurl:"http://img02.deviantart.net/c7e0/i/2010/364/1/c/fitness_stock_shot_6_by_jasonaaronbaca-d36142s.jpg",videourl:"http://cdn4.v.17173.com/advideo/2016/wy/12/09/dt-1209-640360aaww.mp4"},{time:10,index:3,title:"协调动作",calorie:332,imgurl:"http://img02.deviantart.net/c7e0/i/2010/364/1/c/fitness_stock_shot_6_by_jasonaaronbaca-d36142s.jpg",videourl:"http://cdn4.v.17173.com/advideo/2016/wy/12/09/dt-1209-640360aaww.mp4"}])
    
  },
  call:function(userinfo){console.log(userinfo)},
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      

      wx.login({
        success: function (ress) {
        
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1510b8afd4dea3d4&secret=c6f4361a7a1d691404a67e947581bd7a&js_code='+ress.code+'&grant_type=authorization_code',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(resp){
              //console.log(resp.data.openid)
             let openid=resp.data.openid;
             let nickname=''
      let avaturl=''
wx.getUserInfo({
            success: function (res) {
              
              that.globalData.userInfo = res.userInfo
              nickname=res.userInfo.nickName
              console.log(nickname.toString)
              avaturl=res.userInfo.avatarUrl
              wx.setStorageSync('nickname', nickname)
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.setStorageSync('avatarurl', res.userInfo.avatarUrl)
              if(nickname!==''&&avaturl!==''){wx.setStorageSync('openid', openid)
              wx.request({
            url: 'https://www.hxjiachen.com/ranka/wxuser/wxlogin.do',

            data: {
              openid:openid,
              nickname:encodeURI(nickname) ,
              avaturl:avaturl
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             header: {'content-type': 'charset=UTF-8'}, // 设置请求的 header
            success: function(res1){
              console.log(res1)
              wx.setStorageSync('allcourse', res1.data.vedios)
              wx.setStorageSync('day', res1.data.login_date_number)
            },
            fail: function() {
              
            },
            complete: function() {
              
            }
          })}
            }
          })
          
             
            },
            fail: function(resp) {
              
            },
            complete: function(resp) {
              
            }
          })
         
          
          
          
        }
      })
    }
  },
  getavatar:function(callback){
    var that=this;
    typeof callback=="function"&&callback(that.globalData.avatarurl);
  },
 
  globalData:{
    avatarurl:"",
    userInfo:null,
    
  }
})