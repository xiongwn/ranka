Page({
  data: {
    choosen: false,
    dots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    name: "",
    price: "",
    img: "",
    num: 1,
    sum: 1,
    size: "",
    id: 0,
    color: "默认",
    goods_type:'',
    imgarr:[],
    showModalStatus: false,
    animationData: '',
    colorItems: [{ id: 0, color: '默认', ischoose: true }],
    sizeItems: [{ id: 0, size: 'S', ischoose: true }, { id: 1, size: 'M', ischoose: false }, { id: 2, size: 'L', ischoose: false }],
    showItems: {},
    cartNum: wx.getStorageSync('cartNum') || 0,
    hidden_cart_number: wx.getStorageSync('hidden_cart_number') ||false,

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.debug("options",options);
    
    let arr = options.imgarr?options.imgarr.split(","):[]
    this.setData({ name: options.name, price: options.price, img: options.img, id: options.id,imgarr:arr,goods_type:options.goodstype });
    console.log(options.goodstype);
    var cartNum = wx.getStorageSync('cartNum') || 0;
    var hidden_cart_number = wx.getStorageSync('hidden_cart_number') ||false;
    
    this.setData({ hidden_cart_number: hidden_cart_number, cartNum: cartNum});
    console.log(this.data.cartNum);
    console.log(this.data.hidden_cart_number);
    /*var that = this;
    if (wx.getStorageSync('cartNum') == 0) {
      that.setData({ hidden_cart_number: true });
      wx.setStorageSync('hidden_cart_number', true);
     
    }
    else {
      console.log(wx.getStorageSync('hidden_cart_number'));
      that.setData({ hidden_cart_number: false });
      wx.setStorageSync('hidden_cart_number', false);
           
    }*/
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
  bindMinus: function (e) {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var sum = this.data.price * num;
    this.setData({ num: num });
    this.setData({ sum: sum });
  },
  bindPlus: function (e) {
    var num = this.data.num;
    num++;
    var sum = this.data.price * num;
    this.setData({ sum: sum });
    this.setData({ num: num });
  },
  bindManual: function (e) {
    var value = e.detail.value;
    var sum = value * this.data.price;
    this.setData({ num: value });
    this.setData({ sum: sum });
  },
  tobuy: function (e) {
    let that=this;
    let size = this.data.size;
    let id = this.data.id;
    if (size.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择尺码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: '../order/order?flag=from_buy&name='+this.data.name,
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  tocart: function (e) {
    var that = this;
    
    console.log(that.data.size.length);
    if (that.data.size.length != 0) {
      let cart_before = wx.getStorageSync('cartarray') || [];
      let obj = { id: that.data.id, title: that.data.name, price: that.data.price, img: that.data.img, selected: false, hasSelected: { color: that.data.showItems.color, size: that.data.showItems.size, num: that.data.num } };
      cart_before.push(obj);
      var cartNum = cart_before.length;
      wx.setStorageSync('cartarray', cart_before);
      console.log(wx.getStorageSync('cartarray'));
      wx.setStorageSync('cartNum', cartNum);
      console.log(that.data.cartNum);
      that.setData({ cartNum: cartNum });
      console.log(that.data.cartNum);
      if (that.data.cartNum != 0) {
        that.setData({ hidden_cart_number: false });
        wx.setStorageSync('hidden_cart_number', false);
      }
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];
      let cartNum = this.data.cartNum;
      prevPage.setData({ cartNum: cartNum });
      wx.setStorageSync('hidden_cart_number', false);
      prevPage.setData({ hidden_cart_number: false });
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择尺码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }

  },
  mycart: function (e) {
    wx.navigateTo({
      url: '../../cart/cart?page=product_detail',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  selected: function (e) {
    this.setData({ size: e.detail.value });
  },
  setModalStatus: function (e) {
    let that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      size: 'S',
      showItems: { size: 'S', color: that.data.color }
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  set_button_color: function (e) {
    var that = this;
    var temp1 = that.data.colorItems;
    var temp2 = that.data.showItems;
    for (var i = 0; i < that.data.colorItems.length; i++) {
      if (e.target.dataset.id == that.data.colorItems[i]["id"]) {
        temp1[i]["ischoose"] = true;
        temp2.color = temp1[i]["color"];
        that.setData({ colorItems: temp1 });
        that.setData({ showItem: temp2 });
        that.setData({ color: temp1[i]["color"] });
      }
      else {
        temp1[i]["ischoose"] = false;
        that.setData({ colorItems: temp1 });
      }
    }

  },
  set_button_size: function (e) {
    var that = this;
    var temp1 = that.data.sizeItems;
    var temp2 = that.data.showItems;
    for (var i = 0; i < that.data.sizeItems.length; i++) {
      if (e.target.dataset.id == that.data.sizeItems[i]["id"]) {
        temp1[i]["ischoose"] = true;
        temp2.size = temp1[i]["size"];
        that.setData({ sizeItems: temp1 });
        that.setData({ showItems: temp2 });
        that.setData({ size: temp1[i]["size"] });

      }
      else {
        temp1[i]["ischoose"] = false;
        that.setData({ sizeItems: temp1 });
      }
    }
  },
  confirm_selected: function (e) {
    let temp = this.data.showItems;
    temp.num = this.data.num;
    temp.name = this.data.name;
    temp.price = this.data.price;
    temp.img = this.data.img;
    temp.id = this.data.id;
    this.setData({ showItems: temp, choosen: true });
    wx.setStorageSync('showItems', this.data.showItems);
    this.setData({ showModalStatus: false });
  }
})