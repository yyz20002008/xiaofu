//app.js


App({ 
  onLaunch: function () { 
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        //env: 'test-3aahe'
        env: 'prod-dbtpz',
        traceUser: true,
      })
    }
    this.globalData = { serverDate: this.getserverDate()}
    var that = this;
      //初始化购物车
      /*
    that.timer = setInterval(function () {
         that.scanCart(that)
      }, 1000);
      */
    that.scanCart(that);
   
    /* // 展示本地存储能力 
    var logs = wx.getStorageSync('logs') || [] 
    logs.unshift(Date.now()) 
    wx.setStorageSync('logs', logs) 
 
    // 登录 
    wx.login({ 
      success: res => { 
        // 发送 res.code 到后台换取 openId, sessionKey, unionId 
      } 
    }) 
    // 获取用户信息 
    wx.getSetting({ 
      success: res => { 
        if (res.authSetting['scope.userInfo']) { 
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
          wx.getUserInfo({ 
            success: res => { 
              // 可以将 res 发送给后台解码出 unionId 
              this.globalData.userInfo = res.userInfo 
 
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
              // 所以此处加入 callback 以防止这种情况 
              if (this.userInfoReadyCallback) { 
                this.userInfoReadyCallback(res) 
              } 
            } 
          }) 
        } 
      } 
    })  */

  }, 
   //获取服务器时间
  getserverDate:function(){
    wx.cloud.callFunction({
      name: 'getdate',
      success: function (res) {
        //wx.setStorageSync('serverDate',res.result);
        getApp().globalData.serverDate = res.result.replace(/-/g, '/');
        console.log('云函数返回：'+res.result)
        console.log('getApp().globalData.serverDate'+getApp().globalData.serverDate)
      }
    })
  },
    

    scanCart: function (that) {
    //把购物车里面的数据都塞到了缓存里，取名cart,任何一项修改购物车的行为，都会先取购物车的缓存，在重新更新缓存里的购物车参数
    //购物车
      var cart = wx.getStorageSync("cart");
      //统计购物车商品的总数量
      var cartnumber = 0; //购物车商品数量      
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