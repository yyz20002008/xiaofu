// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  traceUser: true,
  //env: 'test-3aahe'
  //env: 'prod-dbtpz'
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    body: event.body, // 商品描述,必填
    details:event.details,//商品详情
    outTradeNo: event.goodsnum, // 商户订单号,必填,不能重复
    spbillCreateIp: '127.0.0.1', // 终端IP，必填
    subMchId: event.subMchId, // 子商户号,微信支付商户号,必填
    totalFee:parseInt(event.payVal), // 总金额,必填
    envId: 'prod-dbtpz', // 结果通知回调云函数环境,你自己小程序的坏境id
    functionName: 'wechatpay', // 结果通知回调云函数名,非必填参数,即使为空,也不影响支付,但是官方文档里写的是必填参数,表示已醉
    nonceStr:event.nonceStr,//第三个坑：官方文档中相关云函数代码没有nonceStr和tradeType，测试的时候会报nonceStr不存在的错，翻看文档才发现这个是必填项，直接粘过来以后还需要加上这两个参数
    //tradeType:'JSAPI'
  });
  return res;
};
