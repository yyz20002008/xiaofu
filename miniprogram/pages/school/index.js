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
    this.scanCart(this);
  },
  scanCart: function (that) {
    //我把购物车里面的数据都塞到了缓存里，取名cart,任何一项修改购物车的行为，都会先取购物车的缓存，在重新更新缓存里的购物车参数
    //购物车
      var cart = wx.getStorageSync("cart");
      //统计购物车商品的总数量
      var cartnumber = 0; //购物车菜品的一共的数量      
      for (var index in cart) {
          cartnumber += cart[index].num
      }
      if (cart.length) {   //判断购物车的数量个数，购物车如果为空就走else
          wx.setTabBarBadge({ //购物车不为空 ，给购物车的tabar右上角添加购物车数量标志
            index: 1,						//标志添加位置
            text: "" + cartnumber + ""				//通过编译，将购物车总数量放到这里
          })
      } else {//购物车为空
          wx.removeTabBarBadge({    //移除指定位置的tabbar右上角的标志
            index: 1,
          })
      }
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