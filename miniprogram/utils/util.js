const formatTime = date => {
  //var time = date==null?"": Date.parse(date.replace(/-/g, '/'));
  console.log("formatTime this :"+date)
  const year = date.getFullYear()
  console.log("date.getFullYear() :"+year)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()


  console.log("final time:"+[year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':'))
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



const uuid=(len, radix) =>{
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  
  if (len) {
  // Compact form
  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
  // rfc4122, version 4 form
  var r;
  
  // rfc4122 requires these characters
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';
  
  // Fill in random data. At i==19 set the high bits of clock sequence as
  // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
      r = 0 | Math.random()*16;
      uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('').toString();
}


  /**
     ** 乘法函数，用来得到精确的乘法结果
     ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     ** 调用：accMul(arg1,arg2)
     ** 返回值：arg1乘以 arg2的精确结果
     **/
    const accMul=(arg1, arg2) =>{
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    /**
     ** 加法函数，用来得到精确的加法结果
     ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     ** 调用：accAdd(arg1,arg2)
     ** 返回值：arg1加上arg2的精确结果
     **/
    const accAdd=(arg1, arg2)=>{
      var r1, r2, m, c;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      c = Math.abs(r1 - r2);
      m = Math.pow(10, Math.max(r1, r2));
      if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
          arg1 = Number(arg1.toString().replace(".", ""));
          arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
          arg1 = Number(arg1.toString().replace(".", "")) * cm;
          arg2 = Number(arg2.toString().replace(".", ""));
        }
      } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
      }
      return (arg1 + arg2) / m;
    }

module.exports = {
  formatTime: formatTime,
  uuid:uuid,
  accMul:accMul,
  accAdd:accAdd
}