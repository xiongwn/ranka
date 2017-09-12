// pages/myphoto/myphoto.js
Page({
  data:{imgurlarray:[],
  isempty:false},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that=this;
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxFindPics.do',
      data: {openid:wx.getStorageSync('openid')},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('图片地址',res)
        that.setData({imgurlarray:res.data})
        if(that.data.imgurlarray.length===0)
    {
      that.setData({isempty:true})
    }
      },
      fail: function() {
        // fail
        console.log("获取图片失败")
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
  preview:function(e){
    let array=this.data.imgurlarray,index=parseInt(e.target.dataset.index);
   
    let arr=[]
    for(let v of array){
      arr.push(v.picurl)
    }
    wx.previewImage({
      current: array[index]["picurl"], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: arr ,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  delete:function(e){
    let that=this;
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxuser/wxDeletePics.do',
      data:{openid:e.target.dataset.openid,picids:e.target.dataset.id},
      success:function()
      {
        let index=e.target.dataset.index;
        let arr=that.data.imgurlarray
        arr.splice(parseInt(index),1)
        that.setData({ imgurlarray:arr})
      }
    })
  }
})