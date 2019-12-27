<template>
  <div id="app" v-loading.fullscreen.lock="mainloading" :element-loading-text="$t('m.Frame.loading')">
    <router-view class="main" v-if="isRouterAlive"></router-view>
    <!--网络初始化失败-->
    <el-dialog
      :title="$t('m.Frame.initErr')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <!--所有网络节点连接失败,请调整网络节点或者稍后尝试刷新。-->
      <span>{{$t('m.Frame.errInfo')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">{{$t('m.Frame.iUnderstand')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'
  export default {
    name: 'app',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        dialogVisible: false,
        mainloading: true,
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      handleClose () {
        this.mainloading = false
        this.dialogVisible = false
      }
    },
    created () {
      this.$root.$on('initFinished', _ => {
        this.mainloading = false
      })
      this.$root.$on('initFail', (data) => {
        this.mainloading = false
        this.dialogVisible = true
      })
      // // 在页面加载时读取sessionStorage里的状态信息
      // if (sessionStorage.getItem('store')) {
      //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      // }
      // // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // window.addEventListener('beforeunload', () => {
      //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      // })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "/path-assets/style/index.scss";
  html, body, #app {
    height: 100%;
  }
</style>
