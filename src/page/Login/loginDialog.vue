<template>
  <el-dialog
    :title="$t('m.Frame.login')"
    :visible.sync="visible"
    width="30%"
    @close="close"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :modal="false"
    :append-to-body="isAppend"
  >
    <div v-loading.fullscreen.lock="mainloading" :element-loading-text="$t('m.Frame.loading')" style="min-height: 220px">
      <div class="login v2">
        <div class="wrapper">
          <div class="dialog dialog-shadow">
            <div v-if="loginPage" class="content">
              <ul class="common-form">
                <li class="margin-b20">
                  <div >{{membership}} </div>
                  <div class="input">
                    <input type="text" v-model="ruleForm.userName"
                           @keyup="ruleForm.userName = ruleForm.userName.replace(/[^\w\.\-\/]/ig,'');onNameChange()"
                           :placeholder="$t('m.Frame.userplaceholder')">
                  </div>
                </li>
                <li class="margin-b40">
                  <div class="input">
                    <input type="password" v-model="ruleForm.userPwd" autocomplete="off" @keyup.enter="login" :placeholder="$t('m.Frame.Passplaceholder')">
                  </div>
                </li>


              </ul>
              <!--登陆-->
              <div style="margin-top: 25px; display: flex; flex-direction: column">
                <y-button :text="$t('m.Frame.login')"
                          :classStyle="isDisabled?'main-btn':'disabled-btn'"
                          @btnClick="mainloading = true;login()"
                          style="flex:1"
                ></y-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import YButton from '/path-components/element/YButton'
  import {ZOSInstance} from 'zos-wallet-js'
  import {Apis} from 'zosjs-ws'
  import { ChainStore, FetchChain } from 'zosjs/es'
  import {setStore, setLocalStore, getLocalStore} from '/js-utils/storage'
  import { cleanUser } from '/js-utils/until'
  import {KycService} from '/js-utils/httpUtils'
  export default {
    props: {
      visible: {
        type: Boolean,
        defalut: true
      },
      isAppend: {
        type: Boolean,
        defalut: false
      }
    },
    data () {
      return {
        loginPage: true,
        ruleForm: {
          userName: '',
          userPwd: '',
          errMsg: ''
        },
        registered: {
          userName: '',
          userPwd: '',
          userPwd2: '',
          errMsg: ''
        },
        autoLogin: false,
        logintxt: this.$t('m.Frame.login'),
        validName: false,
        membership: '',
        userID: '',
        isvisible: false,
        timename: undefined,
        mainloading: true
      }
    },
    computed: {
      count () {
        return this.$store.state.login
      },
      isDisabled () {
        return this.ruleForm.userPwd && this.ruleForm.userName && this.validName
      }
    },
    watch: {
      visible: {
        handler: function (val, oldVal) {
          this.isvisible = val
          if (val === false) {
            this.ruleForm.userPwd = ''
            // this.ruleForm.userName = ''
            this.mainloading = false
          } else {
            if (this.$store.state.connectionStatus === 'closed' || this.$store.state.connectionStatus === 'error') {
              this.validName = false
              this.membership = this.$t('m.page.connection')
            } else {
              if (this.ruleForm.userName !== null) this.onNameChange()
            }
          }
        },
        deep: true
      }
    },
    methods: {
      // 关闭dialog
      close () {
        this.$emit('bitlenderLendOrder', false)
        this.$store.state.loginPath = undefined
      },
      isLifetimeMember (expirationDate) {
        return expirationDate === '1969-12-31T23:59:59'
      },
      isBasicMember (expirationDate) {
        return (
          new Date(expirationDate).getTime() >
          new Date('1969-12-31T23:59:59').getTime()
        )
      },
      getMemberShip (account) {
        let membership = 'basic'
        let membershipExpirationDate = account.membership_expiration_date
        if (membershipExpirationDate) {
          if (this.isLifetimeMember(membershipExpirationDate)) {
            membership = 'lifetime'
          } else if (!this.isBasicMember(membershipExpirationDate)) {
            membership = 'annual'
          }
        }
        return membership
      },
      onNameChange () {
        if (this.$store.state.connectionStatus === 'closed' || this.$store.state.connectionStatus === 'error' || Apis.instance().db_api() === undefined) {
          this.validName = false
          this.membership = this.$t('m.page.connection')
        } else if (this.ruleForm.userName === undefined || this.ruleForm.userName.length <= 0) {
          this.validName = false
          this.membership = this.$t('m.member.accountName')
        } else {
          this.ruleForm.userName = this.ruleForm.userName.trim()
          this.validName = false
          this.membership = this.$t('m.member.no')
          Apis.instance().db_api().exec('get_account_by_name', [this.ruleForm.userName]).then((account) => {
            if (account) {
              this.userID = account.id
              this.validName = true
              this.membership = this.$t('m.member.' + this.getMemberShip(account))
              FetchChain('getAccount', this.userID, 5000)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      open (t, m) {
        this.$notify.info({
          title: t,
          message: m
        })
      },
      messageSuccess () {
        this.$message({
          message: this.$t('m.register.regSuc'),
          type: 'success'
        })
      },
      messageSuccessLogin () {
        this.$message({
          message: this.$t('m.register.loginSuc'),
          type: 'success'
        })
      },
      message (m) {
        this.$message.error({
          message: m
        })
      },
      connectWait () {
        if (Apis.instance().db_api() !== undefined) {
          clearInterval(this.timename)
          this.timename = undefined
          this.onNameChange()
        }
      },
      connectSucess (data) {
        if (this.isvisible !== true) return
        if (this.ruleForm.userName !== null && data === 'connect') {
          this.timename = setInterval(this.connectWait, 3000)
        }
        if (data !== 'connect') {
          this.validName = false
          this.membership = this.$t('m.page.connection')
        }
      },
      login () {
        this.logintxt = this.$t('m.Frame.login')
        if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
          this.ruleForm.errMsg = this.$t('m.register.nameNull')
          this.mainloading = false
          return false
        }
        this.ruleForm.userName = this.ruleForm.userName.trim()
        this.ruleForm.userPwd = this.ruleForm.userPwd.trim()
        FetchChain('getAccount', this.userID, 5000)
        let userId = ZOSInstance.accountLogin(this.ruleForm.userName, this.ruleForm.userPwd)
        cleanUser(this.$store)
        if (userId) {
          this.$store.state.userDataSid = undefined
          this.$store.state.userName = this.ruleForm.userName
          this.$store.state.login = true
          setStore('userName', this.ruleForm.userName)
          setLocalStore('userNameLast', this.ruleForm.userName)
          ChainStore.getAccount(this.$store.state.userName, true)
          setStore('userId', userId)
          ChainStore.setLoginAccount(userId)
          this.$store.state.userDataSid = userId
          ChainStore.notifySubscribers()
          this.$emit('bitlenderLendOrder', true)
          this.visible = false
          if (this.$store.state.loginPath === undefined || this.$store.state.loginPath.path === '/login' || this.$store.state.loginPath.path === '/register') {
            this.$router.push({path: '/'})
          } else {
            this.$router.push(this.$store.state.loginPath)
          }
          this.$store.state.loginPath = undefined
          ZOSInstance.get_user_phoneinfo(this.$store.state.userDataSid).then(res => {
            if (res !== undefined) {
              this.$store.state.userInfo.phone = res.mobile
              this.$store.state.userInfo.mail = res.mail
            }
          })
          this.initToken()
        } else {
          // '账号或者密码错误!'
          this.$message(this.$t('m.register.nameErr'))
          this.mainloading = false
        }
      },
      initToken () {
        let _this = this
        FetchChain('getAccount', this.userID, 5000).then(res => {
          let property = res.get('uaccount_property')
          if (property & 0x02000000) this.$store.state.user.isKycUser = true
          if (property & 0x00000001) this.$store.state.user.isGatewayUser = true
          if (property & 0x00000002) this.$store.state.user.isCarrierUser = true
          Apis.instance().db_api().exec('get_author_by_account', [this.userID]).then(res => {
            if (res) {
              this.$store.state.user.kycUrl = ZOSInstance.ReplaceAddress(res.url) + '/zos-kyc'
              if (this.$store.state.user.testKycurl) this.$store.state.user.kycUrl = this.$store.state.user.testKycurl
              this.initKycToken()
            } else {
              console.log('no author info')
              this.$store.state.user.isKycUser = false
            }
          }).catch(error => {
            _this.$store.state.user.isKycUser = false
            console.log(error)
            _this.$message({
              message: 'err author info' + error.to_string(),
              type: 'error'
            })
          })
        })
      },
      initKycToken () {
        let _this = this
        if (this.$store.state.user.isKycUser) {
          let data = {uid: this.$store.state.userDataSid, loginname: this.$store.state.userName, loginType: 'u'}
          ZOSInstance.signTrx(this.$store.state.userDataSid, data).then(res => {
            KycService.loginToken(this, res).then(kyc => {
              if ((kyc.retObj.dataEnviron & 0x01) <= 0) {
                console.log('kyc.retObj.dataEnviron', kyc.retObj.dataEnviron)
                this.$store.state.user.isKycUser = false
              }
              let role = false
              kyc.retObj.rolesName.forEach(item => {
                if (item === 'uca' || item === 'auther') role = true
              })
              if (!role) {
                console.log('kyc.retObj.rolesName', kyc.retObj.rolesName)
                this.$store.state.user.isKycUser = false
              }
              if (this.$store.state.user.isKycUser) {
                this.$store.state.user.kycToken = kyc.retObj.token
              } else {
                console.log('no kyc user')
                return
              }
              KycService.getCountry(this).then(rec => {
                // this.$store.state.user.kycCountry = rec
                this.$store.dispatch('getCountrySync', rec)
                console.log('getCountry', this.$store.state.user.kycCountry)
              }).catch(error => {
                _this.$store.state.user.isKycUser = false
                console.log('country', error)
                _this.$message({
                  message: 'err country info',
                  type: 'error'
                })
              })
              KycService.getStatus(this).then(rec => {
                console.log('getStatus', rec)
                // this.$store.state.user.kycStatus = rec
                this.$store.dispatch('getStatusSync', rec)
                sessionStorage.setItem('kycStatus', JSON.stringify(rec))
              }).catch(error => {
                console.log(error)
              })
              KycService.getFilePath(this).then(rec => {
                console.log('getFilePath', rec)
                this.$store.state.user.kycImagePath = rec[0].parameterValue
              }).catch(error => {
                console.log(error)
              })
              // // let fileds = ['chainId', 'icnumber', 'name']
              // let fileds = []
              // KycService.getKycTasks(this, '', '', '', 'CN', fileds, 0, 100).then(rec => {
              //   console.log('getKycTasks', rec)
              //   this.$store.state.kycTableData = rec
              //   // this.denyKycItem(rec.rows[0].id, 'remark')
              //   this.allowKycItem(rec.rows[0].id, rec.rows[0].userId)
              //   // let rows = []
              //   // [rec.rows[0]]
              //   // rec.rows.forEach(item => {
              //   //   KycService.getKycItem(this, item.id).then(recitem => {
              //   //     console.log('getKycItem', recitem)
              //   //   }).catch(error => {
              //   //     console.log(error)
              //   //   })
              //   //   KycService.getKycFile(this, item.id).then(recitem => {
              //   //     console.log('getKycFile', recitem)
              //   //   }).catch(error => {
              //   //     console.log(error)
              //   //   })
              //   //   KycService.getKycIcnumber(this, item.icnumber).then(recitem => {
              //   //     console.log('getKycIcnumber', recitem)
              //   //   }).catch(error => {
              //   //     console.log(error)
              //   //   })
              //   // })
              // })
            }).catch(error => {
              _this.$store.state.user.isKycUser = false
              console.log(error)
              _this.$message({
                message: 'err kyc info',
                type: 'error'
              })
            })
          })
        }
      },
      init_geetest () {
        this.ruleForm.userName = getLocalStore('userNameLast')
        if (this.ruleForm.userName !== null) this.onNameChange()
        this.login()
      }
    },
    destroyed () {
      this.$root.$off('RpcConnectionStatus')
    },
    mounted () {
      // 组件创建完成，属性已绑定，但DOM还没有生成前就要loading,等请求完成后，再显示DOM
      if (this.$store.state.initFinished) {
        this.init_geetest()
      } else {
        this.$root.$on('initFinished', (data) => {
          this.init_geetest()
        })
      }
      this.$root.$on('RpcConnectionStatus', (data) => {
        this.connectSucess(data)
      })
    },
    components: {
      YButton,
      ZOSInstance
    }
  }
</script>
<style lang="scss" scoped>
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(/static/images/smartisan_4ada7fecea.jpg);
    background-size: 60px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 50px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
  }
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    border-bottom: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    line-height: 1em;
    height: auto;
    color: #333;
    font-weight: 400;
  }

</style>
