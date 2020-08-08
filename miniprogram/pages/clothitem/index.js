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
      {value: 'male',name:'男'},
      {value: 'female',name:'女'}
    ],
    clothInfo:{
      cloth_id: '',
      cloth_name:'',
      cloth_size:'',
      cloth_notes:'',
      cloth_gender:'',
      cloth_price:0,
      num:0,
      checked:false

    },
    
  },
  
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
    console.log(e.detail.value);
    if(e.detail.value=='特体'){
      this.setData({
        showView: true
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
    const{cloth_id}=options;
    //console.log(cloth_id);
    const{cloth_name}=options;
    const{cloth_grade}=options;
    this.setData({
      clothInfo: {
        cloth_id:cloth_id,
        cloth_name:cloth_name,
        cloth_grade:cloth_grade,
        cloth_price:0
      }
    })
    const cur_sch_id=wx.getStorageSync('school')[0]._id;
    console.log(cur_sch_id);
    const testdb = wx.cloud.database({env: 'test-3aahe'});
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

    
  },
  
  onShow: function(f) {
    
  },

  handleCartAdd(){
    let cart=wx.getStorageSync('cart')||[];
    //console.log(this.data.clothInfo);
    let index=cart.findIndex((v)=>v.cloth_id===this.data.clothInfo.cloth_id);
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
    
})