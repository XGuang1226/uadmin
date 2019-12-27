<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('m.Frame.loading')"
    style="min-height: 10vw;"
  >
    <h1 class="fw margin-t40">{{$t('m.params.theme')}}</h1>
    <div
      class="line"
      style="margin: 15px 0px;"
    ></div>
    <div
      class="feel margin-t40 margin-l10"
      style="align-items: center"
    >
      <span style="width: 120px">{{$t('m.params.chooseTheme')}}:</span>
      <el-select
        v-model="chooseTheme"
        :placeholder="$t('m.transfer.QXZ')"
        class="margin-l10"
        :disabled="!canChange"
      >
        <el-option
          v-for="(item,index) in ($store.state.lang === '1' ? themeList : themeListEn)"
          :key="index"
          :label="item.name"
          :value="item.styles"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import { getLocalStore, setLocalStore, isTheme } from '/js-utils/storage'
  import {toggleClass} from '/js-utils/until'
  export default {
    components: {
    },
    data () {
      return {
        loading: true,
        chooseTheme: '',
        canChange: true,
        themeList: [
          {name: '蓝色', styles: '1a1d5c'},
          {name: '绿色', styles: '1a2d5c'},
          {name: '红色', styles: '95262b'}
        ],
        themeListEn: [
          {name: 'Blue', styles: '1a1d5c'},
          {name: 'Green', styles: '1a2d5c'},
          {name: 'Red', styles: '95262b'}
        ]
      }
    },
    watch: {
      chooseTheme: {
        handler: function (val, newVal) {
          if (isTheme(this.chooseTheme) && this.canChange) {
            toggleClass(document.body, 'theme-' + this.chooseTheme)
            this.$store.state.chooseTheme = this.chooseTheme
            setLocalStore('choosedStyles', this.chooseTheme)
          }
        },
        deep: true
      }
    },
    computed: {
    },
    methods: {
      // 主题
      _theme () {
        this.canChange = true
        this.chooseTheme = getLocalStore('choosedStyles')
        if (!isTheme(this.chooseTheme)) {
          this.chooseTheme = '1a1d5c'
        }
        this.loading = false
      }
    },
    mounted () {
      this.loading = true
      if (this.$store.state.initFinished) {
        this._theme()
      } else {
        this.$root.$on('initFinished', _ => {
          this._theme()
        })
      }
    }
  }
</script>
<style scoped lang="scss">
.err-url {
  color: #ff0000;
}
</style>
