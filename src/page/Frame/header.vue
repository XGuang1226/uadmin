<template>
  <div class="header-box">
      <header class="w">
        <div class="w-box">
          <div class="nav-logo">
            <h1 @click="changePage(1, 0)">
              <router-link :to="logo ? '/logo' : '/home'" :title="$store.state.companyName + $t('m.Frame.website')">
                <img :src="`/static/images/global-logo-${_theme}.png`" width="100" height="35">
              </router-link>
            </h1>
          </div>
          <div style="flex:1">
            <slot name="nav">
              <div class="nav-sub" :class="{fixed:st}">
                <div class="nav-sub-bg"></div>
                <div class="nav-sub-wrapper" :class="{fixed:st}">
                  <div class="w">
                    <router-link to="/home" class="dHMsll gTHKWe">
                      <a @click="changePage(2, 0)" class="dHMsll gTHKWe" >
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===2}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-home"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.home")}}</span>
                        </div>
                      </a>
                    </router-link>
                    <a @click="loginDia($store.state.headurl[3])" class="dHMsll gTHKWe">
                      <a @click="changePage(3)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===3}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-borrow"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.depositwithdraw")}}</span>
                        </div>
                      </a>
                    </a>
                    <a @click="loginDia($store.state.headurl[4])" class="dHMsll gTHKWe">
                      <a @click="changePage(4)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===4}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-investment"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.author")}}</span>
                        </div>
                      </a>
                    </a>
                    <a @click="loginDia($store.state.headurl[11])" class="dHMsll gTHKWe">
                      <a @click="changePage(11)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===11}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-investment"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.node")}}</span>
                        </div>
                      </a>
                    </a>
                    <a @click="loginDia($store.state.headurl[5])" class="dHMsll gTHKWe">
                      <a @click="changePage(5)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===5}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-trading"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.carrier")}}</span>
                        </div>
                      </a>
                    </a>
                    <a @click="loginDia($store.state.headurl[6])" class="dHMsll gTHKWe">
                      <a @click="changePage(6)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===6}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-lock"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.analy")}}</span>
                        </div>
                      </a>
                    </a>
                    <!-- <a @click="loginDia($store.state.headurl[7])" class="dHMsll gTHKWe">
                      <a @click="changePage(7)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===7}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-assets"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.asset")}}</span>
                        </div>
                      </a>
                    </a> -->
                    <!-- <a @click="loginDiaQuery($store.state.headurl[8], $store.state.headquery[8])" class="dHMsll gTHKWe">
                      <a @click="changePage(8)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===8}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-management"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.admin")}}</span>
                        </div>
                      </a>
                    </a> -->
                    <router-link :to="$store.state.headurl[9]" class="dHMsll gTHKWe">
                      <a @click="changePage(9, 0)" class="dHMsll gTHKWe">
                        <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===9}">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-setting"></use>
                          </svg>
                          <span class="bgdPDV">{{$t("m.Frame.setting")}}</span>
                        </div>
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </slot>
          </div>
          <div>
            <div class="right-box" id="login">
              <div class="username">
                <el-popover
                  placement="bottom"
                  width="480"
                  trigger="hover"
                  v-if="$store.state.userName"
                  class="margin-l20"
                >
                  <el-table :data="gridData">
                    <el-table-column width="140" property="symbol" :label="$t('m.Frame.bitType')"></el-table-column>
                    <el-table-column width="155" property="amount" :label="$t('m.Frame.KY')"></el-table-column>
                    <el-table-column width="155" property="lock_amount" :label="$t('m.Frame.unused')"></el-table-column>
                  </el-table>
                  <a slot="reference" style="width: 50px">{{$store.state.userName}}</a>
                </el-popover>

              </div>
              <div v-if="!$store.state.login">
                <a @click="_login" class="margin-l20">{{$t('m.Frame.login')}}</a>
                <!-- <span class="margin-l10">|</span>
                <router-link to="/register" :class="{lineBottom:choosePage===10}" style="margin-left: 10px">{{$t('m.register.title')}}</router-link> -->
              </div>
              <a v-if="$store.state.login" href="javascript:;" class="margin-l20" @click="_loginOut">{{$t("m.Frame.quit")}}</a>
              <div class="shop pr">
                <el-dropdown @command="change($event)">
                  <span class="el-dropdown-link">
                    <img :src="`/static/images/q${value}.png`" width="35" height="25">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in options" :command="item.value" :key="index">
                      <img :src="`/static/images/q${item.value}.png`" width="35" height="25" />
                      <span class="margin-l10">{{item.label}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
          </div>
          </div>
        </div>
      </header>
       <!--登录-->
    <login-dialog :visible="$store.state.loginPath !== undefined"></login-dialog>
    <el-dialog
      :title="$t('m.Frame.notSupport')"
      :visible.sync="validateBrowser"
      width="30%"
    >
      <span>{{$t('m.Frame.note')}}</span>
      <span slot="footer" class="dialog-footer">
        <a href @click="openLink()">Google Chrome</a>
        <el-button type="primary" @click="validateBrowser = false;">{{$t('m.Frame.understand')}}</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import {KycService} from '/js-utils/httpUtils'
import deepClone from '/js-utils/deepClone'
import '/path-assets/style/theme/95262b/index.css'
import '/path-assets/style/theme/1a1d5c/index.css'
import '/path-assets/style/theme/1a2d5c/index.css'
import {ZOSInstance} from 'zos-wallet-js'
import filters from '/js-filters'
import { removeStore, getLocalStore, setLocalStore } from '/js-utils/storage'
import { ChainTypes as GraphChainTypes, ChainStore } from 'zosjs/es'
import Notify from 'notifyjs'
import Immutable from 'immutable'
import {Apis} from 'zosjs-ws'
import loginDialog from '/path-page/Login/loginDialog'
export default{
  components: {loginDialog},
  data () {
    return {
      options: [{
        value: '1',
        label: '中文'
      }, {
        value: '2',
        label: 'English'
      }],
      value: '1',
      user: {},
      st: false,
      positionL: 0,
      positionT: 0,
      input: '',
      choosePage: 11,
      searchResults: [],
      timeout: null,
      token: '',
      gridData: [],
      operations: Object.keys(GraphChainTypes.operations),
      account: new Map(),
      validateBrowser: false,
      logo: true
    }
  },
  watch: {
    '$route.path': function (val, oldVal) {
      if (val !== oldVal) {
        this.getPage()
      }
    }
  },
  computed: {
    _theme () {
      return this.$store.state.configTheme
    }
  },
  methods: {
    change (v) {
      if (v === '1') {
        this.lang = 'zh-CN'
        this.value = '1'
        this.$i18n.locale = this.lang // 关键语句
      } else if (v === '2') {
        this.value = '2'
        this.lang = 'en-US'
        this.$i18n.locale = this.lang // 关键语句
      }
      setLocalStore('i18nLocaleSet', this.value)
      this.$store.state.lang = this.value
      // kyc国籍翻译
      KycService.getCountry(this).then(rec => {
        this.$store.state.user.kycCountry = rec
      }).catch(error => {
        this.$store.state.user.isKycUser = false
        console.log('country', error)
        this.$message({
          message: 'err country info',
          type: 'error'
        })
      })
    },
    // 导航栏文字样式改变
    changePage (v, bool = 1) {
      let sLogin = !ZOSInstance.accountIsLoginout()
      this.$store.state.login = sLogin
      if (bool && !sLogin) {
        return
      }
      this.choosePage = v
    },
    navFixed () {
      if (this.$route.path === '/logo' || this.$route.path === '/home' || this.$route.path === '/gateway' || this.$route.path === '/kyc' || this.$route.path === '/setting') {
      } else {
        return true
      }
    },
    _login () {
      this.$store.state.loginPath = this.$router.options.nextpath
    },
    // 退出登陆
    _loginOut () {
      // 是否登出:accountIsLoginout();无参数，返回true表示已经登出
      ZOSInstance.accountLoginout()
      this.$store.state.login = false
      this.$store.state.userName = ''
      this.$store.state.userDataSid = ''
      removeStore('userName')
      removeStore('userId')
      this.changePage(1, 0)
      this.$router.push('/')
      this.$store.state.loginPath = undefined
      this.$store.state.userInfo.phone = undefined
      this.$store.state.userInfo.mail = undefined
    },

    // 通过路由改变导航文字样式
    getPage () {
      if (this.$route.path === '/logo') {
        this.changePage(1)
      } else if (this.$route.path === '/home') {
        this.changePage(2)
      } else if (this.$route.path.indexOf('/gateway/') === 0) {
        this.changePage(3)
        this.$store.state.headurl[3] = this.$route.path
      } else if (this.$route.path.indexOf('/kyc/') === 0) {
        this.changePage(4)
        this.$store.state.headurl[4] = this.$route.path
      } else if (this.$route.path.indexOf('/carrier/') === 0) {
        this.changePage(5)
        this.$store.state.headurl[5] = this.$route.path
      } else if (this.$route.path.indexOf('/statistics/') === 0) {
        this.changePage(6)
        this.$store.state.headurl[6] = this.$route.path
      } else if (this.$route.path.indexOf('/balance/') === 0) {
        this.changePage(7)
        this.$store.state.headurl[7] = this.$route.path
      } else if (this.$route.path.indexOf('/admin/') === 0) {
        this.changePage(8)
        this.$store.state.headurl[8] = this.$route.path
      } else if (this.$route.path.indexOf('/setting/') === 0) {
        this.changePage(9)
        this.$store.state.headurl[9] = this.$route.path
      } else if (this.$route.path.indexOf('/register') === 0) {
        this.changePage(10)
      } else if (this.$route.path.indexOf('/node/') === 0) {
        this.changePage(11)
        this.$store.state.headurl[11] = this.$route.path
      }
    },
    loginDia (path) {
      if (this.$store.state.login) {
        this.$router.push({path: path})
      } else {
        this.$store.state.loginPath = {path: path}
      }
    },
    loginDiaQuery (path, query) {
      let headquery = deepClone(query)
      if (this.$store.state.login) {
        this.$router.push({path: path, query: headquery})
      } else {
        this.$store.state.loginPath = {path: path, query: headquery}
      }
    },
    updateList () {
      this.doNotify()
      // 通知keepalive 不要发get_objects
      Apis.instance().usersubscribe()
      if (this.$store.state.userDataSid && ChainStore.getLoginAccountBalanceChange(0)) {
        ZOSInstance.get_account_allbalances(this.$store.state.userDataSid, 0xFFFF).then(resbalas => {
          // console.log(resbalas)
          var allDate = resbalas['balances']
          this.$store.state.coupon.amount = resbalas['coupon']
          this.$store.state.coupon.amountstr = this.$store.state.coupon.amount.toFixed(5)
          this.$store.state.coupon.canReceiveCoupon = this.$store.state.coupon.canReceiveCouponTime && (this.$store.state.coupon.amount < this.$store.state.coupon.coupon_per_month)
          this.$store.state.userassets = allDate
          this.gridData.splice(0, this.gridData.length)
          for (let index = 0; index < allDate.length; index++) {
            this.gridData.push(Object.assign({}, allDate[index]))
            let element = this.gridData[index]
            element.amount = filters['formatLegalCurrency'](element.amount, '', element.precision)
            element.lock_amount = filters['formatLegalCurrency'](element.lock_amount, '', element.precision)
          }
        })
      }
      this.getAccountCoupon()
    },
    getAccountCoupon () {
      if (this.$store.state.userDataSid && ChainStore.getLoginAccountBalanceChange(1)) {
        ZOSInstance.get_account_coupon(this.$store.state.userDataSid)
          .then(res => {
            this.$store.state.coupon = res
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    _getOperationName (operation) {
      if (operation.getIn(['op', 0]) !== undefined) {
        return this.operations[operation.getIn(['op', 0])]
      }
      return null
    },

    _isOperationTransfer (operation) {
      return this._getOperationName(operation) === 'transfer'
    },

    _isTransferToMyAccount (operation) {
      if (!this._isOperationTransfer(operation)) {
        throw Error('Operation is not transfer')
      }
      return (
        operation.getIn(['op', 1, 'to']) === this.account.get('id')
      )
    },

    _isOperationBitlenderInvest (operation) {
      return this._getOperationName(operation) === 'bitlender_invest'
    },

    _isBitlenderInvestToMyAccount (operation) {
      if (!this._isOperationBitlenderInvest(operation)) {
        throw Error('Operation is not Bitlender Invest')
      }
      return (
        operation.getIn(['op', 1, 'loan_id']) === this.account.get('id')
      )
    },

    doNotify () {
      // this.regetUserName()
      if (this.$store.state.userName === '') return
      var newObj = ChainStore.getAccount(this.$store.state.userName, true)
      if (!newObj) {
        return
      }
      if (!newObj.get('history')) {
        return
      }
      if (!this.account.get('history')) {
        // 直接把account=newObj,会导致this.account.get('history')里找不到first()
        if (Immutable.fromJS(newObj.get('history'))) {
          this.account.set('history', Immutable.fromJS(newObj.get('history')))
        }
        return false
      }
      if (!this.account.get('id')) {
        if (Immutable.fromJS(newObj.get('id'))) {
          this.account.set('id', Immutable.fromJS(newObj.get('id')))
        }
        return false
      }
      if (!this.account.get('balances')) {
        if (Immutable.fromJS(newObj.get('balances'))) {
          this.account.set('balances', Immutable.fromJS(newObj.get('balances')))
        }
        return false
      }
      let lastOperationOld = this.account.get('history').first()
      let lastOperationNew = newObj.get('history').first()
      if (typeof (lastOperationOld) === 'undefined' || typeof (lastOperationNew) === 'undefined') {
        return false
      }
      if (lastOperationNew.get('id') === lastOperationOld.get('id')) {
        return false
      }
      // 转账通知
      if (
        this._isOperationTransfer(lastOperationNew) &&
        this._isTransferToMyAccount(lastOperationNew)
      ) {
        const assetId = lastOperationNew.getIn(['op', 1, 'amount', 'asset_id'])
        const from = lastOperationNew.getIn(['op', 1, 'from'])
        const amount = lastOperationNew.getIn(['op', 1, 'amount', 'amount'])
        const title = this.$t('m.Frame.trNotify')
        Apis.instance().db_api().exec('get_objects', [[assetId, from]]).then(res => {
          if (res && res[0] && res[1]) {
            const notifyParams = {
              body: this.$t('m.Frame.trNotify1') + '  ' + Number(amount) / Math.pow(10, res[0].precision) + '  ' + res[0].symbol + '  ' + this.$t('m.transfer.from') + '  ' + res[1].name
            }
            const notify = new Notify(title, notifyParams)
            notify.show()
          }
        })
      }
      // 投资订单通知
      if (
        this._isOperationBitlenderInvest(lastOperationNew) &&
        this._isBitlenderInvestToMyAccount(lastOperationNew)
      ) {
        const assetId = lastOperationNew.getIn(['op', 1, 'amount_to_invest', 'asset_id'])
        const from = lastOperationNew.getIn(['op', 1, 'issuer'])
        const amount = lastOperationNew.getIn(['op', 1, 'amount_to_invest', 'amount'])
        const title = this.$t('m.Frame.lendingnotify')
        Apis.instance().db_api().exec('get_objects', [[assetId, from]]).then(res => {
          if (res && res[0] && res[1]) {
            const notifyParams = {
              body: this.$t('m.Frame.lendingnotify1') + '  ' + Number(amount) / Math.pow(10, res[0].precision) + '  ' + res[0].symbol + '  ' + this.$t('m.transfer.from') + '  ' + res[1].name
            }
            const notify = new Notify(title, notifyParams)
            notify.show()
          }
        })
      }

      this.account.set('history', Immutable.fromJS(newObj.get('history')))
      this.account.set('id', Immutable.fromJS(newObj.get('id')))
      this.account.set('balances', Immutable.fromJS(newObj.get('balances')))
      // Immutable.fromJS(newObj.get('history'))
    },
    openLink () {
      let newWnd = window.open(
        'https://www.google.com/chrome/browser/desktop/',
        '_blank'
      )
      newWnd.opener = null
    },
    isShowChromeTip () {
      const userAgent = navigator.userAgent.toLowerCase()
      if (!(userAgent.indexOf('firefox') > -1 ||
          userAgent.indexOf('chrome') > -1 ||
          userAgent.indexOf('edge') > -1)) {
        this.validateBrowser = false
      } else {
        this.validateBrowser = false
      }
    },
    init () {
    }
  },
  mounted () {
    if (this.$store.state.initFinished) {
      this.init()
    } else {
      this.$root.$on('initFinished', (data) => {
        this.init()
      })
    }
    this.navFixed()
    this.getPage()
    this.isShowChromeTip()
    window.addEventListener('scroll', this.navFixed)
    window.addEventListener('resize', this.navFixed)
    if (typeof (this.$route.query.key) !== 'undefined') {
      this.input = this.$route.query.key
    }
  },
  created () {
    ChainStore.subscribe(this.updateList)
    if (Notify.needsPermission) {
      Notify.requestPermission()
    }
    if (!getLocalStore('i18nLocaleSet')) {
      this.value = '1'
      this.lang = 'zh-CN'
      this.$i18n.locale = this.lang // 关键语句
    } else {
      this.value = getLocalStore('i18nLocaleSet')
    }
    this.change(this.value)
  },
  destroyed () {
    ChainStore.unsubscribe(this.updateList)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "/path-assets/style/theme";
  @import "/path-assets/style/mixin";

  .move_in_cart {
    animation: mymove .5s ease-in-out;
  }

  @keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-moz-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-webkit-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }

  @-o-keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.2)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }
  .bbYkHy {
    height: 70px;
    color: #fff;
    background-color: #0667d0;
  }
  .djliRF {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
  }

  @media (max-height: 780px) {
    .nav-cart-items {
      max-height: 423px !important;
    }
  }

  @media (max-height: 900px) {
    .nav-cart-items {
      max-height: 544px !important;
    }
  }

  @media (max-height: 1080px) {
    .nav-cart-items {
      max-height: 620px !important;
    }
  }
  @media (max-width: 1100px) {
    .bgdPDV {
      display: none;
    }
    .icon{
      font-size: 20px;
      margin-right: 10px;
    }
  }
  @media (min-width: 1101px) {
    .bgdPDV {
      display: block;
    }
    .icon{
      font-size: 16px;
      margin-right: 5px;
    }
  }
  // 用户信息弹出
  .nav-user-wrapper {
    position: absolute;
    z-index: 30;
    padding-top: 18px;
    opacity: 0;
    visibility: hidden;
    top: -3000px;
    .nav-user-list {
      position: relative;
      padding-top: 20px;
      background: #fff;
      border: 1px solid #d6d6d6;
      border-color: rgba(0, 0, 0, .08);
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
      z-index: 10;
      &:before {
        position: absolute;
        content: " ";
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) no-repeat -49px -43px;
        background-size: 240px 107px;
        @include wh(20px, 8px);
        top: -8px;
        margin-left: -10px;
      }
    }
  }

  .nav-sub {
    position: relative;
    z-index: 20;
    height: 64px;
    &.fixed {
      position: fixed;
      z-index: 21;
      height: 60px;
      top: 0;
      left: 0;
      right: 0;
      border-bottom: 1px solid #dadada;
      background-image: -webkit-linear-gradient(#fff, #f1f1f1);
      background-image: linear-gradient(#fff, #f1f1f1);
    }
    .nav-sub-wrapper {
      height: 64px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      position: relative;
      &.fixed {
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
      &:after {
        content: " ";
        position: absolute;
        top: 89px;
        left: 50%;
        margin-left: -610px;
        /*width: 1220px;*/
        /*background: #000;*/
        height: 1px;
        display: none;
        opacity: 0;
        transition: opacity .3s ease-in;
      }
    }
    .w {
      display: flex;
      flex-direction: row;
      /*width: 95%;*/
      justify-content: flex-start;
      flex: 1;
      margin-left: 45px;
      .gTHKWe {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      }

      .dHMsll:not(:first-child) {
        margin-left: 30px;
      }
      a {
        text-decoration: none;
        cursor: pointer;
        /*.rsdjt :hover {*/
          /*color: #f9c215;*/
          /*border-bottom: 1px solid #82848a;*/
        /*}*/
        .lineBottom{
          color: #fff;
          /*border-bottom: 1px solid #fff;*/
        }
        .ftDCsB {
          position: relative;
          -webkit-box-align: center;
          align-items: center;
          cursor: pointer;
          margin-right: 30px;
          color: rgb(6, 103, 208);
        }
        .ftDCsB::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0px;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid rgb(6, 103, 208);
        }
        .gTHKWe {
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
        }
        div{
          display: block;
          .joarYq{
            width: 16px;
            height: 16px;
            fill: currentColor;
          }
          .bgdPDV{
            font-size: 16px;
            margin-left: 5px;
          }
        }

      }
    }
    .nav-list2 {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        padding-left: 0;
        a {
          padding-left: 10px;
        }
      }
      li {
        position: relative;
        float: left;
        padding-left: 2px;
        a {
          display: block;
          padding: 0 10px;
          color: #666;
          &.active {
            font-weight: bold;
          }
        }
        a:hover {
          color: #5683EA;
        }
      }
      li:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 13px;
        width: 2px;
        height: 2px;
        background: #bdbdbd;
      }
    }
  }

  @media (min-width: 1px) {
    .nav-sub .nav-sub-wrapper:after {
      display: block;
    }
  }

  .cart-con {
    /*display: flex;*/
    text-align: center;
    position: relative;
    p {
      padding-top: 185px;
      color: #333333;
      font-size: 16px;
    }
  }

  .cart-con:before {
    position: absolute;
    content: ' ';
    left: 50%;
    transform: translate(-50%, -70%);
    top: 50%;
    width: 76px;
    height: 62px;
    background: url("/static/images/cart-empty-new.png") no-repeat;
    background-size: cover;

  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-icon-circle-check{
    font-size: 25px;
  }
  .change-styles, .el-icon-goods{
    color: #409EFF;
    font-size: 25px;
  }
</style>

