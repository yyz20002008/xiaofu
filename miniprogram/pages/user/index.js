// pages/user/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    //console.log("print"+userinfo);
    this.setData({
      userinfo
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
    }
})