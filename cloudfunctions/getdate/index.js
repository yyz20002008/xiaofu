// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ 
  traceUser: true,
  env: 'test-3aahe'
  
})
// 云函数入口函数
exports.main = async (event, context) => {
  return new Date()
}