<template>
  <div v-loading="mainloading" :element-loading-text="$t('m.Frame.loading')" style="min-height: 10vh;">
    <div v-if="!mainloading">
      活期统计
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        errorImg01: 'this.src="' + require('/path-static/images/no-img.png') + '"',
        loading: true,
        // 整体加载
        mainloading: true
      }
    },
    watch: {
    },
    computed: {
      isCurLoginUser () {
        if (this.$route.query.accName === this.$store.state.userName && this.$store.state.login) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      init () {
        this.mainloading = false
      }
    },
    mounted () {
      this.mainloading = true
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
<style scoped lang="scss">
</style>
