<template>
    <div>
        <el-dialog 
        width="70%" 
        :title="$t('m.Author.kyc_info')" 
        v-bind="$attrs" 
        v-on="$listeners">
            <div class="el_box">
                <div class="el_row">
                <div class="el_col">{{$t("m.Author.dig_account")}}: {{kycInfo.chainId}}</div>
                <div class="el_col el_col_border">{{$t('m.Author.name')}}: {{kycInfo.lastName}}{{kycInfo.name}}</div>
                <div class="el_col">{{$t('m.Author.nationality')}}: {{$t("m.country." + kycInfo.nationality)}}</div>
                </div>
                <div class="el_row">
                <div class="el_col">{{$t('m.Author.ID_Type.title')}}: {{$t("m.Author.ID_Type." + kycInfo.ictype)}}</div>
                <div class="el_col el_col_border">{{$t('m.Author.ID_Num')}}: {{kycInfo.icnumber}}</div>
                <div class="el_col">{{$t('m.Author.submission_time')}}: {{kycInfo.createTime | formatDate}}</div>
                </div>
                <div class="el_row">
                <div class="el_col">{{$t('m.Author.audit_time')}}: {{kycInfo.updateTime | formatDate}}</div>
                <div class="el_col el_col_border">{{$t('m.Author.auditor')}}: {{kycInfo.operator}}</div>
                <div class="el_col">{{$t('m.Author.status.title')}}: {{$t("m.Author.status." + kycInfo.status)}}</div>
                </div>
                <div class="el_row">
                <div class="el_col">{{$t('m.Author.remark')}}: {{kycInfo.remark}}</div>
                </div>
            </div>
            <div class="el_row_img">
                <div class="el_col_img" v-for="fit in kycFileId" :key="fit">
                    <viewer :images="kycFileId">
                        <img width="200" height="300" v-if="kycImagePath"
                        :src="kycImagePath + '/?id=' + fit.fileId + '&kyc.jpg'"
                        :key="index"
                        :onerror="errorImg">
                    </viewer>
                </div>
            </div>
            <el-dialog
                width="50%"
                :title="$t('m.Author.audit_op')"
                :visible.sync="dialogRemark"
                append-to-body>
                <el-form :model="ruleForm" :show-message="false" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="140px" v-if="kycInfo.status == 0 || kycInfo.status == 1">
                    <el-form-item :label="$t('m.Author.audit_op')" prop="remark">
                        <el-input v-model="ruleForm.remark" :placeholder="$t('m.Author.input_auditOp')"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="cancel('ruleForm')">{{$t('m.Author.cancel')}}</el-button>
                    <el-button v-if="kycInfo.status == 0" type="danger" size="small" @click="denyKycItem('ruleForm', kycInfo.id, kycInfo.remark)">{{$t('m.Author.confirm_ref')}}</el-button>
                    <el-button v-if="kycInfo.status == 1" type="danger" size="small" @click="allowKycItemCancel('ruleForm', kycInfo.id, kycInfo.userId, 0)">{{$t('m.Author.confirm_cancelPass')}}</el-button>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer" v-if="checkDetails">
                <el-button v-if="kycInfo.status == 0" @click="dialogRemark = true" type="danger" size="small">{{$t("m.Author.refuse")}}</el-button>
                <el-button v-if="kycInfo.status == 0" @click="allowKycItem(kycInfo.id, kycInfo.userId, 4)" type="success" size="small">{{$t("m.Author.pass")}}</el-button>
                <el-button v-if="kycInfo.status == 1" @click="dialogRemark = true" type="danger" size="small">{{$t("m.Author.cancelPass")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {ZOSInstance} from 'zos-wallet-js'
import {KycService} from '/js-utils/httpUtils'
export default {
  name: 'checkKycDialog',
  inject: ['reload'],
  props: ['kycInfo', 'kycFileId', 'kycImagePath', 'checkDetails'],
  data () {
    return {
      outerVisible: false,
      dialogRemark: false,
      ruleForm: {
        remark: ''
      },
      rules: {
        remark: [
          { required: true, trigger: 'blur' },
          { min: 1, max: 20, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel (formName) {
      this.ruleForm.remark = ''
      this.dialogRemark = false
      this.$refs[formName].resetFields()
    },
    loginInvalid () {
      let sLogin = !ZOSInstance.accountIsLoginout()
      this.$store.state.login = sLogin
      if (!sLogin) {
        this.$message.error(this.$t('m.Author.login_invalid'))
        return false
      }
    },
    // 通过
    allowKycItem (id, userid, stateid) {
      this.loginInvalid()
      let _this = this
      let data = {
        state: stateid,
        account: userid,
        hash64: 0,
        expiration: 63072000
      }
      ZOSInstance.account_authenticate(this.$store.state.userDataSid, 6, data).then(res => {
        console.log(res.tr)
        res.tr.finalize().then(() => {
          res.tr.sign()
          let trx = res.tr.toObject()
          KycService.setKycItemAudit(this, id, true, this.ruleForm.remark, trx).then(kyc => {
            console.log('通过结果', kyc, stateid)
            this.dialogCheckVisible = false
            this.reload()
            if (kyc.success !== true && stateid === 4) {
              this.$message({
                message: this.$t('m.Author.allow_failure'),
                type: 'error'
              })
            }
            if (kyc.success === true && stateid === 4) {
              this.$message({
                message: this.$t('m.Author.allow_suc'),
                type: 'success'
              })
            }
          }).catch(error => {
            console.log(error)
            _this.$message({
              message: 'audit error' + error.toString(),
              type: 'error'
            })
          })
        })
      })
      setTimeout(() => {
        this.reload()
      }, 120000)
    },
    // 取消通过
    allowKycItemCancel (formName, id, userid, stateid) {
      console.log(formName, id, userid, stateid)
      this.loginInvalid()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          let data = {
            state: stateid,
            account: userid,
            hash64: 0,
            expiration: 63072000
          }
          ZOSInstance.account_authenticate(this.$store.state.userDataSid, 6, data).then(res => {
            res.tr.finalize().then(() => {
              res.tr.sign()
              let trx = res.tr.toObject()
              if (this.ruleForm.remark.length < 1 || this.ruleForm.remark.length > 20) {
                this.$message.error(this.$t('m.Author.space_constraints'))
              }
              KycService.setKycItemAudit(this, id, true, this.ruleForm.remark, trx).then(kyc => {
                console.log('通过结果', kyc, stateid)
                this.dialogRemark = false
                this.dialogCheckVisible = false
                this.reload()
                if (kyc.success !== true && stateid === 0) {
                  this.$message({
                    message: this.$t('m.Author.cancelallow_failure'),
                    type: 'error'
                  })
                }
                if (kyc.success === true && stateid === 0) {
                  this.$message({
                    message: this.$t('m.Author.cancelallow_suc'),
                    type: 'success'
                  })
                }
                this.$refs[formName].resetFields()
              }).catch(error => {
                console.log(error)
                _this.$message({
                  message: 'audit error' + error.toString(),
                  type: 'error'
                })
              })
            })
          })
          setTimeout(() => {
            this.reload()
          }, 120000)
        } else {
          if (this.ruleForm.remark === '') {
            this.$message.error(this.$t('m.Author.input_auditOp'))
          }
          return false
        }
      })
    },
    // 拒绝
    denyKycItem (formName, id, remark) {
      this.loginInvalid()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.remark)
          if (this.ruleForm.remark.length < 1 || this.ruleForm.remark.length > 20) {
            this.$message.error(this.$t('m.Author.space_constraints'))
          }
          let _this = this
          let data = {id: id, result: false, remark: this.ruleForm.remark}
          ZOSInstance.signTrx(this.$store.state.userDataSid, data).then(res => {
            KycService.setKycItemAudit(this, id, false, this.ruleForm.remark, res).then(kyc => {
              console.log('拒绝结果', kyc)
              this.dialogRemark = false
              this.dialogCheckVisible = false
              this.reload()
              if (kyc.success !== true) {
                this.$message({
                  message: this.$t('m.Author.deny_failure'),
                  type: 'error'
                })
              } else {
                this.$message({
                  message: this.$t('m.Author.deny_suc'),
                  type: 'success'
                })
              }
              this.$refs[formName].resetFields()
            }).catch(error => {
              console.log(error)
              _this.$message({
                message: 'audit error' + error.to_string(),
                type: 'error'
              })
            })
          })
        } else {
          if (this.ruleForm.remark === '') {
            this.$message.error(this.$t('m.Author.input_auditOp'))
          }
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el_box{
  margin-bottom: 20px;
  .el_row{
    display:flex;
    margin-top:-1px;
    border:1px solid #ebeef5;
    .el_col{
      flex:1;
      margin-left:-1px;
      height:58px;
      line-height:58px;
      text-indent: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el_col_border{
      border-right:1px solid #ebeef5;
      border-left:1px solid #ebeef5;
    }
  }
}
.el_row_img{
  .el_col_img{
    margin-right: 10px;
    display: inline-block;
    border:1px solid #ebeef5;
  }
}
</style>