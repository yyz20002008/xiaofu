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
import{formatTime} from "../../utils/util.js";
import{utc_beijing} from "../../utils/jumpUtils.js";
utc_beijing
const app = getApp()
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
    /* const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;

    }
    else{

    } */
    //获取缓存中数据
    let cart=wx.getStorageSync("cart")||[];
    //过滤后购物车数组
    cart=cart.filter(v=>v.checked);
    const address=wx.getStorageSync("address");
    const totalPrice=wx.getStorageSync("totalPrice");
    //获取当前时间戳  
    let timestamp = formatTime(utc_beijing(app.globalData.serverDate)) ;  
     
    console.log("当前时间戳为：" + timestamp);  
    //console.log(cart[1].cloth_id);
     //before 真支付 check write into cloud DB
    const testDB = wx.cloud.database({
      env: 'test-3aahe'
    })
    testDB.collection('orders').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了

        product:cart,
        totalPrice:totalPrice,
        address:address,
        orderDate:timestamp

      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    }) 

  }

})