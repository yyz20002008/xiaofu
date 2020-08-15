/*
1.页面打开时
  0 onShow不同于onLoad无法在形参接受option参数
  0.5 判断缓存中有没有token
      没有要跳转授权
      有直接往下
  1.获取url参数type发动请求获取订单数据
  2.根据type决定哪个激活选中
  3.根据type发送请求获得订单数据
  2.渲染页面
2.点击不同标题从新发送请求来获取和渲染数据

*/ 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs: [
      {
        id: 0,
        title: '全部',
        isActive: true
      },
      {
        id: 1,
        title: '待付款',
        isActive: false
      },
      {
        id: 2,
        title: '待发货',
        isActive: false
      },
      {
        id: 3,
        title: '已发货',
        isActive: false
      },
      {
        id: 4,
        title: '退款售后',
        isActive: false
      }
    ],
  },
  onLoad(){
    this.getOrders(type);
  },
  onShow(){
    const token=wx.getStorageSync('token');
    /* if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    } */
    //获取当前小程序的页面栈-数组
    //let pages=getCurrentPages();
    //数组中索引最大的页面是当前页面
    //let currentPage=pages[pages.length-1];
    //获取utl上type参数
    //const {type}=currentPage.options;
    //激活选中标题
   // this.changeTitleByIndex(type-1);
 
    this.setData({
      orders:wx.getStorageSync('orders')
    })
  },
  //获取订单列表的方法
  async getOrders(type){
    //const res=await request({url:"/my/orders/all",data:{type}});
    //console.log({icode});
    const testdb = wx.cloud.database({env: 'prod-dbtpz'});
    const _ = testdb.command
    testdb.collection('orders').where({
      // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
      //accessCode: _.eq(parseInt(this.data.icode))
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('orders', res.data)
      }
    })
 
  },

  /**
  根据标题激活选中标题数组
   */
  changeTitleByIndex(index){
    //修改源数据
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    //赋值到data
    this.setData({
      tabs
    })
  },
  /**
   * 子向父转递数据
   * 标题点击事件
   */

  handleItemChange(e) {
    //获取被点击标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    //重新发送请求 type=1 index=0
    //this.getOrders(index+1);
  }
})