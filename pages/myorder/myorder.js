// myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let openid=wx.getStorageSync("openid")
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxpay/wxGetGoodsOrderList.do',
      data:{openid:openid},
      success:function(e){
        console.log(e)
        let arr=[]
        for(let value of e.data)
        {
          let obj={}
          let detail=JSON.parse(value["detail"])
          obj["id"]=detail[0]["id"]
          obj["num"] = detail[0]["buy_quantity"]
          obj["imgurl"]=detail[0]["imgurl"]
          obj["state"]=value["complete"]
          obj["ordernum"] = value["out_trade_no"]
          obj["title"]=detail[0]["title"]
          obj["price"]=detail[0]["price"]
          obj["imgarr"] = detail[0]["imgurlList"] ? detail[0]["imgurlList"]:"[]"
          obj["goodtype"] = detail[0]["goodsType"]
          arr.push(obj)
        }
        that.setData({orders:arr})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  delete_item: function (e) {
    let index = e.target.dataset.id;
    let orders = this.data.orders;
    orders.splice(index, 1);
    this.setData({ orders: orders });
    let ordernum=e.target.dataset.ordernum;
    let openid=wx.getStorageSync("openid")
    wx.request({
      url: 'https://www.hxjiachen.com/ranka/wxpay/wxDeleteOrderList.do',
      data:{openid:openid,out_trade_no:ordernum},
    })
  },
  buy_again:function(e){
    var index = e.target.dataset.index;
    var orders = this.data.orders;
    var title = orders[index].title;
    var price = orders[index].price;
    var img = orders[index].imgurl;
    var id = orders[index].id;
    let imgarr=orders[index].imgarr;
let goodtype=orders[index].goodtype
    wx.navigateTo({
      url: '../product/product_detail/product_detail?name=' + title + '&price=' + price + "&img=" + img + "&id=" + id+"&imgarr="+imgarr+"&goodtype="+goodtype,
      success: function (res) {
        // success
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})