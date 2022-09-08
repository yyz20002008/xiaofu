// pages/school/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName:"",
    school:{
      "_id":101002,
      schoolName:"北京一零一中学 - 大兴分校",
      grade:[
        //{level:"高中",class:[2020,2019,2018]},
        {level:"初中",
          class:[{cname:2022,img:"https://user-images.githubusercontent.com/1105915/188637665-f254c340-ce62-47df-ab4c-7e3339f8ba93.jpg"},
                 {cname:2021,img:"https://user-images.githubusercontent.com/1105915/188641769-c05652cd-d455-48a3-b277-f8ce3cc12d72.jpg"},
                 {cname:2020,img:"https://user-images.githubusercontent.com/1105915/188643406-e4028b0f-94d8-4125-88e6-219ccc216755.jpg"}
          ]
        }
      ]
    },
    grade:[],
    class:[],
  },

  /**
   * 生命周期函数--监听页面加载
   * 一个学校hardcode现在 学校多了之后就是改成动态激活码
   */
  onLoad: function (options) {
    /*//一个学校就节省时间不用读云数据库了
    const testdb = wx.cloud.database({env: 'prod-dbtpz'});//env: 'test-3aahe'
    const _ = testdb.command
    testdb.collection('school').where({
      accessCode: _.eq(parseInt(1946320))
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('school', res.data)
      }
    })*/
    wx.setStorageSync('school',this.data.school)
    
    const cur_sch_id=wx.getStorageSync('school')["_id"];
    console.log(cur_sch_id);
    const testdb = wx.cloud.database({env: 'prod-dbtpz'});
    const _ = testdb.command
    testdb.collection('cloth').where({
      school_id:parseInt(cur_sch_id),
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('clothitem',res.data)
      }
    })
    setTimeout(function () {
      //要延时执行的代码
     }, 1000) //延迟时间 这里是1秒

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
    //console.log(school[0].grade);
    var g=[],c=[]
    for(let i=0;i<school.grade.length;i++){
      g.push(school.grade[i]);

    }
    this.setData({
        schoolName:school.schoolName,
        grade:g
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