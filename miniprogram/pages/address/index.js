// pages/address/index.js
import{getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
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
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list=wx.getStorageSync('addrList');
    this.setData({
      list:list
    }) 
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
  //增加新地址
  addAddre: function () {
    wx.navigateTo({
      url: '/pages/add_address/index'
    })
  },
  //选择地址
  select: function(e){
    console.log(e.currentTarget.dataset.index);
    for (let i = 0; i < this.data.list.length; ++i) {
      this.data.list[i].checked = i == e.currentTarget.dataset.index
    }
    this.setData({
      list: this.data.list
    });
    let address = this.data.list[e.currentTarget.dataset.index]
    let curAddr=address;
    wx.setStorageSync('curAddr', curAddr);

    //为上一个页面的data赋值
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (prevPage.__route__ == 'pages/cart/index') {
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      },1000) 
    } 
  },
  //编辑
  edit: function (e){
    //console.log(this.data.list[e.currentTarget.dataset.index])
    var address = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/add_address/index?address='+ JSON.stringify(address)+'&&index='+e.currentTarget.dataset.index
    })
  },

  //删除该地址
  async delete(e){
    let index = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset);
    let addr_list=wx.getStorageSync('addrList');
    //let curAddr=wx.getStorageSync('curAddr');
    const res=await showModal({content:"请确定要删除地址吗?"})
    if (res.confirm) {
        addr_list.splice(index,1);
        console.log("删除地址成功"); 
        this.setAddr(addr_list);
        this.setData({
          list:addr_list
        }) 
        //if(curAddr.)
        //console.log("目前地址为空"); 
        //wx.setStorageSync('curAddr', curAddr);

    } 

  },
  setAddr(addr)
  {
    wx.setStorageSync('addrList', addr);
  },
 
})