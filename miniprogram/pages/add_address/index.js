// pages/add_address/index.js

var chinaData=require('../../utils/beijingcity_qu_jiedao.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: true,
    multiArray: [],
    multiIndex: [0, 5, 0],
    chinaData: [],
    //date: '2016-09-01',
    //time: '12:01',
    region: []
    //customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    //console.log(chinaData)
    //console.log(e.address)
    //console.log(e.index)
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
    this.getSiteData();
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
        this.setData({
          "region[0]":this.data.multiArray[0][this.data.multiIndex[0]],
          "region[1]":this.data.multiArray[1][this.data.multiIndex[1]],
          "region[2]":this.data.multiArray[2][this.data.multiIndex[2]]
        })
        address['region']=this.data.region;
        console.log(address);
        //address = JSON.stringify(address);
        addrList.push(address);
        //console.log(addrList); 
        //保存新地址
        wx.showToast({
          title: '新增地址成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
          }
        })
        wx.setStorageSync('addrList', addrList);  
      }else{
          var address = e.detail.value;
          this.setData({
            "region[0]":this.data.multiArray[0][this.data.multiIndex[0]],
            "region[1]":this.data.multiArray[1][this.data.multiIndex[1]],
            "region[2]":this.data.multiArray[2][this.data.multiIndex[2]]
          })
          address['region']=this.data.region;
          console.log(address);
          console.log("index:"+this.data.curAddrIndex)
            //修改地址
          addrList[this.data.curAddrIndex]=address;
          wx.showToast({
                title: '修改地址成功',
                icon: 'success',
                duration: 1000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000);
                }
          })
          wx.setStorageSync('addrList', addrList);    
        }
      this.setData({
        list:addrList
      })
    } 
  },
  //地址联动相关
  bindMultiPickerChange: function(e) {
    console.log(
      "pickerchange:"+e.detail.value
    );
    this.setData({
      "region[0]":this.data.multiArray[0][e.detail.value[0]],
      "region[1]":this.data.multiArray[1][e.detail.value[1]],
      "region[2]":this.data.multiArray[2][e.detail.value[2]]
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log(
      e.detail.value
    );
    var move = e.detail;
    var index = move.column;
   // console.log("index:"+index);
    var value = move.value;
    //console.log("value:"+value);
    if (index == 0) {
      this.setData({
        multiIndex: [value,0,0]
      })
      this.getCity();
    }
    if (index == 1) {
      this.setData({
        "multiIndex[1]": value,
        "multiIndex[2]": 0
      })
      this.getXian();
    }
    if (index == 2) {
      this.setData({
        "multiIndex[2]": value
      })
      this.getZhen();
    }
    
  },
  getSiteData: function() {
    var that = this;
    //get 地址联动数据 云函数
    /*  wx.cloud .callFunction({name: 'getChinaData'}).then((res) => { 
        //console.log("地址联动数据",res.result.data[0]);
        var chinaData = res.result.data[0]["北京市"];
        this.data.chinaData = chinaData;
        var sheng = []; //  设置省数组
        sheng.push("北京市");
        //console.log(sheng)
        this.setData({
          "multiArray[0]": sheng
        })
        that.getCity(); // 得到市
      })
      .catch((err) => {
        console.error(err);
      });*/
      console.log(chinaData.beijing);
        this.data.chinaData = chinaData.beijing;
        var sheng = []; //  设置省数组
        for(var i = 0; i <  this.data.chinaData.length; i++) {
          sheng.push(this.data.chinaData[i].name);
        }
        //console.log(sheng);
        this.setData({
          "multiArray[0]": sheng
        })
      that.getCity(); // 得到市

  },
  getCity: function() { //  得到市
   /* var shengNum = this.data.multiIndex[0];
    var chinaData = this.data.chinaData;
    var cityData = chinaData[shengNum].children;
    var city = [];
    for (var i = 0; i < cityData.length; i++) {
      city.push(cityData[i].name)
    }
    this.setData({
      "multiArray[1]": city
    })
    console.log(city)*/
    this.getXian();
  },
  getXian: function(e) { //  得到县
    var shengNum = this.data.multiIndex[0];
    //var cityNum = this.data.multiIndex[1];
    var chinaData = this.data.chinaData;
    var xianData = chinaData[shengNum].children[0].children;
    var xian = [];
    for (var i = 0; i < xianData.length; i++) {
      xian.push(xianData[i].name)
    }
    this.setData({
      "multiArray[1]": xian
    })
    this.getZhen();
  },
  getZhen: function() { //  得到镇
    var shengNum = this.data.multiIndex[0];
    //var cityNum = this.data.multiIndex[1];
    var xianNum = this.data.multiIndex[1];
    var chinaData = this.data.chinaData;
    var zhenData = chinaData[shengNum].children[0].children[xianNum].children;
    var zhen = [];
    for (var i = 0; i < zhenData.length; i++) {
      zhen.push(zhenData[i].name)
    }
    this.setData({
      "multiArray[2]" : zhen
    })

  }

})