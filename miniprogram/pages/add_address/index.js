// pages/add_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: true,
/*     list:{
      student_name:'',
      student_class:'',
      receiver:'',
      phone:'',
      address:''
    } */

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.address)
    if (e.address != undefined){
      var list = JSON.parse(e.address);
      this.setData({
        list: list,
        address: list.address,
        address_id: list.address_id
      })
    }else{
      console.log("不存在传入值")
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
        tag:false
      })
    }
  },
  //保存修改地址
  saveAddr: function(e){
    var  addrList= wx.getStorageSync("addrList")||[];
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
      console.log(e.detail.value);
      
      if(this.data.tag === true){
        var address = e.detail.value
        //address = JSON.stringify(address);
        addrList.push(address);
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
        var address = e.detail.value
        let index=addrList.findIndex((v)=>(v.address)===(e.detail.value.address));
        if(index===-1){
          //修改地址
          addrList[index]=address;
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
    } 
  },
  //删除该地址
  delete: function(e){
    var vm = this;
    console.log(vm.data.address_id)
    tools.request(app.globalData.url + "/info/DeleteAddress", 'post', { 'address_id': vm.data.address_id})
      .then(resp => {
        console.log("删除地址成功", resp)
        wx.showToast({
          title: '删除地址成功',
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
      })
  }
})