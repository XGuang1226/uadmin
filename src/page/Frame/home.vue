<template>
  <div class="w store-content" style="max-width: 1152px">
    <div v-loading="loadingmain" :element-loading-text="$t('m.Frame.loading')" style="min-height: 10vw;">
      <div v-show="!loadingmain" class="margin-t10">
        home 测试
      </div>
      <div class="home-index" v-if="!loadingmain">
      </div>
    </div>
    <!--登录-->
    <login-dialog :visible="$store.state.loginPath !== undefined"></login-dialog>
  </div>
</template>
<script>
  // import { getStore, setStore } from '/js-utils/storage'
  import loginDialog from '/path-page/Login/loginDialog'
  // import {Apis} from 'zosjs-ws'
  // import { loginToPath } from '/js-utils/until.js'
  export default {
    components: {loginDialog},
    data () {
      return {
        loadingmain: false
      }
    },
    watch: {
    },
    computed: {
      _theme () {
        return this.$store.state.configTheme
      },
      _themeColor () {
        if (this._theme === '1a1d5c') {
          return '#ffffff'
        } else {
          return '#' + this._theme
        }
      }
    },
    methods: {
      init () {
        this.loadingmain = false
      }
    },
    created () {
      if (this.$store.state.initFinished) {
        this.init()
      }
    },
    mounted () {
      this.loadingmain = true
      if (this.$store.state.initFinished) {
        this.init()
      } else {
        this.$root.$on('initFinished', (data) => {
          this.init()
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .home-index{
    max-width: 1152px;
    margin: 0 auto;
    .advantage{
      background: #fff;
      h1{
        color: #000;
      }
      .list{
        justify-content: center;
        padding-top: 30px;
        padding-bottom: 18px;
        flex-wrap: wrap;
        .list-item,
        .using-progress-left{
          text-align: center;
          margin-bottom: 40px;
          .caption{
            h3{
              color: #000;
            }
            p{
              color: #98999B;
              margin: 0 auto;
            }
          }
        }
      };
      .using-progress {
        flex-direction: column;
        .using-progress-list{
          justify-content: center;
          align-items: center;
          .using-progress-left{
            min-width: 228px;
            margin-bottom: 0;
          }
          .using-progress-right{
            border-radius: 8px;
            color: #fff;
            padding: 20px 36px;
            line-height: 30px;
          }
        }
      }
    };
  }
</style>
