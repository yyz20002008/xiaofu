// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  backHome(){
    wx.reLaunch({
      url: '../showye/showye'
    })
  }
})