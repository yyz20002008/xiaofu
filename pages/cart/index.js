// pages/cart/index.js
import{getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address:{}
  },
  onShow:function(){
    const address=wx.getStorageSync("address");
    this.setData({
      address
    });
    console.log(address);
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