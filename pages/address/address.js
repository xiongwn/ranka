Page({
  data: {
    address: ["", "", ""]
  },
  tosave: function (e) {
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var add = e.detail.value.address;
    this.data.address[0] = name;
    this.data.address[1] = phone;
    this.data.address[2] = add;
    var address = this.data.address;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];
    prevPage.setData({address: address});
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
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