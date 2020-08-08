// pages/auth/index.js

import{login } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  //获取用户信息
  async handleGetUserInfo(e){
    //console.log(e);
    //用户信息
    const {encryptedData,errMsg,iv,signature}=e.detail;
    //获取小程序登陆成功后的code
    const code=await login();
    //发送请求 获取token
    console.log(code);

  }

})