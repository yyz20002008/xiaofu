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
      "https://user-images.githubusercontent.com/1105915/89417449-b2515a00-d6fc-11ea-9049-767ceecc82d0.jpg",
      "https://user-images.githubusercontent.com/1105915/89417448-b2515a00-d6fc-11ea-8327-75d8722438c6.jpg"
    ],
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
      num:0,
      checked:false

    },
    cart_num:0,
    
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
          'clothInfo.cloth_name': gsize[i].cloth_name 
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
    this.setData({
      clothInfo: {
        cloth_id:cloth_id,
        cloth_grade:cloth_grade,
        cloth_price:0,
        cloth_title:cloth_title,
        cloth_notes:''
      },
      
    })
    const cur_sch_id=wx.getStorageSync('school')[0]._id;
    console.log(cur_sch_id);
    const testdb = wx.cloud.database({env: 'prod-dbtpz'});
    const _ = testdb.command
    testdb.collection('cloth').where({
      school_id:parseInt(cur_sch_id),
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('clothitem',res.data)
      }
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
    
  },
  
  onShow: function(f) {
    console.log('onShow');
    this.scanCart(this);
  },

  handleCartAdd(){
    let cart=wx.getStorageSync('cart')||[];
    //console.log(this.data.clothInfo);
    let cloth_long_id=this.data.clothInfo.cloth_title
                      +this.data.clothInfo.cloth_name
                      +this.data.clothInfo.cloth_gender
                      +this.data.clothInfo.cloth_size;
    this.setData({
      'clothInfo.cloth_id':cloth_long_id
    })
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