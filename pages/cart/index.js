// pages/cart/index.js
import{getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow:function(){
    const address=wx.getStorageSync("address");
    //获取缓存中数据
    const cart=wx.getStorageSync("cart")||[];
    //计算全选
    //every()遍历 接受一个回调函数 确保每一个回调函数返回true then every方法返回true
    //空数组返回就是true
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.cloth_price;
        totalNum+=v.num;
      }
      else{
        allChecked=false;
      }
    })
    //判断数组为空
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },
    async handleChooseAddress(){
      try {
          /* 
            wx.getSetting({
              success: (result) => {
                // console.log(result);
                const scopeAddress=result.authSetting["scope.address"];
                if (scopeAddress===true||scopeAddress===undefined){
                  //console.log(result);
                  wx.chooseAddress({
                    success: (result1) => {
                      console.log(result1);
                    }
                  });
                }else{
                  console.log("取消");
                  wx.openSetting({
                    success: (result2) => {
                      wx.chooseAddress({
                        success: (result3) => {
                          console.log(result3);
                        }
                      });
                      }
                  });
                }
              },
              fail:()=>{},
              complete:()=>{}
            });
          */
        
            const res1=await getSetting();
            const scopeAddress=res1.authSetting["scope.address"];
            if (scopeAddress===false){
              await openSetting();
            }
            let address=await chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
            wx.setStorageSync('address', address);
          }  catch (error) {
            console.log(error);
          }
    }
  

})