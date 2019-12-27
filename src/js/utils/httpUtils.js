import axios from 'axios'
import RQLBuilder from './rqlbuilder.js'
let service = axios.create({
  timeout: 20000 // 请求超时时间
})

service.defaults.withCredentials = false
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
service.defaults.timeout = 20000

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  }, error => {
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    const data = response.data
    return data
  }, error => {
    console.error('response', error.toString())
    return Promise.reject(error)
  })

export class KycService {
  static loginToken (this_, data) {
    service.defaults.baseURL = this_.$store.state.user.kycUrl
    service.defaults.headers.common['X-Auth-Token'] = ''
    let datasend = {trx: JSON.stringify(data)}
    return service.post('/user/newLogin', datasend).then(res => {
      if (res && res.success === true) {
        service.defaults.headers.common['X-Auth-Token'] = res.retObj.token
        return res
      } else {
        return res
      }
    }).catch(error => {
      console.log(error)
      return error
    })
  }
  static async httpGet (this_, url) {
    service.defaults.baseURL = this_.$store.state.user.kycUrl
    service.defaults.headers.common['X-Auth-Token'] = this_.$store.state.user.kycToken
    return new Promise((resolve, reject) => {
      service.get(url).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  static async httpGetWait (this_, url) {
    service.defaults.baseURL = this_.$store.state.user.kycUrl
    service.defaults.headers.common['X-Auth-Token'] = this_.$store.state.user.kycToken
    let ret = await service.get(url)
    return ret
  }
  static httpPost (this_, url, param) {
    service.defaults.baseURL = this_.$store.state.user.kycUrl
    service.defaults.headers.common['X-Auth-Token'] = this_.$store.state.user.kycToken
    return new Promise((resolve, reject) => {
      service.post(url, param).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  static async httpPostWait (this_, url, param) {
    service.defaults.baseURL = this_.$store.state.user.kycUrl
    service.defaults.headers.common['X-Auth-Token'] = this_.$store.state.user.kycToken
    let ret = await service.post(url, param)
    return ret
  }
  static setKycItemAudit (this_, id, result, remark, data) {
    let datasend = {
      id: id,
      result: result,
      remark: remark,
      trx: JSON.stringify(data)
    }
    return KycService.httpPost(this_, '/mntaskkyc/newAudit', datasend)
  }
  static getCountry (this_) {
    // let sql = RQLBuilder.equal('STATUS', 1)
    // return KycService.httpGetWait(this_, '/mnbasiccountry/?query=' + RQLBuilder.rql(sql))
    let language = 'en'
    if (this_.$store.state.lang === '1') language = 'cn'
    let parm = {language: language, authorid: this_.$store.state.userDataSid}
    return KycService.httpPostWait(this_, '/country', parm)
  }
  static getFilePath (this_) {
    let sql = RQLBuilder.equal('PARAMETER_CODE', 'uc.img.url')
    return KycService.httpGetWait(this_, '/mnsysparameter/?query=' + RQLBuilder.rql(sql))
  }
  static getStatus (this_) {
    return KycService.httpGetWait(this_, '/enumctrl/4s/TaskKYCEnum')
  }
  static getKycTasks (this_, name, chainnanme, status, country, fileds, skip, limit) {
    let sql = ''
    let query = []
    if (name !== '') query.push(RQLBuilder.like('name', name))
    if (chainnanme !== '') query.push(RQLBuilder.like('chainId', chainnanme))
    if (status !== '') query.push(RQLBuilder.equal('status', status))
    if (country !== '') query.push(RQLBuilder.equal('nationality', country))
    if (query.length > 0) {
      // console.log(RQLBuilder.and(query))
      sql = 'query=' + RQLBuilder.rql(RQLBuilder.and(query))
    }
    let fsql = ''
    if (fileds.length > 0) {
      fileds.push('id')
      fileds.push('_id')
      fileds.push('userId')
      fileds.push('authorId')
      fsql = '{'
      let index = 1
      fileds.forEach(element => {
        fsql += '"' + element + '":1'
        if (index !== fileds.length) fsql += ','
        index++
      })
      fsql += '}'
      fsql = '&fields=' + encodeURIComponent(fsql)
    }
    let lsql = '&limit=' + limit + '&skip=' + skip + '&sort=-createTime&page=true'
    return KycService.httpGet(this_, '/mntaskkyc/?' + sql + fsql + lsql)
  }
  static getKycFile (this_, id) {
    let sql = 'query=' + RQLBuilder.rql(RQLBuilder.equal('BELONG', id)) + '&sort=sequence'
    return KycService.httpGet(this_, '/mnfile/?' + sql)
  }
  static getKycIcnumber (this_, icnumber) {
    let sql = 'query=' + RQLBuilder.rql(RQLBuilder.and([RQLBuilder.equal('ICNUMBER', icnumber)])) + '&sort=-createTime'
    return KycService.httpGet(this_, '/mntaskkyc/?' + sql)
  }
  static getKycItem (this_, id) {
    return KycService.httpGet(this_, '/mntaskkyc/' + id)
  }
  static kycUserUpdate (this_, email, mobile) {
    let data = {
      email: email,
      mobile: mobile
    }
    return KycService.httpPost(this_, '/fcsysuser/update/', data)
  }
}
export class GatewayService {
  static loginToken (data) {
    // service.defaults.baseURL = gatewayurl
    // gatewaytoken = service.post('/user/login', data)
    // return gatewaytoken
  }
}
