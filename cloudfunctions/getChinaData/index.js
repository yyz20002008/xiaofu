// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  //env: 'test-3aahe'
  //env: 'prod-dbtpz'
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const res =db.collection("chinaData").doc('3ad8d6305f3b22c2007d8daf7305fda6').where({
    "北京市": _.exists(true)
  }).get()
  return res;
}