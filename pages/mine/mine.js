// pages/mine/mine.js
Page({
  data:{
    course:[],
    type:"",
    imgurlarray:[],
    isempty:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.setData({type:options.type})
    let that=this;
    let mine=wx.getStorageSync('mine');
    let allcourse=wx.getStorageSync('allcourse');
    let cache=[];
    let course=[];
    for(let value of allcourse)
    {
      for(let j of value.course)
      {
        cache.push(j);
      }
    }
    for(let value of cache)
    {
      for(let j of mine)
      {
        
        if(value.courseid==j)
        {course.push(value);
        }
      }
      
    }
    this.setData({course:course})
    
    if(that.data.course.length===0)
    {
      
      that.setData({isempty:true})
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
  gotocourse:function(e){
    wx.navigateTo({
      url: '../course/course?id='+e.target.dataset.id+"&name="+e.target.dataset.name+"&courseimg="+e.target.dataset.courseimg,
      success: function(res){
        
        //wx.setStorageSync('lessonname', e.target.dataset.name)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // preview:function(e){
  //   let array=this.data.imgurlarray,index=parseInt(e.target.dataset.index);
  //   wx.previewImage({
  //      current: array[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
  //     urls: array,
  //     success: function(res){
  //       // success
  //     },
  //     fail: function() {
  //       // fail
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }
})