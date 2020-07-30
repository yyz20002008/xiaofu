// pages/showye/showye.js
Page({
  data: {
    icode:''
  },
  goToSchoolPage: function(e){
    if (this.data.icode==123){
  
      wx.switchTab({
      
      url: '../school/index',
      })
    }
    else{
      wx.showToast({
        title: '邀请码错误',
        icon:'none',
        duration: 2000
      })
      this.setData({
        icode:''
      })
    }
  },
  /*获取邀请码*/
  codeInput: function(e){
    this.setData({
      icode: e.detail.value
    })
  },
  clickButton: function(e){
    console.log("邀请码：" + this.data.icode );
  }
})