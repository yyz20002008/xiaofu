// pages/showye/showye.js
import{ request } from "../../request/index.js"

import{formatTime,uuid} from "../../utils/util.js";
import{utc_beijing} from "../../utils/jumpUtils.js";
const app = getApp()

Page({
  data: {
    icode:'',
    curServerDate:'',
    returnSchool:{},
    src_img:"https://user-images.githubusercontent.com/1105915/249616395-3c41e0b7-1ae1-4b9d-8485-8841302df357.png"
  },
  onLoad(){
    //把school付给一个字典
    var that = this
    wx.getStorage({
      key:'school',
      success: function (res) {
        that.setData({
          returnSchool:res.data
        })
      }
    });
  },
  onShow(){
    
  },
  goToSchoolPage: function(e){
    
    let {icode}=this.data;
    console.log(this.data.returnSchool.length)
    let count = this.data.returnSchool.length
    for (let i = 0; i < count; i += 1) { 
      if (this.data.returnSchool[i]['accessCode']==icode){
        wx.setStorageSync('curschool',this.data.returnSchool[i])
        wx.switchTab({url: '../school/index',})
        break
      }
      else{
        wx.showToast({
          title: '邀请码错误',
          icon:'none',
          duration: 2000
        })
      }
      this.setData({
        icode:'',
        backMsg:''
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
  }
  
})