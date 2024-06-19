import { MoneyGateway } from 'lg-gateway-utils/index';

import { AID, SECRET, SERVER_URL as BASE_URL } from './const';

console.log('BASE_URL===', BASE_URL);

// 注意script标签引用需通过 lgGatewayUtils.MoneyGateway 来实例化
const service = new MoneyGateway(AID, SECRET, '', BASE_URL, '', fn);

// AID 网关服务 aid （当SIN_METHOD存在时AID 必须传空字符串）
// SECRET 网关密钥，加签需要用到，
// TOKEN_NAME客户端cookie的key值
// BASE_URL 网关服务地址
// ENCRYPT_METHOD data 数据包加密方法 当接口要求加密，此参数必传，默认为空
// fn(res, type) （v1.0.4 新增type类型）
// 当type 为'success' 时 res为响应的数据结构体（response）， 用于根据返回结果处理特殊的逻辑的场景，比如全局特殊reCode状态的弹框提示
// 当 type 为error时， res为报错信息，此处可以用于添加全句请求报错提醒或者异常数据上报的场景
// fn demo
function fn(res, type) {
  if (type === 'success') {
    // 服务器响应成功，若为登录失效，跳转到登录页面
    if (res.data.reCode === '3' || res.data.reCode === '4') {
      console.log('登录失效');
    }
  } else {
    // 调用异常监控方法上报数据
  }
}
// CAID（v1.0.5 新增参数） 组件aid 供组件的网关请求使用，此时组件使用的 AID 和  SECRET 均为组件所在的宿主环境决定
// SIN_METHOD（v1.0.5 新增参数） 网关自定义签名请求结构体，比如使用客户端的签名请求结构体

export default service;
