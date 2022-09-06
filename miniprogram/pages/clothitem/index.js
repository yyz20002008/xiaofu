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
    showView:false,
    cloth_img:[
      { subclass:'2022',subimg:[
          'https://user-images.githubusercontent.com/1105915/188358226-6fc7b408-5f50-46e8-838d-46ad157267a7.jpg',  
          'https://user-images.githubusercontent.com/1105915/188486763-f0486c7c-106e-4d56-915d-8c6c214e72f9.jpg',
          'https://user-images.githubusercontent.com/1105915/188486765-3182fb63-f43c-4eb0-ad96-110eadcd4a98.jpg',
          'https://user-images.githubusercontent.com/1105915/188486755-b9398676-f54c-4688-a69f-c9db16b97f78.jpg',
          'https://user-images.githubusercontent.com/1105915/188486978-2f7c7f7c-5ed1-4423-9933-d0204557e24f.jpg',
          'https://user-images.githubusercontent.com/1105915/188486757-9c6b5cfd-b7f5-4a82-9395-2e9bf9f674aa.jpg'
          ]
      },
      { subclass:'2021',subimg:[
          'https://user-images.githubusercontent.com/1105915/188358297-cb93f82c-cd51-42d7-a34a-15cbe9be52b5.jpg',
          'https://user-images.githubusercontent.com/1105915/188487795-ca2565bc-3086-4cc0-b9b1-ca460d2ee0ae.jpg', 
          'https://user-images.githubusercontent.com/1105915/188487791-1a7012d4-bdf9-4f22-9b18-e35a3712478d.jpg',
          'https://user-images.githubusercontent.com/1105915/188487798-83b11b20-38cb-4c3a-b888-6dcdc8eada01.jpg',
          'https://user-images.githubusercontent.com/1105915/188487788-3040a3f7-8cc7-42d7-8daf-943ceee847e2.jpg',
          'https://user-images.githubusercontent.com/1105915/188486978-2f7c7f7c-5ed1-4423-9933-d0204557e24f.jpg'
          ]
      },
      { subclass:'2020',subimg:[
      'https://user-images.githubusercontent.com/1105915/188358226-6fc7b408-5f50-46e8-838d-46ad157267a7.jpg',
      'https://user-images.githubusercontent.com/1105915/188542194-127ab24c-ddd0-4a8a-b94f-b2f6d27f3a21.jpg',
      'https://user-images.githubusercontent.com/1105915/188542252-c64562d2-fbfc-4d64-9857-561614ed28a7.jpg',
      'https://user-images.githubusercontent.com/1105915/188542192-c11a459b-76d3-4d32-b2ca-946d80f9fb1d.jpg',
      'https://user-images.githubusercontent.com/1105915/188542190-2efc179f-33ac-40f6-a0a6-f64cb7b296e5.jpg' 
      ]
      }
    ],
    cur_level_img:[],
    cloth_item_cur:[],
    size: [
      {value: 'S-1', name: 'S-1'},
      {value: 'S', name: 'S'},
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
      {value: '男',name:'男'},
      {value: '女',name:'女'}
    ],
    clothInfo:{
      cloth_title:'',
      cloth_id: '',
      cloth_name:'',
      cloth_size:'',
      cloth_notes:'',
      cloth_gender:'',
      cloth_price:0,
      cloth_class:'',
      num:0,
      checked:false
     

    },
    cart_num:0,
    curServerDate:'',
    swiperCurrent:0,
    autoplay: true,
  },
  //轮播图
  swiperChange(e){
    //目前播放的图片index
    //console.log(e.detail.current);
  },
  //选择size
  radioChange(e){
    const size = this.data.size;
    for (let i = 0; i < size.length; ++i) {
      size[i].checked = size[i].value == e.detail.value
      if (size[i].checked ==true){
        this.setData({
          'clothInfo.cloth_size': size[i].value
          
        })
      } 
    }
    //console.log(e.detail.value);
    //特体显示inputtext
    if(e.detail.value=='特体'){
      this.setData({
        showView: true,
      });
    }
    else{
      this.setData({
        showView: false
      });
    }
    this.setData({
      size: size
    });
  },
  //输入notes bindinput
  bindinput(e){
    console.log(e.detail.value);
      this.setData({
        'clothInfo.cloth_notes': e.detail.value
      })
  
    
  },
  radioChangeGender(f) {
    //console.log('radio发生changeGender事件，携带value值为：', f.detail.value)
    const gsize = this.data.gender;
    for (let i = 0, len = gsize.length; i < len; ++i) {
      gsize[i].checked = gsize[i].value == f.detail.value
      if (gsize[i].checked ==true){
        this.setData({
          'clothInfo.cloth_gender': gsize[i].value 
        })
      } 
    }
    this.setData({
      gender:gsize
    })
  },
  radioChange_cloth(f) {
    const gsize = this.data.cloth_item_cur;
    //console.log(gsize);
    for (let i = 0, len = gsize.length; i < len; ++i) {
      gsize[i].checked = (gsize[i].cloth_name == f.detail.value)
      if (gsize[i].checked ==true){
        this.setData({
          'clothInfo.cloth_price': gsize[i].cloth_price, 
          'clothInfo.cloth_name': gsize[i].cloth_name ,
         // swiperCurrent:i
        })
      } 
      else{
        this.setData({
          swiperCurrent:0
        })
      }
    }
    this.setData({
      cloth_item_cur:gsize
    })
  },
    //options(Object)
  onLoad: function(options) {
    console.log('onLoad');
    const{cloth_id}=options;
    //console.log(cloth_id);
    const{cloth_title}=options;
    const{cloth_grade}=options;
    const{cloth_class}=options;
    this.setData({
      clothInfo: {
        cloth_id:cloth_id,
        cloth_grade:cloth_grade,
        cloth_price:0,
        cloth_title:cloth_title,
        cloth_notes:'',
        cloth_class:cloth_class
      },
    })
    
    const tempitem=wx.getStorageSync('clothitem');
    let temp=[];
    for(let i=0;i<tempitem.length;++i){
      //console.log(tempitem[i].clothitem)
      if(tempitem[i].grade==cloth_grade){
        this.setData({
          cloth_item_cur:tempitem[i].cloth_item
        })
        break;
      }
    } 
    this.scanCart(this);
    this.setData({ curServerDate: wx.getStorageSync('serverDate')})
    console.log(this.data.curServerDate)
    for(let i=0;i<this.data.cloth_img.length;++i){
      if (this.data.cloth_img[i].subclass == this.data.clothInfo.cloth_class){
        this.setData({
          cur_level_img:this.data.cloth_img[i].subimg
        })
      }
    }
  },
  
  onShow: function(f) {
    console.log('onShow');
    this.scanCart(this);
    
  },

  handleCartAdd(e){
    
    if(this.data.clothInfo.cloth_name==undefined)
    {  wx.showModal({ title: '提示',content: "请选择类别！"})
    }
    else if (this.data.clothInfo.cloth_size==undefined){
      wx.showModal({title: '提示', content: "请选择尺码！"})
    }
    else if (this.data.clothInfo.cloth_size=='特体'&&this.data.clothInfo.cloth_notes==''){
      wx.showModal({title: '提示',content: "特体请填写信息！" })
    }
    else if (this.data.clothInfo.cloth_gender==undefined){
      wx.showModal({title: '提示',content: "请选择性别！" })
    }
    else{
      let cloth_long_id=this.data.clothInfo.cloth_title
                      +this.data.clothInfo.cloth_name
                      +this.data.clothInfo.cloth_gender
                      +this.data.clothInfo.cloth_size;
      this.setData({
        'clothInfo.cloth_id':cloth_long_id
      })
      let cart=wx.getStorageSync('cart')||[];
      let index=cart.findIndex((v)=>(v.cloth_id)===(this.data.clothInfo.cloth_id));
      console.log(cart);
      if (index===-1){
        this.data.clothInfo.num=1;
        this.data.clothInfo.checked=true;
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
    //更新cartDot
    this.scanCart(this);
  },
  scanCart: function (that) {
    //我把购物车里面的数据都塞到了缓存里，取名cart,任何一项修改购物车的行为，都会先取购物车的缓存，在重新更新缓存里的购物车参数
      var cart = wx.getStorageSync("cart");
      //统计购物车商品的总数量
      var cartnumber = 0; //购物车菜品的一共的数量      
      for (var index in cart) {
          cartnumber += cart[index].num
      }
      if (cart.length) {   //判断购物车的数量个数，购物车如果为空就走else
        this.setData({
          cart_num:cartnumber				//通过编译，将购物车总数量放到这里
        })
      } else {//购物车为空
        this.setData({
          cart_num:0				
        })
      }
    }
})