<template>
  <div>
    <div class="wn margin-b10 secondary">
      <div class="nav-secondary">
        <router-link :to="{path:'/statistics/account_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(1)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===1}">
              <div class="bgdPDV">{{$t('m.Statistics.account_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/balances_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(2)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===2}">
              <div class="bgdPDV">{{$t('m.Statistics.balances_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/lending_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(3)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===3}">
              <div class="bgdPDV">{{$t('m.Statistics.lending_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/invest_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(4)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===4}">
              <div class="bgdPDV">{{$t('m.Statistics.invest_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/dy_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(5)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===5}">
              <div class="bgdPDV">{{$t('m.Statistics.dy_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/fixed_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(6)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===6}">
              <div class="bgdPDV">{{$t('m.Statistics.fixed_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/node_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(7)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===7}">
              <div class="bgdPDV">{{$t('m.Statistics.node_stats')}}</div>
            </div>
          </a>
        </router-link>
        <router-link :to="{path:'/statistics/sell_stats'}" class="dHMsll gTHKWe">
          <a @click="changePage(8)" class="dHMsll gTHKWe">
            <div class="rsdjt gTHKWe Navbar__link" :class="{lineBottom:choosePage===8}">
              <div class="bgdPDV">{{$t('m.Statistics.sell_stats')}}</div>
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
  // import {ZOSInstance} from 'zos-wallet-js'
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
        /* let sLogin = !ZOSInstance.accountIsLoginout()
        this.$store.state.login = sLogin
        if (!sLogin) {
          return
        } */
        this.choosePage = v
      },
      // 通过路由改变导航文字样式
      getPage () {
        if (this.$route.path === '/statistics/account_stats') {
          this.changePage(1)
        } else if (this.$route.path === '/statistics/balances_stats') {
          this.changePage(2)
        } else if (this.$route.path === '/statistics/lending_stats') {
          this.changePage(3)
        } else if (this.$route.path === '/statistics/invest_stats') {
          this.changePage(4)
        } else if (this.$route.path === '/statistics/dy_stats') {
          this.changePage(5)
        } else if (this.$route.path === '/statistics/fixed_stats') {
          this.changePage(6)
        } else if (this.$route.path === '/statistics/node_stats') {
          this.changePage(7)
        } else if (this.$route.path === '/statistics/sell_stats') {
          this.changePage(8)
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
