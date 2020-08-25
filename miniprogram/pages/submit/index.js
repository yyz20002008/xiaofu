/*
支付
1.在页面加载时 缓存中获取购物车
checked must be true
2. 支付需要企业账号 后台绑定 给开发者添加上白名单 一个appid 绑定多个开发者
3. 支付按钮
先判断缓存中有没有token
没有跳到授权页面 拿token
*/
import{getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import{formatTime,uuid} from "../../utils/util.js";
import {accAdd,accMul} from "../../utils/util.js";

import{utc_beijing} from "../../utils/jumpUtils.js";
const app = getApp()
Page({

  data: {
    address:{},
    cart:[],
    totalPrice:0,
    shippingFee:10,
    totalNum:0,
    beijing:''
  },
  onLoad:function(){
    //wx.setStorageSync('beijing', utc_beijing(app.globalData.serverDate));
    
  },
  onShow:function(){
    //this.setData({beijing:wx.getStorageSync('beijing').toLocaleDateString()})
    const address=wx.getStorageSync("curAddr");
    //获取缓存中数据
    let cart=wx.getStorageSync("cart")||[];
    //过滤后购物车数组
    cart=cart.filter(v=>v.checked);
    this.setData({address});
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
          totalPrice=accAdd(accMul(v.num,v.cloth_price),totalPrice);
          totalNum+=v.num;
      })
    totalPrice=accAdd(totalPrice,this.data.shippingFee);
      //重新设置data
    this.setData({
        cart,
        address,
        totalPrice,
        totalNum
    });
  },
  //点击支付
  async handleOrderSubmit(){
    //获取缓存中数据
    let cart=wx.getStorageSync("cart")||[];
    //过滤后购物车数组
    cart=cart.filter(v=>v.checked);
    const address=wx.getStorageSync("curAddr");
    const totalPrice=this.data.totalPrice;
    //准备支付
    const goodsnum = this._getGoodsRandomNumber();//订单号
    console.log("订单号: "+goodsnum);
    console.log(totalPrice);
    if (totalPrice>0) {
      const res=await showModal({content:"您确定要提交订单吗?不改了?"});
        if (res.confirm) {
         //提交订单
         this.creatOrder(goodsnum);
        } 
    } else {
      await showToast({title:"亲,没有商品,无法提交哦"}); 

    } 
  },
  
  creatOrder(goodsnum){
    //获取缓存中数据
    let cart=wx.getStorageSync("cart")||[];
    //过滤后购物车数组
    cart=cart.filter(v=>v.checked);
    //把商品信息写进body
    var order_item=[];
    for(let i=0;i<cart.length;i++){
      order_item.push({
        cloth_id:cart[i].cloth_id,
        cloth_price:cart[i].cloth_price,
        cloth_notes:cart[i].cloth_notes,
        num:cart[i].num
      });
    } 
    const address=wx.getStorageSync("curAddr");
    const totalPrice=this.data.totalPrice;
    //获取当前时间戳  转换成北京时间
    //console.log("after bejing: "+utc_beijing(app.globalData.serverDate));
    
    let curBeijingTime = formatTime(new Date())//utc_beijing(app.globalData.serverDate);  
    console.log("当前北京时间为：" + curBeijingTime);  
    //写入数据库        
    const testDB = wx.cloud.database({
      //env: 'test-3aahe'
      env: 'prod-dbtpz'
    })
    testDB.collection('orders').add({
      data: {
        _id:goodsnum,
        product:order_item,
        totalPrice:totalPrice,
        address:address,
        orderDate:curBeijingTime,
        status:'待发货'
      },
      success: function(res) {
        // res 是一个对象
        console.log("订单添加成功")
        wx.showToast({
          title: '订单添加成功',
          icon: 'none',
          duration: 3000,
          success: function () {
            setTimeout(function() {
             // wx.navigateTo({url: '../order/index?type=1',})//跳转到order页面要给个参数要不没order list
             wx.switchTab({url: '../user/index',})
            }, 3000);
          }
        });
      }
    }) 
    
  wx.setStorageSync("cart",[]);//清空购物车
  },
  // 随机生成商品订单号,订单号不能重复
  _getGoodsRandomNumber() {
    const date = new Date()//utc_beijing(app.globalData.serverDate); // IOS 时间转换问题还是直接用小程序时间吧
    console.log("_getGoodsRandomNumber:"+date)
    let Year = `${date.getFullYear()}`; // 获取年份
    let Month = `${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }`; // 获取月
    let Day = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`; // 获取天
    let hour = `${
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    }`; // 获取小时
    let min = `${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`; // 获取分钟
    let sec = `${
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    }`; // 获取秒
    let formateDate = `${Year}${Month}${Day}${hour}${min}${sec}`; // 时间
    //console.log(formateDate);
    /* return `${Math.round(Math.random() * 1000)}${formateDate +
      Math.round(Math.random() * 89 + 100).toString()}`; */
    return formateDate+Math.round(Math.random() * 100).toString();//不用太多位一秒不会有那么多单
  },
  
})