import http from './public'
import { setLocalStore, getLocalStore } from '/js-utils/storage'

// 获取验证码
export const getSmsCode = (url, params) => {
  return http.fetchPost(url + '/zos-kyc/sms/captcha', params)
}
export const checkSmsCode = (url, params) => {
  return http.fetchPost(url + '/zos-kyc/sms/checkcaptcha', params)
}
// 获取网关配置
// 获取网关配置
export const getGatewayConfig = (cache) => {
  if (cache) {
    var readCfg = JSON.parse(getLocalStore('GatewayConfig'))
    return Promise.resolve(readCfg)
  } else {
    var getCfg = http.fetchGet('../../../static/config.json', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    getCfg.then(res => {
      setLocalStore('GatewayConfig', res)
    })
    return getCfg
  }
}
export const getHtml = (url) => {
  return http.fetchGet(url)
}
// 充提记录列表
export const orderRecordList = (url, params) => {
  return http.fetchPost(url + '/orderrecord/list', params)
}
// // 获取KYC列表
// export const getLsit = (url, params) => {
//   return http.fetchPost(url + '/uc-admin-srv/mntaskkyc', params)
// }
