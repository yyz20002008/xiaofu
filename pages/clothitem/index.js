// pages/clothitem/index.js
Page({

  /**
   加入购物车
   1.绑定点击事件
   2. 获取缓存购物车数据 数组格式
   3. 先判断当前商品是否已经存在购物车
   4. 已经存在 修改商品数据
   5. 不存在++
   */
  data: {
    items: [
      {value: 'S-1', name: 'S-1(150/70)', checked: 'true'},
      {value: 'M', name: 'M'},
      {value: 'L', name: 'L'},
      {value: 'XL', name: 'XL'},
      {value: '2XL', name: '2XL'},
      {value: '3XL', name: '3XL'},
      {value: '4XL', name: '4XL'},
      {value: '5XL', name: '5XL'},
      {value: '特体', name: '特体'}
    ],
    gender: [
      {value: 'male',name:'男',checked:'true'},
      {value: 'female',name:'女'}
    ],
    clothInfo:{
      cloth_id: '',
      num:''
    },
  },
  
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },
  radioChangeGender(f) {
    console.log('radio发生changeGender事件，携带value值为：', f.detail.value)

    const gitems = this.data.gender
    for (let i = 0, len = gitems.length; i < len; ++i) {
      gitems[i].checked = gitems[i].value === f.detail.value
    }

    this.setData({
      gitems
    })
  },

    //options(Object)
  onLoad: function(options) {
    const{cloth_id}=options;
    console.log(cloth_id);
    console.log('tempid:'+cloth_id);
    var str='clothInfo.cloth_id';
    this.setData({
      [str]:cloth_id
    })
    console.log(this.data.clothInfo);
  },
  
  handleCartAdd(){

    let cart=wx.getStorageSync('cart')||[];
    console.log(this.data.clothInfo);
    let index=cart.findIndex((v)=>v.cloth_id===this.data.clothInfo.cloth_id);
    if (index===-1){
      this.data.clothInfo.num=1;
      cart.push(this.data.clothInfo);
    }
    else{
      cart[index].num++;

    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true,

    })
  }
    
})