<template>
  <div v-loading="mainloading" :element-loading-text="$t('m.Frame.loading')" style="min-height: 10vh;">
    <div class="box" v-if="!mainloading">
      <el-row>
        <el-col :span="10">
          <div class="grid-content">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
               <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input v-model="dynamicValidateForm.email" placeholder="请输入邮箱地址"></el-input>
              </el-form-item>
              <el-form-item
                prop="mobile"
                label="电话"
                :rules="[
                  { required: true, message: '请输入电话号码', trigger: 'blur' }
                ]"
              >
                <el-input type="mobile" v-model="dynamicValidateForm.mobile" placeholder="请输入电话号码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="resetForm('dynamicValidateForm')" size="small">取消</el-button>
                <el-button @click="submitForm('dynamicValidateForm')" type="success" size="small">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {ZOSInstance} from 'zos-wallet-js'
  import {KycService} from '/js-utils/httpUtils'
  export default {
    components: {},
    data () {
      return {
        errorImg01: 'this.src="' + require('/path-static/images/no-img.png') + '"',
        loading: true,
        // 整体加载
        mainloading: true,
        dynamicValidateForm: {
          email: '',
          mobile: ''
        }
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
      },
      loginInvalid () {
        let sLogin = !ZOSInstance.accountIsLoginout()
        this.$store.state.login = sLogin
        if (!sLogin) {
          this.$message.error(this.$t('m.Author.login_invalid'))
          return false
        }
      },
      submitForm (formName) {
        this.loginInvalid()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            KycService.kycUserUpdate(this, this.dynamicValidateForm.email, this.dynamicValidateForm.mobile).then(res => {
              console.log('修改用户信息', res)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
.box{
  padding: 22px 0;
}
</style>
