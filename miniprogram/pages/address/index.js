// pages/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
    student_name:'杨小二',
    student_class:'2020级高中',
    receiver:'杨大爷',
    phone:'13827465923',
    address:'北京市海淀区胜因院21号'},
    {
      student_name:'小明',
    student_class:'2019级高中',
    receiver:'小明爸爸',
    phone:'13842432568',
    address:'北京市清华大学家属区3-4-301'}
  ]
  },
  edit: function (e){
    console.log(this.data.list[e.currentTarget.dataset.index])
    var address = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/add_address/index?address='+ JSON.stringify(address)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let list=wx.getStorageSync('addrList');
    this.setData({
      list:list
    }) 
  },

  //增加地址
  addAddre: function () {
    wx.navigateTo({
      url: '/pages/add_address/index'
    })
  },
  //选择地址
  select: function(e){
    //为上一个页面的data赋值
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (prevPage.__route__ == 'pages/cart/index') {
      var address = {
        name: e.currentTarget.dataset.name,
        address: e.currentTarget.dataset.address,
        phone: e.currentTarget.dataset.phone,
        id: e.currentTarget.dataset.id
      }
      console.log("为上一个页面的address赋值",address)
      prevPage.setData({
        address: address
      })
      /* wx.navigateBack({
        delta: 1
      }) */
    }
  }
})