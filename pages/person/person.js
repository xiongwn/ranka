// pages/person/person.js
var notification = require("../../utils/wxnotification.js");
Page({
  data:{
    avatarurl:"",
    height:1.80,
    weight:67,
    BMI:0,
    heightarray:[1.80,1.81,1.82],
    heightindex:0,
    weightarray:[67,68,69,70],
    weightindex:0,
    course:[],
    window_width:wx.getStorageSync('window_width'),
  },
  logindays:0,
  calorie:0,
  foodcalorie:0,
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
        {course.push(value)}
      }
      
    }
    let calorie = wx.getStorageSync("calorie") || 0
    console.log(calorie)
    this.setData({ course: course, logindays: wx.getStorageSync('day'), calorie:calorie })
    let ava=setInterval(function(){
      if(that.data.avatarurl=="")
      {that.setData({avatarurl:wx.getStorageSync('avatarurl')});}
      else{
        clearInterval(ava);
      }
      
     // console.log(that.data.avatarurl)
      
      },500);
      ava;
      this.addselfsport()
    //  this.addfood()
    notification.addNotification("addselfsport", this.addselfsport, this);
   // notification.addNotification("addfood", this.addfood, this);
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
  gotocart:function(){
    wx.navigateTo({
      url: '../cart/cart?page=person',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  gotoranking:function(){
    wx.navigateTo({
      url: '../ranking/ranking',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  changeheight:function(e)
  {
    var height=e.detail.value;
    
    this.setData({height:height,heightindex:e.detail.value})
  },
  // addfood: function () {
  //   let foodarr = [];
  //   if (wx.getStorageSync('foodarray') != []) {
  //     let cal = 0;
  //     foodarr = wx.getStorageSync('foodarray')
  //     for (let value of foodarr) {
  //       cal = cal + parseInt(value.calorie)
  //     }
  //     this.setData({
  //       foodarray: foodarr,
  //       foodcalorie: cal
  //     })
  //   }
  // },
  addselfsport: function () {
    let calorie = Number.parseInt(this.data.calorie) , selfsport = wx.getStorageSync('selfsport')

    for (let value of selfsport) {
      calorie += parseInt(value.calorie);

    }
    this.setData({
      selfsport: selfsport,
      calorie: calorie,
    })


  },
  clear: function () {
    wx.setStorageSync('selfsport', [])
    this.setData({ selfsport: [], calorie: 0 })
    wx.setStorageSync("calorie",0)
  },
  clearfood: function () {
    wx.setStorageSync('foodarray', []);
    this.setData({ foodarray: [], foodcalorie: 0 })
  },
  changeweight:function(e)
  {
    var weight=e.detail.value;
    this.setData({weight:weight,weightindex:e.detail.value})
  },
  caculate:function()
  {
    var height=this.data.height,weight=this.data.weight,total=(weight/height/height).toFixed(2);

    this.setData({BMI:total})
    
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/person/person'
    }
  },
  // gotocourse:function(e){
  //   wx.navigateTo({
  //     url: '../course/course?id='+e.target.dataset.id+"&name="+e.target.dataset.name+"&courseimg="+e.target.dataset.courseimg,
  //     success: function(res){
        
  //       //wx.setStorageSync('lessonname', e.target.dataset.name)
  //     },
  //     fail: function() {
  //       // fail
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // },
  gotomine:function(e){
    wx.navigateTo({
      url: '../mine/mine?type='+e.target.dataset.type,
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
  gotomyphoto:function(){
    wx.navigateTo({
      url: '../myphoto/myphoto',
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
  gotomyorder:function(){
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  }
})