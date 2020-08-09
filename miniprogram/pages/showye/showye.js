// pages/showye/showye.js
import{ request } from "../../request/index.js"
Page({
  data: {
    icode:''
  },
  goToSchoolPage: function(e){
    let {icode}=this.data;
    //console.log({icode});
    const testdb = wx.cloud.database({env: 'test-3aahe'});
    const _ = testdb.command
    testdb.collection('school').where({
      // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
      accessCode: _.eq(parseInt(this.data.icode))
    })
    .get({
      success: function(res) {
        //console.log(res.data)
        wx.setStorageSync('school', res.data)
      }
    })

    if (icode==1946320){ 
      wx.switchTab({url: '../school/index',})
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
    //wx.setStorageSync('icode', this.data.icode)
  },
  /*获取邀请码*/
  codeInput: function(e){
    this.setData({
      icode: e.detail.value
    })
  },
  clickButton: function(e){
    console.log("邀请码：" + this.data.icode );
  },
  onShow(){
    
  }
})