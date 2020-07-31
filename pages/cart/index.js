// pages/cart/index.js
import{getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";
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

    this.setData({address});
    this.setCart(cart);
   
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
    },
    handleItemChange(e){
      //1.被修改的商品id
      const cl_id=e.currentTarget.dataset.id;
      console.log(cl_id);
      //购物车数组
      let {cart}=this.data;
      //被修改的商品对象
      let index=cart.findIndex(v=>v.cloth_id===cl_id);

      //选中取反
      cart[index].checked=!cart[index].checked;
      // 重新设置数据
      //this.setData({ cart });
      this.setCart(cart);
    },

    //设置购物车状态重新计算 底部工具栏
    setCart(cart){
      
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
      //重新设置data
      this.setData({
        cart,
        allChecked,
        totalPrice,
        totalNum
      });
      wx.setStorageSync('cart', cart);
    },

    //全选
    handleAlhandleItemAllChecklChange(){
      let {cart,allChecked}=this.data;
      allChecked=!allChecked;
      cart.forEach(v=>v.checked=allChecked);
      this.setCart(cart);
    },
  async handleItemNumEdit(e){
      //获取传递过来的参数
      const {operation,id}=e.currentTarget.dataset;
      //获取购物车数组
      let {cart}=this.data;
      //找到需要修改的商品索引
      const index=cart.findIndex(v=>v.cloth_id===id);
      //判断是否删除
      if(cart[index].num===1&&operation===-1){
        /* wx.showModal({
          title: '提示',
          content: '您确定要删除商品吗？',
          success: (res)=> {
            if (res.confirm) {
              cart.splice(index);
              this.setCart(cart);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        }) */
        const res=await showModal({content:"您确定要删除商品吗?"})
        if (res.confirm) {
          cart.splice(index);
          this.setCart(cart);
        } 
      }
      else {
        //进行数量修改
        cart[index].num+=operation;
        //设置会缓存和data中
        this.setCart(cart);
      }
     
    },
    async handlePay(){
      const {address,totalNum}=this.data;
      if(!address.userName){
        await showToast({title:"您还没有选择收货地址"});
        return;
      }
      if(totalNum===0){
        await showToast({title:"您还没有选择商品"});
        return;
      }
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
})