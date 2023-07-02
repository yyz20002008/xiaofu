// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ 
  traceUser: true,
  env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

//操作excel用的类库
const xlsx = require('node-xlsx');


// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {userdata} = event

    //1,定义excel表格名
    let curDate = new Date()

    let dataCVS = 'xiaofu101_daxing_list_'+curDate.toISOString()+'.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['status','receiver']; //表属性
    //_id , 'phone','region','orderDate','cloth_id','cloth_notes','num','cloth_price','status','totalPrice'
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key].status);
      arr.push(userdata[key]['address'].receiver);
      //arr.push(userdata[key]['address'].phone);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
      
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
