// pages/paper/paper.js
Page({
  data:{
    passages:[],
    name:"",
    height:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    if(options.name)
    {this.setData({
name:options.name,
passages:wx.getStorageSync('passages')
    });
    
    console.log(this.data.passages);
    console.log(this.data.name);
    }
    else if(options.recommendname)
    {
      this.setData({
        name:options.recommendname,
        passages:wx.getStorageSync('recommend')
        
      })
      console.log(options.recommendname)
      console.log(this.data.passages);
    console.log(this.data.name);
    }
    
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
  EventHandle:function(e){
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        // success
        if(res.windowWidth>=e.detail.width)
        {
          that.setData({
            height:e.detail.height
          })
        }
        else
        {
          var h=e.detail.height*res.windowWidth/e.detail.width
          that.setData({height:h})
          
        }
      }
    })


  }
})