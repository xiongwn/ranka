// pages/mall/mall.js
Page({
  data: {
    goods:[],
    alltitlebars: wx.getStorageSync("alltitlebars")||[],
    current: 1,
    cartNum:wx.getStorageSync('cartNum') || 0,
    hidden_cart_number:wx.getStorageSync('hidden_cart_number') ||false,
    width:0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    wx.getSystemInfo({
      success: function (res) {that.setData({width:res.windowWidth})  },
    })
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxgoods/wxGetGoodsList.do',
      
      success: function(res) {
        
        let data = res.data;
        wx.setStorageSync("alltitilebars", data);
        that.setData({alltitlebars:data});
        console.log(that.data.current);
        console.log(that.data.alltitlebars)
        if (that.data.goods.length == 0) {
          console.log(that.data.alltitlebars[current - 1]["goods"]);
          wx.setStorageSync('goods', that.data.alltitlebars[current - 1]["goods"]);
          that.setData({goods:wx.getStorageSync('goods')})
        }
        else {
          wx.setStorageSync('goods', that.data.alltitlebars[current - 1]["goods"]);
          that.setData({ goods: wx.getStorageSync('goods') });
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    });
    wx.getStorageSync("current")?this.setData({current:wx.getStorageSync('current')}):wx.setStorageSync('current', 1);
    var current = wx.getStorageSync('current');
    this.setData({current:current});
    var cartNum = wx.getStorageSync("cartNum")||0;
    this.setData({cartNum:cartNum});
   
    var cartNum = wx.getStorageSync('cartNum') || 0;
    var hidden_cart_number = wx.getStorageSync('hidden_cart_number') ||false;
    this.setData({cartNum:cartNum});
    this.setData({hidden_cart_number:hidden_cart_number});
    /*
    var that = this;
    if (wx.getStorageSync('cartNum') == 0) {
      that.setData({ hidden_cart_number: true });
      wx.setStorageSync('hidden_cart_number', true);
      that.setData({cartNum:wx.getStorageSync('cartNum')});
      console.log(this.data.cartNum);
     
    }
    else {
      console.log(wx.getStorageSync('hidden_cart_number'));
      that.setData({ hidden_cart_number: false });
      wx.setStorageSync('hidden_cart_number', false);
      that.setData({cartNum:wx.getStorageSync('cartNum')});
     console.log(this.data.cartNum);
    }
    */
  },
  jump: function(e){
      console.log(e);
      var name = e.target.dataset.name;
      var price = e.target.dataset.price;
      var img = e.target.dataset.img;
      let id=e.target.dataset.id;
      let imgarr=e.target.dataset.imgarr;
      let goodstype=e.target.dataset.goodstype
      wx.navigateTo({
        url: '../product/product_detail/product_detail?name='+ name + '&price=' + price + "&img=" + img+"&id="+id+"&imgarr="+imgarr+"&goodstype="+goodstype,
        success: function(res){
          // success
          console.log(res);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
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
  click:function(e){
      var index = e.target.dataset.index;
      var that = this;
      if(index == wx.getStorageSync('current')){
          return;
      }
      wx.setStorageSync('current', parseInt(index));
      wx.setStorageSync('goods', that.data.alltitlebars[index-1]["goods"]);
      this.setData({goods:that.data.alltitlebars[index-1]["goods"]});
      this.setData({current:parseInt(index)});
      console.log(wx.getStorageSync('current'));
      console.log(wx.getStorageSync('goods'));
  },
  tocart:function(e){
      wx.navigateTo({
        url: '../cart/cart?page=mall',
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
  onShareAppMessage: function () {
    return {
      title: '藜麦视频点播小程序',
      path: '/pages/mall/mall'
    }
  }

})