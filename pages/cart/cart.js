Page({
  data: {
    carts: wx.getStorageSync('cartarray') || [],
    count: 0,
    selectedAllStatus: false,
    cart_item_num: 0,
    page: "",

  },
  onLoad: function (options) {
    console.log(options);
    var last_page = options.page;
    this.setData({ page: last_page });
    this.setData({ carts: wx.getStorageSync('cartarray') })
  },
  //单选
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var carts = this.data.carts;
    var selected = carts[index].selected;
    console.log(selected);
    selected = !selected;
    console.log(selected);
    carts[index].selected = selected;
    this.setData({ carts: carts });
    var num = parseInt(this.data.carts[index].hasSelected.num);
    var price = this.data.carts[index].price;
    if (selected) {
      this.setData({
        count: this.data.count + num * price,
        cart_item_num: num + this.data.cart_item_num

      })
    } else {
      this.setData({
        count: this.data.count - num * price,
        cart_item_num: this.data.cart_item_num - num

      });
    }

  },
  //全选
  bindSelectAll: function (e) {
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    this.setData({ selectedAllStatus: selectedAllStatus });
    var carts = this.data.carts;

    if (selectedAllStatus) {
      for (var i = 0; i < carts.length; i++) {
        if (!carts[i].selected) {
          carts[i].selected = selectedAllStatus;
          var num = parseInt(this.data.carts[i].hasSelected.num);
          this.setData({ carts: carts });
          var price = parseInt(this.data.carts[i].price);
          this.setData({
            count: this.data.count + num * price,
            cart_item_num: this.data.cart_item_num + num

          });
        }
      }
    }
    else {
      for (var i = 0; i < carts.length; i++) {
        carts[i].selected = selectedAllStatus;
        this.setData({ carts: carts });
        this.setData({
          count: 0,
          cart_item_num: 0

        });

      }
    }
  },
  //删除购物项
  delete_item: function (e) {
    var cart_before = wx.getStorageSync('cartarray') || [];
    let index = e.target.dataset.index;
    console.log(index);
    var cartNum = cart_before.length;
    var pages = getCurrentPages();
    var page = this.data.page;
    var that = this;
    if (page == "mall") {
      let currPage = pages[pages.length - 1];
      let prePage = pages[pages.length - 2];
      if (cartNum != 0) {
        cart_before.splice(index, 1);
        cartNum = cart_before.length;
        wx.setStorageSync('cartNum', cartNum);
        prePage.setData({ cartNum: cartNum });
        if (cartNum != 0) {
          prePage.setData({ hidden_cart_number: false });
          wx.setStorageSync('hidden_cart_number', false);
        } else {
          prePage.setData({ hidden_cart_number: true });
          wx.setStorageSync('hidden_cart_number', true);
        }
        that.setData({ carts: cart_before });
        wx.setStorageSync('cartarray', cart_before);
      }
    }
    if (page == "product_detail") {
      var currPage = pages[pages.length - 1];//当前页面
      var prePage = pages[pages.length - 2];
      var preprePage = pages[pages.length - 3];
      if (cartNum != 0) {
        cart_before.splice(index, 1);
        cartNum = cart_before.length;
        wx.setStorageSync('cartNum', cartNum);
        prePage.setData({ cartNum: cartNum });
        preprePage.setData({ cartNum: cartNum });
      }
      if (cartNum != 0) {
        prePage.setData({ hidden_cart_number: false });
        preprePage.setData({ hidden_cart_number: false });
        wx.setStorageSync('hidden_cart_number', false);
      } else {
        prePage.setData({ hidden_cart_number: true });
        preprePage.setData({ hidden_cart_number: true });
        wx.setStorageSync('hidden_cart_number', true);
      }
      this.setData({ carts: cart_before });
      wx.setStorageSync('cartarray', cart_before);
    }
    if (page == "person") {
      if (cartNum != 0) {
        cart_before.splice(index, 1);
        cartNum = cart_before.length;
        wx.setStorageSync('cartNum', cartNum);
        if (cartNum != 0) {
          wx.setStorageSync('hidden_cart_number', true);
        } else {
          wx.setStorageSync('hidden_cart_number', false);
        }
      }
      this.setData({ carts: cart_before });
      wx.setStorageSync('cartarray', cart_before);
    }
    

  },
  //去结算
  setPayment: function (e) {
    if (this.data.cart_item_num === 0) {
      wx.showToast({
        title: '未选择商品',
        image: "../../image/image/bacha.png",
        duration: 1000
      })
      return;
    }
    var carts = this.data.carts;
    var has_selected_item = [];
    var num = this.data.cart_item_num;
    var count = this.data.count;
    let name = [];
    wx.setStorageSync('num', num);
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        has_selected_item.push(carts[i]);
        name.push(carts[i].title.match(/[\u0000-\u9fa5]{1,5}/g) + "...")
      }
    }

    wx.setStorageSync('has_selected_item', has_selected_item);
    wx.navigateTo({
      url: '../product/order/order?flag=from_cart&count=' + count + "&name=" + name.join("+"),
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
  }

})