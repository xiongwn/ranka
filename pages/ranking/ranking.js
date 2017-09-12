// pages/ranking/ranking.js
Page({
  data:{
    userarray:[{nickname:'verso',imgurl:'http://www.qunaly.com/ysc1211/oledit/pic/2017122144322451.jpg',current_calories:1455,avaturl:"http://wx.qlogo.cn/mmopen/vi_32/iaZeX9PoiaLaC9kzpkXaIZL40GNvc1PkMYsViaRGNicrk0FaJoq7DUDQlDkGpvicWgg2vLRq1T7fiazNfmic4icTbSL0pA/0"},{nickname:'wendy',current_calories:1200,avaturl:'http://file.popoho.com/2016-08-31/0072f9bf1ca5c7a61ee47b6fcf84e4c7.jpg'},{nickname:'陈辰',current_calories:908,avaturl:'http://file.ynet.com/2/1702/21/12435770.jpg'}]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that=this;
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxFindRankByCalories.do',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        let arr = res.data

        if (res.data.length) {
          for (let v of arr) {
            v.nickname = decodeURI(v.nickname)
          }
          that.setData({ userarray: arr })
          console.log(arr)
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh:function(){
    let that=this;
    wx.showToast({
      title:'排名刷新中',
      icon:'loading',
      duration:5000
    })
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxFindRankByCalories.do',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
       // wx.hideToast()
        wx.showToast({
         title:'刷新完成',
         icon:'success',
         duration:700
       })
        console.log(res)
        let arr=res.data
        
        if(res.data.length)
       { 
          for (let v of arr) {
            v.nickname = decodeURI(v.nickname)
          }
         that.setData({userarray:arr})
         console.log(arr)
       }
       
       wx.stopPullDownRefresh()
      },
      fail: function() {
        // fail
     //   wx.hideToast()
        wx.showToast({
          title:'网络出错',
          icon:'loading',
          duration:1000
        })
        wx.stopPullDownRefresh()
      },
      complete: function() {
        // complete
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '藜麦健身排行榜',
      path: '/pages/ranking/ranking'
    }
  }
})