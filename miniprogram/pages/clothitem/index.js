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
          'https://user-images.githubusercontent.com/1105915/188637669-d107e656-68d5-4f42-825d-727fbe18efe5.jpg',  
          'https://user-images.githubusercontent.com/1105915/188637670-6a894650-c3f0-487f-b34a-9a6a824b6994.jpg',
          'https://user-images.githubusercontent.com/1105915/188637663-6e0f60e0-c780-4dfb-a66a-7e3a913a82fa.jpg',
          'https://user-images.githubusercontent.com/1105915/188638410-9bd41ab2-1ccf-41c8-94ef-eb01536677fa.jpg'
          ]
      },
      { subclass:'2021',subimg:[
          'https://user-images.githubusercontent.com/1105915/188641771-513ed6d6-94aa-4dd6-8f92-eb4f54e7cf63.jpg',
          'https://user-images.githubusercontent.com/1105915/188641772-a00ebbd8-95fe-4973-9c3d-cbe3f4244b7b.jpg',
          'https://user-images.githubusercontent.com/1105915/188641767-a4a2d1fe-0e20-4803-be1e-ce775862cc49.jpg',
          'https://user-images.githubusercontent.com/1105915/188641766-553ad81f-abf0-43fc-b483-fc0e73ba4838.jpg'
        ]
      },
      { subclass:'2020',subimg:[
        'https://user-images.githubusercontent.com/1105915/188643407-dab5fa0b-5aa8-4247-bb98-0930ef661256.jpg',
        'https://user-images.githubusercontent.com/1105915/188643411-9f2bac90-e808-49af-bc04-87293949fde8.jpg',
        'https://user-images.githubusercontent.com/1105915/188643404-e5e9bb16-3c0e-4c12-9773-3df54b322713.jpg',
        'https://user-images.githubusercontent.com/1105915/188643412-2c90d284-374d-4ee7-bb6f-b0b3e5c8d594.jpg'  
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
    interval: 2000,
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
          //swiperCurrent:i
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