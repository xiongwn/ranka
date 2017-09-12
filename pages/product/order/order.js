Page({
  data: {
    username: "",
    phone: "",
    address: [],
    productname: "",
    img: "",
    price: "",
    num: 0,
    size: "",
    carts: [],
    count: 0,
    flag: "",
    name: ""

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(options);
    
    var flag = options.flag;
    var count = 0;

    this.setData({ flag: flag });
    if (flag == "from_cart") {
      var carts = wx.getStorageSync('has_selected_item');
      
      
      count = options.count;
      this.setData({ count: count, name: options.name, carts: carts, num: wx.getStorageSync('num') });
      console.log(count)
      console.log(options.name)
    } else {
      var carts = [];
      var obj = wx.getStorageSync('showItems');
      carts.push(obj);
      this.setData({ carts: carts });
      this.setData({ num: wx.getStorageSync('showItems').num });
      count = wx.getStorageSync('showItems').price * wx.getStorageSync('showItems').num;
      console.log(count);
      this.setData({ count: count})
      //console.log(options.name.match(/[\u0000-\u9fa5]{1,5}/g))
      let name = options.name  //.match(/[\u0000-\u9fa5]{1,5}/g)[0] + "..."
      this.setData({  name: name });
    }


  },
  add_address: function (e) {

    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          let address = [];
          address[0] =  res.userName;
          address[1] = res.telNumber;
          address[2] =  res.provinceName+res.cityName+res.countyName+res.detailInfo;
          that.setData({address:address});
          let openid = wx.getStorageSync("openid");
          wx.request({
            url: 'https://www.hxjiachen.com/ranka/wxpay/wxAddReceiverAddress.do?openid='+ openid +'&name='+address[0]+'&tel='+address[1]+'&address='+address[2],
            success: function (res) {
              console.log(res)
            }
          })
         
          
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    

  },
  pay_Order: function (e) {
    let that = this;
    //  wx.navigateBack({
    //    delta: 2, // 回退前 delta(默认为1) 页面
    //    success: function(res){
    //      // success
    //    },
    //    fail: function() {
    //      // fail
    //    },
    //    complete: function() {
    //      // complete
    //    }
    //  })
    let address = this.data.address;
    
    if(address.length == 0){
      wx.showToast({
        title: '请填写收货地址',
      })
    }else{
      var fee = that.data.count * 100
      if(that.data.flag==="from_cart")
      {
        let arr=[];
        console.log(that.data.carts)
        for(let value of that.data.carts)
        {
          let obj={};
          obj["goods_Id"]=value["id"]
          obj["quantity"] = value["hasSelected"]["num"]
          arr.push(obj)
        }
        let str=JSON.stringify(arr)
        console.log(str)
        wx.request({
        url: 'https://www.hxjiachen.com/ranka/wxpay/wxUnifiedOrder.do?openid=' + wx.getStorageSync("openid") + "&total_fee=" + fee ,
        data: { detail:arr},
        fail: function () {
          wx.showToast({ title: "网络错误", icon: "loading", duration: 700 })
        },
        success: function (e) {
          wx.showModal({
            title: '确认支付',
            content: that.data.count + "元：" + that.data.name,//.match(/[\u0000-\u9fa5]{5}/g) + "...",
            success: function (res) {
              if (res.confirm) {
                console.log(e.data)
                wx.requestPayment({
                  timeStamp: e.data.timeStamp,
                  nonceStr: e.data.nonceStr,
                  package: e.data.pack,
                  signType: e.data.signType,
                  paySign: e.data.paySign,
                  success: function (r) {
                    console.log(r)
                  }
                })
              }
              else if (res.cancel) {
                console.log("用户已取消")
              }
            }
          })
        }
      })
      }
      else
      {
        let arr = [];
        console.log(that.data.carts)
        for (let value of that.data.carts) {
          let obj = {};
          obj["goods_Id"] = value["id"]
          obj["quantity"] = value["num"]
          arr.push(obj)
        }
        let str = JSON.stringify(arr)
        console.log(str)
        wx.request({
          url: 'https://www.hxjiachen.com/ranka/wxpay/wxUnifiedOrder.do?openid=' + wx.getStorageSync("openid") + "&total_fee=" + fee,
          data: { detail: arr },
          fail: function () {
            wx.showToast({ title: "网络错误", icon: "loading", duration: 700 })
          },
          success: function (e) {
            wx.showModal({
              title: '确认支付',
              content: that.data.count + "元：" + that.data.name,//.match(/[\u0000-\u9fa5]{5}/g) + "...",
              success: function (res) {
                if (res.confirm) {
                  console.log(e.data)
                  wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.pack,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function (r) {
                      console.log(r)
                    }
                  })
                }
                else if (res.cancel) {
                  console.log("用户已取消")
                }
              }
            })
          }
        })
      }
    }


    //  wx.requestPayment({ timeStamp: new Date(), nonceStr:"5K8264ILTKCH16CQ2502SI8ZNMTM67VS"})
  }
})