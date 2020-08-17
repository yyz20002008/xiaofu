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
    this.getOrders();
    console.log(this.data.orders);
    console.log('在onLoad');
    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  
  },
  onShow(){
    //const token=wx.getStorageSync('token');
    /* if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    } */
    console.log('在onShow');

    //获取当前小程序的页面栈-数组
    let pages=getCurrentPages();
    //数组中索引最大的页面是当前页面
    let currentPage=pages[pages.length-1];
    //获取url上type参数
    const {type}=currentPage.options;
    console.log(type);
    //激活选中标题
    this.changeTitleByIndex(type-1);
    this.getCurOrder(type);
  },
  //显示分类订单
  getCurOrder(type){
    var orderList=wx.getStorageSync('orders')
    if(type==1){
      this.setData({
        orders:orderList
      })
    }
    else if(type==2){
      this.setData({
        orders:wx.getStorageSync('orders')[0]
      })
      let curOrder=[];
      for(let i=0;i<orderList.length;i++){
        if(orderList[i].status=='待付款'){
          curOrder.push(orderList[i])
        }
      }
      this.setData({
        orders:curOrder
      })
    }
    else if(type==3){
      this.setData({
        orders:wx.getStorageSync('orders')[0]
      })
      let curOrder=[];
      for(let i=0;i<orderList.length;i++){
        if(orderList[i].status=='待发货'){
          curOrder.push(orderList[i])
        }
      }
      this.setData({
        orders:curOrder
      })
    }
    else if(type==4){
      this.setData({
        orders:wx.getStorageSync('orders')[0]
      })
      let curOrder=[];
      for(let i=0;i<orderList.length;i++){
        if(orderList[i].status=='已发货'){
          curOrder.push(orderList[i])
        }
      }
      this.setData({
        orders:curOrder
      })
    }
    else if(type==5){
      this.setData({
        orders:wx.getStorageSync('orders')[0]
      })
      let curOrder=[];
      for(let i=0;i<orderList.length;i++){
        if(orderList[i].status=='售后'){
          curOrder.push(orderList[i])
        }
      }
      this.setData({
        orders:curOrder
      })
    }
    else{
      this.setData({
        orders:[]
      })
    }
    console.log('在getCurOrder');
  },
  //获取订单列表的方法
  getOrders(){
    //const res=await request({url:"/my/orders/all",data:{type}});
    //console.log({icode});

    this.getOpenid();
    var cur_openid=wx.getStorageSync('openid');
    const testdb = wx.cloud.database({env: 'prod-dbtpz'});
    const _ = testdb.command
    testdb.collection('orders').where({
      // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
      _openid: _.eq(cur_openid)
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('orders', res.data)
      }
    })
    this.setData({
      orders: wx.getStorageSync('orders')
    })
    console.log("all orders:"+this.data.orders);
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
    this.getCurOrder(index+1);
  },
  //
  goToOrderDetails(e){
    console.log(this.data.orders[e.currentTarget.dataset.index]);
    var curOrder = this.data.orders[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/pages/order_details/index?curOrder='+ JSON.stringify(curOrder)+'&&index='+e.currentTarget.dataset.index
    });
  },
  // 获取用户openid
 getOpenid() {
  let that = this;
  wx.cloud.callFunction({
   name: 'getOpenid',
   complete: res => {
    console.log('云函数获取到的openid: ', res.result.openid)
    var openid = res.result.openid;
    wx.setStorageSync('openid', openid);
   }
  })
 }
})