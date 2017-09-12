// pages/calculate/calculate.js
var notification=require("../../utils/wxnotification.js")
var food=require('../../utils/food.js')
Page({
  data:{
    type:"",
    BMI_hidden:"show",
    heightarray: ["1.5米", "1.51米", "1.52米", "1.53米", "1.54米", "1.55米", "1.56米", "1.57米", "1.58米", "1.59米", "1.6米", "1.61米", "1.62米", "1.63米", "1.64米", "1.65米", "1.66米", "1.67米", "1.68米", "1.69米", "1.7米", "1.71米", "1.72米", "1.73米", "1.74米", "1.75米", "1.76米", "1.77米", "1.78米", "1.79米", "1.8米", "1.81米", "1.82米", "1.83米", "1.84米", "1.85米", "1.86米", "1.87米", "1.88米", "1.89米", "1.9米", "1.91米", "1.92米", "1.93米", "1.94米", "1.95米", "1.96米", "1.97米", "1.98米", "1.99米", "2.0米", "2.01米", "2.02米", "2.03米", "2.04米", "2.05米", "2.06米", "2.07米", "2.08米", "2.09米", "2.1米"],
    heightindex:0,
    weightarray: ["30公斤", "31公斤", "32公斤", "33公斤", "34公斤", "35公斤", "36公斤", "37公斤", "38公斤", "39公斤", "40公斤", "41公斤", "42公斤", "43公斤", "44公斤", "45公斤", "46公斤", "47公斤", "48公斤", "49公斤", "50公斤", "51公斤", "52公斤", "53公斤", "54公斤", "55公斤", "56公斤", "57公斤", "58公斤", "59公斤", "60公斤", "61公斤", "62公斤", "63公斤", "64公斤", "65公斤", "66公斤", "67公斤", "68公斤", "69公斤", "70公斤", "71公斤", "72公斤", "73公斤", "74公斤", "75公斤", "76公斤", "77公斤", "78公斤", "79公斤", "80公斤", "81公斤", "82公斤", "83公斤", "84公斤", "85公斤", "86公斤", "87公斤", "88公斤", "89公斤", "90公斤", "91公斤", "92公斤", "93公斤", "94公斤", "95公斤", "96公斤", "97公斤", "98公斤", "99公斤", "100公斤", "101公斤", "102公斤", "103公斤", "104公斤", "105公斤", "106公斤", "107公斤", "108公斤", "109公斤", "110公斤", "111公斤", "112公斤", "113公斤", "114公斤", "115公斤", "116公斤", "117公斤", "118公斤", "119公斤", "120公斤", "121公斤", "122公斤", "123公斤", "124公斤", "125公斤", "126公斤", "127公斤", "128公斤", "129公斤","130公斤", "131公斤", "132公斤", "133公斤", "134公斤", "135公斤", "136公斤", "137公斤", "138公斤", "139公斤", "140公斤", "141公斤", "142公斤", "143公斤", "144公斤", "145公斤", "146公斤", "147公斤", "148公斤", "149公斤", "150公斤"],
    weightindex:0,
    agearray: ["10岁", "11岁", "12岁", "13岁", "14岁", "15岁", "16岁", "17岁", "18岁", "19岁", "20岁", "21岁", "22岁", "23岁", "24岁", "25岁", "26岁", "27岁", "28岁", "29岁", "30岁", "31岁", "32岁", "33岁", "34岁", "35岁", "36岁", "37岁", "38岁", "39岁", "40岁", "41岁", "42岁", "43岁", "44岁", "45岁", "46岁", "47岁", "48岁", "49岁", "50岁", "51岁", "52岁", "53岁", "54岁", "55岁", "56岁", "57岁", "58岁", "59岁", "60岁"],
    ageindex:0,
    sexarray:['女','男'],
    sexindex:0,
    foodindex:0,
    height:'输入您的身高(单位：米)',
    weight:'输入您的体重(单位：公斤)',
    sex:'输入您的性别',
    age:'输入您的年龄',
    sporthidden:"null",
    addcontrol:"null",
    choicedsport:"",
    window_width:0,
    iscancel:'iscancel',
    minute:0,
    are_you_sure:'ok',
    focus:false,
    calorie:0,
    food_calorie:0,
    img_hidden:'',
    sportshow:'',
    windowWidth:0,
    windowHeight:0,
    foodrange:["10克", "20克", "30克", "40克", "50克", "60克", "70克", "80克", "90克", "100克", "110克", "120克", "130克", "140克", "150克", "160克", "170克", "180克", "190克", "200克", "210克", "220克", "230克", "240克", "250克", "260克", "270克", "280克", "290克", "300克", "310克", "320克", "330克", "340克", "350克", "360克", "370克", "380克", "390克", "400克", "410克", "420克", "430克", "440克", "450克", "460克", "470克", "480克", "490克", "500克", "510克", "520克", "530克", "540克", "550克", "560克", "570克", "580克", "590克", "600克", "610克", "620克", "630克", "640克", "650克", "660克", "670克", "680克", "690克", "700克", "710克", "720克", "730克", "740克", "750克", "760克", "770克", "780克", "790克", "800克", "810克", "820克", "830克", "840克", "850克", "860克", "870克", "880克", "890克", "900克", "910克", "920克", "930克", "940克", "950克", "960克", "970克", "980克", "990克", "1000克"],
    findfoodarray:[{"id":"36-C","food":"小葱","calorie":"27"},{"id":"36-E","food":"刀豆","calorie":"40"},{"id":"36-G","food":"西红柿","calorie":"20"},{"id":"37-A","food":"黄花菜","calorie":"214"},{"id":"37-C","food":"菠菜","calorie":"28"},{"id":"37-E","food":"芥菜头","calorie":"36"}],
    choicedcalorie:0,
    foodarray:food.food,

    sportarray:[[{sport:"慢走 (一小时4公里)",calorie:255},{sport:"快走（一小时8公里）",calorie:555},{sport:"慢跑 (一小时9公里)",calorie:655},{sport:"快跑 (一小时12公里）",calorie:700},{sport:"单车 (一小时9公里)",calorie:245},{sport:"单车 (一小时16公里)",calorie:415},{sport:"单车 (一小时21公里)",calorie:655},{sport:"有氧运动(轻度)",calorie:275},{sport:"有氧运动(中度)",calorie:350},{sport:"体能训练",calorie:300},{sport:"仰卧起坐",calorie:432},{sport:"走步机(一小时6公里)",calorie:345},{sport:"爬楼梯",calorie:480},{sport:"爬楼梯1500级（不计时）",calorie:250},{sport:"爬梯机",calorie:680},{sport:"游泳(一小时3公里)",calorie:550},{sport:"网球",calorie:425},{sport:"手球",calorie:600},{sport:"桌球",calorie:300},{sport:"高尔夫球（走路自背球杆）",calorie:270},{sport:"轮式溜冰",calorie:350},{sport:"郊外滑雪（一小时8公里）",calorie:600},],[{sport:"开车",calorie:82},{sport:"工作",calorie:76},{sport:"读书",calorie:88},{sport:"午睡",calorie:48},{sport:"看电视",calorie:72},{sport:"跳舞",calorie:300},{sport:"健身操",calorie:300},{sport:"跳绳",calorie:448},{sport:"打拳",calorie:450},{sport:"泡澡",calorie:168},{sport:"洗衣服",calorie:114},{sport:"烫衣服",calorie:120},{sport:"洗碗",calorie:136},{sport:"插花",calorie:114},{sport:"锯木",calorie:400},{sport:"骑马",calorie:350},{sport:"遛狗",calorie:130},{sport:"郊游",calorie:240},{sport:"逛街",calorie:110},{sport:"购物",calorie:180},{sport:"打扫",calorie:228}]],
    index_0:"index0",
    index_1:"null",
    incidentarray:[],
    BMI:'',
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that=this;
  
    this.setData({
      type:options.type,
      incidentarray:that.data.sportarray[0]
    })
   this.addselfsport()
   this.addfood_1()
    wx.getSystemInfo({
      success: function(res) {
        that.setData({windowWidth:res.windowWidth,windowHeight:res.windowHeight})
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
  changeheight:function(e)
  {
    var height=this.data.heightarray[e.detail.value];
    
    this.setData({height:height,heightindex:e.detail.value})
  },
  changeweight:function(e)
  {
    var weight=this.data.weightarray[e.detail.value];
    
    this.setData({weight:weight,weightindex:e.detail.value})
  },
  caculate:function()
  {
    var height = parseFloat(this.data.height.match(/^\d\.\d+/g)), weight = parseFloat(this.data.weight.match(/^\d+/g))
    if (!Number.isNaN(height) && !Number.isNaN(weight) && !Number.isNaN(parseFloat(this.data.age.match(/^\d+/g))) &&this.data.sex!=='输入您的性别')
    {
    
    
    var total=(weight/height/height).toFixed(2);
    this.setData({
      BMI_hidden:"hidden"
    })
    this.setData({BMI:total})
    }
    else{
      this.setData({BMI:'请完善您的信息'})
    }
    
  },
  changesport:function(e)
  {
    let that=this;
    if(parseInt(e.target.dataset.index)==0)
    {
      that.setData({
        index_0:"index0",
        index_1:"null",
        incidentarray:that.data.sportarray[0]
      })
    }
    else{
      that.setData({
        index_0:"null",
        index_1:"index1",
        incidentarray:that.data.sportarray[1]
      })
    }
  },
  addanimation:function(e)
  {
    let that=this;
    let canvascontext=wx.createCanvasContext("ruler")
    let window_width
    wx.getSystemInfo({
      success: function(res) {
        window_width=res.windowWidth/2;
        that.setData({window_width:window_width})
      }
    })
    canvascontext.setFillStyle('#b5b5b5')
   // canvascontext.font="20px"
    for(let i=0,j=0;i<=160;i++)
    { j=i+1
      if(i%10==0)
      {
        canvascontext.fillRect(window_width+i*10+j/10+1,0,2,30);
        canvascontext.fillText(i,window_width+i*10+i/10,40)
      }
      else //if(i%10==1)
      {
        canvascontext.fillRect(window_width+i*10+i/10+2,0,1,24)
      }
      // else 
      // {
      //   canvascontext.fillRect(window_width+i*5+i/10,0,1,24)
      // }
    }
    canvascontext.draw()
    this.setData({
      iscancel:'',
      sporthidden:"sporthidden",
      addcontrol:"addcontrol",
      sportshow:'noshowsport',
      choicedsport:e.target.dataset.sport,
      choicedcalorie:e.target.dataset.calorie,
      are_you_sure:'ok'
    })
    
  },
  addsport:function()
  {
    let obj={},arr=wx.getStorageSync('selfsport')||[];
    obj.sport=this.data.choicedsport;
    obj.calorie=parseInt((this.data.choicedcalorie*this.data.minute/60).toFixed(2))
    let that=this;
    let canvascontext=wx.createCanvasContext("ruler")
    canvascontext.clearRect(0, 0, that.data.windowWidth*2, that.data.windowHeight)
    canvascontext.draw()
    arr.push(obj);
    wx.setStorageSync('selfsport', arr)
    this.setData({
      addcontrol:"null",
      sporthidden:"null",
      sportshow:''
    })
    this.addselfsport();
    notification.postNotificationName("addselfsport")
    wx.showToast({
      title: '添加成功',
  icon: 'success',
  duration: 700
    })
  },
  bindscroll:function(e)
  {
    
let width=this.data.window_width
this.setData({minute:Math.floor(e.detail.scrollLeft/10)})
   //console.log('width:'+width+'  scrollLeft:'+e.detail.scrollLeft)
  },
  cancel:function(){
    let that=this;
    let canvascontext=wx.createCanvasContext("ruler")
    canvascontext.clearRect(0, 0, that.data.windowWidth*2, that.data.windowHeight)
    canvascontext.draw()
    this.setData({
      addcontrol:"null",
      sporthidden:"null",
      iscancel:'iscancel',
      sportshow:'',
      are_you_sure:''
    })
  },
  inputchange:function(e)
  {
    
    let that=this;
    let array=[]
    for(let value of this.data.foodarray)
    {
      if(value.food.includes(e.detail.value))
      {
        value.food=value.food.split(/[;&、]/g)[0]
        value.calorie=value.calorie.split('/')[0]
        array.push(value)
      //  break;
      }
    }
    if(array!=[])
    this.setData({findfoodarray:array})
  },
  // foodchange:function(e)
  // {
  //   this.setData({foodindex:e.detail.value})
  // },
  addfood:function(e)
  {
    let that=this;
    let arr=wx.getStorageSync('foodarray')||[];
    let obj={};
  //  let cal=parseInt(e.target.dataset.calorie.split("/")[0]);
    //let per=parseInt(e.target.dataset.calorie.split("/")[1])
    obj["food"]=e.target.dataset.choosenfood.split(/[;&、]/g)[0];
    obj["calorie"]=(parseInt(that.data.foodrange[parseInt(e.detail.value.split('克')[0]) ])/100*e.target.dataset.calorie).toFixed(2);
    arr.push(obj)
    
    wx.setStorageSync('foodarray', arr);

    notification.postNotificationName("addfood")
    this.addfood_1()
    wx.showToast({
      title: '添加成功',
  icon: 'success',
  duration: 500
    })
  },
  bindfocus:function(){
    let that=this;
    that.setData({img_hidden:'img_hidden'})
  },
  bindblur:function(e){
    if(!e.detail.value)
    this.setData({img_hidden:''})
  },
  searchbind:function(){
this.setData({focus:true,img_hidden:'img_hidden'})
  },
  changeage:function(e){
    let that=this;
    let index=e.detail.value,age=this.data.agearray[index]
    this.setData({ageindex:index,age:age})
  },
  changesex:function(e){
    let that=this;
    let index=e.detail.value,sex=this.data.sexarray[index]
    this.setData({sexindex:index,sex:sex})
  },
  addselfsport:function()
  {
    let calorie=0,selfsport=wx.getStorageSync('selfsport')
   
    for(let value of selfsport)
    {
      calorie+=parseInt(value.calorie);
      
    }
    this.setData({
      //selfsport:selfsport,
      calorie:calorie,
    })
  },
  addfood_1:function()
  {
    let foodarr=[];
    if(wx.getStorageSync('foodarray')!=[])
    {
      let cal=0;
      foodarr=wx.getStorageSync('foodarray')
      for(let value of foodarr)
      {
        cal=cal+parseInt(value.calorie)
      }
      this.setData({
       // foodarray:foodarr,
        food_calorie:cal
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '藜麦视频点播小程序',
      path: '/pages/tool/tool'
    }
  }

})