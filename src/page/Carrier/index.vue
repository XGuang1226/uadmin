<template>
  <div>
    <div class="wn margin-b10 secondary">
      <div class="nav-secondary">
        <router-link :to="{path:'/carrier/carrier_setting'}" class="dHMsll gTHKWe">
          <a @click="changePage(1)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===1}">
              <div class="bgdPDV">{{$t('m.Carrier.carrier_setting')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/carrier/carrier_statistics'}" class="dHMsll gTHKWe">
          <a @click="changePage(2)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===2}">
              <div class="bgdPDV">{{$t('m.Carrier.carrier_statistics')}}</div>
            </div>
          </a>
        </router-link>
      </div>
    </div>
    <div class="router-main jyNVPQ">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import {ZOSInstance} from 'zos-wallet-js'
  export default {
    data () {
      return {
        choosePage: 1
      }
    },
    computed: {
    },
    watch: {
      '$route.path': function (val, oldVal) {
        if (val !== oldVal) {
          this.getPage()
        }
      }
    },
    methods: {
      // 导航栏文字样式改变
      changePage (v) {
        let sLogin = !ZOSInstance.accountIsLoginout()
        this.$store.state.login = sLogin
        if (!sLogin) {
          return
        }
        this.choosePage = v
      },
      // 通过路由改变导航文字样式
      getPage () {
        if (this.$route.path === '/carrier/carrier_setting') {
          this.changePage(1)
        } else if (this.$route.path === '/carrier/carrier_statistics') {
          this.changePage(2)
        }
      }
    },
    mounted () {
      this.getPage()
    }
  }
</script>
<style scoped lang="scss">
  @import '../../theme/utils';
  @import '../../theme/theme';
  .router-main{
    margin: 65px auto 0;
  }
</style>
