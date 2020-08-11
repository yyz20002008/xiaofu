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
    //如果之前选择了地址 就载入
    const address=wx.getStorageSync("curAddr")||[];
    this.setData({address});
    //获取缓存中数据
    const cart=wx.getStorageSync("cart")||[];
    //计算全选
    //every()遍历 接受一个回调函数 确保每一个回调函数返回true then every方法返回true
    //空数组返回就是true
    //const allChecked=cart.length?cart.every(v=>v.checked):false;

    this.setCart(cart);
    //update cartreddot
    this.scanCart(this);
  },
    async handleChooseAddress(){
      /*
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
          //  获取微信地址
          /*
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
          */
         wx.navigateTo({
          url: '/pages/address/index'
        })


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
      //update cartDot
      this.scanCart(this)
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
      this.scanCart(this)
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
          cart.splice(index,1);
          this.setCart(cart);
        } 
      }
      else {
        //进行数量修改
        cart[index].num+=operation;
        //设置会缓存和data中
        this.setCart(cart);
      }
      this.scanCart(this)
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
    }
})