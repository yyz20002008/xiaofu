import{formatTime,uuid} from "../../utils/util.js";
import{utc_beijing} from "../../utils/jumpUtils.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestamp:'',
    serverDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getserverDate();
  },
  //获取服务器时间
  getserverDate:function(){
  wx.cloud.callFunction({
    name: 'getdate',
    success: function (res) {
      wx.setStorageSync('serverDate',res.result);
      console.log('云函数返回：'+res.result)
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
    this.setData({
      serverDate:wx.getStorageSync('serverDate')
    })
    
    //获取当前时间戳  转换成北京时间
    let timestamp = formatTime(utc_beijing(this.data.serverDate)) ;  
    console.log("当前北京时间为：" + timestamp);  
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

  }
})