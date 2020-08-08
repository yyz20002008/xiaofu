// pages/school/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName:"",
    school:{},
    grade:[],
    class:[],
  },

  /**
   * 生命周期函数--监听页面加载
   * 一个学校hardcode现在 学校多了之后就是改成动态激活码
   */
  onLoad: function (options) {
    const testdb = wx.cloud.database({env: 'test-3aahe'});
    const _ = testdb.command
    testdb.collection('school').where({
      accessCode: _.eq(parseInt(1946320))
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('school', res.data)
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
    
    const school=wx.getStorageSync('school');
    console.log(school);
    this.setData({
        schoolName:school[0].schoolName,
        grade:school[0].grade,
        class:school[0].class
    })
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