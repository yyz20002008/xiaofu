
/*
Promise形式 getSetting
*/
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      withSubscriptions: true,
      success: (result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
    })
}

/*
Promise形式 chooseAddress
*/
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      withSubscriptions: true,
      success: (result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
    })
}

/*
Promise形式 openSetting
*/
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      withSubscriptions: true,
      success: (result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
    })
}