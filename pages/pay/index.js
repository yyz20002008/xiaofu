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
Page({

  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow:function(){
    const address=wx.getStorageSync("address");
    //获取缓存中数据
    let cart=wx.getStorageSync("cart")||[];
    //过滤后购物车数组
    cart=cart.filter(v=>v.checked);
    this.setData({address});
    let totalPrice=0;
      let totalNum=0;
      cart.forEach(v=>{
          totalPrice+=v.num*v.cloth_price;
          totalNum+=v.num;
      })

      //重新设置data
      this.setData({
        cart,
        address,
        totalPrice,
        totalNum
      });
  },
  //点击支付
  handleOrderPay(){
    //判断token
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;

    }
    else{

    }
  }

})