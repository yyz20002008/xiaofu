// pages/add_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.address)
    console.log(e.index)
    //修改地址的话接传过来的值
    if (e.address != undefined){
      var list = JSON.parse(e.address);
      let index = JSON.parse(e.index);
      //传过来的要修改的地址显示在页面
      this.setData({
        list: list,
        curAddrIndex:index
      })
      //console.log(this.data.curAddrIndex)
    }else{
      console.log("不存在传入值")//新地址
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(this.data.list);
    if (this.data.list != undefined){
      console.log("存在传入值")
      this.setData({
        tag:false//修改地址
      })
    }else{
      console.log("不存在传入值")//新地址
    }
  },
  //保存修改地址
  saveAddr: function(e){
    let  addrList= wx.getStorageSync("addrList")||[];
    if (e.detail.value.student_name == "") {
      wx.showModal({
        title: '提示',
        content: "请填写学生姓名！"
      })
    } else if (e.detail.value.student_class == "") {
      wx.showModal({
        title: '提示',
        content: "请填写学生年级！"
      })
    }
    else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: "请填写收货手机！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (e.detail.value.address == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的详细地址"
      })
    }else {
      
      if(this.data.tag === true){
        var address = e.detail.value;
      
        console.log(address);
        //address = JSON.stringify(address);
        addrList.push(address);
        console.log(addrList); 
        //保存新地址
        wx.showToast({
          title: '新增地址成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          }
        })
        wx.setStorageSync('addrList', addrList);  
      }else{
          var address = e.detail.value;
          console.log("index:"+this.data.curAddrIndex)
            //修改地址
          addrList[this.data.curAddrIndex]=address;
          wx.showToast({
                title: '修改地址成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1500);
                }
          })
          wx.setStorageSync('addrList', addrList);    
        }
    } 
  },
})