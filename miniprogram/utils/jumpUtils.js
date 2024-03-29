//utc时间转北京时间
import{formatTime,uuid} from "../utils/util.js";
const utc_beijing = utc_datetime =>{
  
  // 转为正常的时间格式 年-月-日 时:分:秒
  console.log('utc_beijing 中 utc_datetime：'+utc_datetime)
  //utc_datetime=utc_datetime.replace(/-/g, '/')
  //console.log('utc_beijing 中 utc_datetime：'+utc_datetime)
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0, T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06
  console.log('utc_beijing 中 new_datetime：'+new_datetime)
  console.log('utc_beijing 中 new_datetime after replace：'+new_datetime.replace(/-/g, '/'))
  console.log('utc_beijing 中 new_datetime Date.parse：'+Date.parse(new_datetime.replace(/-/g, '/')) )
  //console.log('utc_beijing 中 new_datetime before replace Date.parse：'+Date.parse(new_datetime.replace(/-/g, '/')) )
  
  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime.replace(/-/g, '/')));
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;
  // 增加8个小时，北京时间比utc时间多八个时区
  console.log('cur timestamp is : '+ timestamp)

  var timestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
  
 // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  var beijing_datetime = new Date(parseInt(timestamp) * 1000)
  
  console.log('utc_beijing 中 beijing_datetime：'+beijing_datetime)
  return beijing_datetime; // 2017-03-31 16:02:06
} 

module.exports = {
  utc_beijing: utc_beijing
}