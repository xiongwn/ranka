// pages/passage/passage.js
Page({
  data:{
    passages:[],//getStorageSync('passages')
    scroll:true,
    indicator:true,
    autoplay:true,
    interval:2000,
    duration:1000,
    recommend:[{id:19199,title:"文章精选1",imgurl:"http://img1.juimg.com/140922/330698-14092222430638.jpg",type:"营养"},
    {id:19200,title:"文章精选2",imgurl:"http://img1.juimg.com/140922/330698-14092222462617.jpg",type:"八卦"},
    {id:19201,title:"文章精选3",imgurl:"http://img1.juimg.com/141212/330437-1412120K00294.jpg",type:"美体"}],
    allpassages:[{type:"咨询",index:1,passages:[{imgurl:"https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a8773912b31bb0513435b8be367adab44aede017.jpg",title:"一起学单词"},
    {imgurl:"http://orig07.deviantart.net/201c/f/2012/139/1/a/miss_fitness_by_messtor-d50bhxd.jpg",title:"增肌小tips"},
    {imgurl:"http://pre11.deviantart.net/57ee/th/pre/f/2014/282/9/9/muscle_by_elee0228-d1uw349.jpg",title:"女性锻炼小贴士"},
    {imgurl:"http://img07.deviantart.net/46b7/i/2010/195/9/d/muscle_ii_by_dimestoremagic.jpg",title:"beauty"}]},{type:"营养生活",index:2,passages:[
      {imgurl:"http://img1.gtimg.com/jiangsu/pics/hv1/15/173/1573/102328455.png",title:"均衡膳食，有主延缓肌肉松弛"},
      {imgurl:"http://static.i3.xywy.com/cms/20150311/c67f10d342f5111c268df573f82a8f1116165.jpg",title:"粗粮的美味与营养"},
      {imgurl:"http://xs3.op.xywy.com/api.iu1.xywy.com/cms/20151129/cf2f694f245e79db6cea29d7ec7e792d51667.jpg",title:"蛋白质为何对人如此重要"},
      {imgurl:"http://image.9928.tv/UserFiles/Info_Wenhua/20141110/10353362.jpg",title:"碳水化合物——不可或缺"},
      {imgurl:"http://www.daimg.com/uploads/allimg/120110/3-120110212925613.jpg",title:"食物热量大盘点"},
      {imgurl:"http://photocdn.sohu.com/20140822/Img403671283.jpg",title:"看看各类蔬菜中维生素含量对比"}
    ]}],
    current:1 //wx.getStorageSync('current')
  },
  onLoad:function(options){
    wx.setStorageSync('recommend', this.data.recommend)
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorageSync('current')?this.setData({current:wx.getStorageSync('current')}):wx.setStorageSync('current', 1);
    var current=wx.getStorageSync('current')
    this.setData({current:current})
if(this.data.passages==[])
{
  console.log("11")
  wx.setStorageSync('passages', this.data.passages);
  }
else
{
wx.setStorageSync('passages', this.data.allpassages[current-1]["passages"]);
this.setData({passages:wx.getStorageSync('passages')});
}
  },
  goto:function(e){
    console.log(e.target.dataset.name)
wx.navigateTo({
  url: '../paper/paper?name='+e.target.dataset.name,
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
  change:function(e){
var index=e.target.dataset.index,that=this;
if(index==wx.getStorageSync('current'))
{return}
wx.setStorageSync('current', parseInt( index))
wx.setStorageSync('passages', that.data.allpassages[index-1]["passages"])
this.setData({passages:that.data.allpassages[index-1]["passages"]})
this.setData({current:parseInt(index)})

console.log(this.data.passages)
  },
gotorecommend:function(e)
{
wx.navigateTo({
  url: '../paper/paper?recommendname='+e.target.dataset.name,
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
}
})