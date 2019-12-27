<template>
 <div v-loading="loading" :element-loading-text="$t('m.Frame.loading')" class="el_box">
   <div v-if="!mainloading">
     <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content">
          <el-input :placeholder="$t('m.Author.help_text0')" clearable v-model="searchKycTasks_chainnanme">
            <template slot="prepend">{{$t("m.Author.dig_account")}}</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <el-input :placeholder="$t('m.Author.help_text1')" clearable v-model="searchKycTasks_name">
            <template slot="prepend">{{$t("m.Author.name")}}</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <el-select
          v-model="searchKycTasks_status"
          clearable
          :placeholder="$t('m.Author.help_text2')"
          style="width:100%;">
            <el-option
              v-for="(item, index) in kycStatus"
              :key="index"
              :label="$t('m.Author.status.' + item.enumVal)"
              :value="item.enumVal">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <el-select
            v-model="searchKycTasks_country"
            filterable
            clearable
            collapse-tags
            :placeholder="$t('m.Author.help_text3')"
            style="width:100%;">
            <el-option
              v-for="(item, index) in this.$store.state.user.kycCountry.data"
              :key="index"
              :label="item.countryName"
              :value="item.countryCode">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button icon="el-icon-search" circle @click="searchKycTasks(searchKycTasks_name, searchKycTasks_chainnanme, searchKycTasks_status, searchKycTasks_country)"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="kycTableData"
      stripe
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
        fixed
        prop="name"
        :label="$t('m.Author.name')"
        sortable
        width="160">
      </el-table-column>
      <el-table-column
        prop="chainId"
        :label="$t('m.Author.dig_account')"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="nationality"
        :label="$t('m.Author.nationality')"
        sortable
        width="180">
        <template slot-scope="scope">
          <span>{{$t("m.country." + scope.row.nationality)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ictype"
        :label="$t('m.Author.ID_Type.title')"
        sortable
        width="160">
        <template slot-scope="scope">
          <span>{{$t("m.Author.ID_Type." + scope.row.ictype)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="icnumber"
        :label="$t('m.Author.ID_Num')"
        sortable
        width="200">
        <template slot-scope="scope">
          <el-link type="warning" @click="checkIdClick(scope.row.icnumber)">{{scope.row.icnumber}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('m.Author.status.title')"
        sortable
        width="160">
        <template slot-scope="scope">
          <span class="not_audit_text" v-show="scope.row.status === 0">{{$t("m.Author.status." + scope.row.status)}}</span>
          <span class="approved_text" v-show="scope.row.status === 1">{{$t("m.Author.status." + scope.row.status)}}</span>
          <span class="not_approved_text" v-show="scope.row.status === 2">{{$t("m.Author.status." + scope.row.status)}}</span>
          <span class="reviewing_text" v-show="scope.row.status === 3">{{$t("m.Author.status." + scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="$t('m.Author.submission_time')"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        :label="$t('m.Author.audit_time')"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="remark"
        :show-overflow-tooltip="true"
        :label="$t('m.Author.remark')"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('m.Author.operation')"
        width="180"
        min-width="180">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status === 0 || scope.row.status === 1 ? false : true" @click="handleCheckClick(scope.row)" type="success" size="small">{{$t("m.Author.audit")}}</el-button>
          <el-button @click="checkDetailsClick(scope.row)" type="success" size="small" plain>{{$t("m.Author.check_details")}}</el-button>
        </template>
      </el-table-column>
      <!-- <div slot="empty" class="slot_empty"><i class="el-icon-loading"></i></div> -->
    </el-table>
    <!-- 分页 -->
    <div class="block paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="choosePage"
        :page-sizes="[8, 10, 12, 15]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count">
      </el-pagination>
    </div>
    <!-- 审核 dialog -->
    <check-kyc 
    :visible.sync="dialogCheckVisible"
    :kycInfo="kycInfo"
    :kycImagePath="kycImagePath"
    :kycFileId="kycFileId"
    :checkDetails="checkDetails"
    ></check-kyc>
    <!-- 证件类型 dialog -->
    <check-id :visible.sync="dialogDocumentType" :kycIcNumber="kycIcNumber"></check-id>
   </div>
  </div>
</template>
<script>
  import {ZOSInstance} from 'zos-wallet-js'
  import {KycService} from '/js-utils/httpUtils'
  import {formatDbDate} from '/js-utils/until'
  import checkKyc from './kycDialog/checkKyc.vue'
  import checkId from './kycDialog/checkId.vue'

  export default {
    inject: ['reload'],
    components: {
      checkKyc,
      checkId
    },
    data () {
      return {
        errorImg01: 'this.src="' + require('/path-static/images/no-img.png') + '"',
        loading: false,
        // 整体加载
        mainloading: true,
        input1: '',
        input2: '',
        kycStatus: '',
        kycCountry: '',
        kycImagePath: '',
        kycFileId: [],
        kycTableData: [],
        kycIcNumber: '',
        searchKycTasks_name: '',
        searchKycTasks_chainnanme: '',
        searchKycTasks_status: [],
        searchKycTasks_country: [],
        dialogCheckVisible: false,
        dialogRemark: false,
        dialogDocumentType: false,
        checkDetails: true,
        kycInfo: {
          chainId: '',
          lastName: '',
          name: '',
          nationality: '',
          ictype: '',
          icnumber: '',
          createTime: '',
          updateTime: '',
          operator: '',
          status: '',
          remark: ''
        },
        total_count: '',
        page_size: 8,
        choosePage: 1, // 初始页
        labelPosition: 'left'
      }
    },
    watch: {},
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
        this.mainloading = true
        // 审核状态
        this.kycStatus = JSON.parse(sessionStorage.getItem('kycStatus'))
        // 列表数据
        this.searchKycTasks('', '', '', '')
      },
      loginInvalid () {
        let sLogin = !ZOSInstance.accountIsLoginout()
        this.$store.state.login = sLogin
        if (!sLogin) {
          this.$message.error(this.$t('m.Author.login_invalid'))
          return false
        }
      },
      cancel (formName) {
        this.ruleForm.remark = ''
        this.dialogRemark = false
        this.$refs[formName].resetFields()
      },
      // 检索
      searchKycTasks (name, chainnanme, status, country) {
        this.loginInvalid()
        let fileds = ['chainId', 'name', 'nationality', 'ictype', 'icnumber', 'status', 'createTime', 'updateTime', 'remark']
        KycService.getKycTasks(this, name, chainnanme, status, country, fileds, (this.choosePage - 1) * this.page_size, this.page_size).then(rec => {
          console.log('getKycTasks222', rec)
          if (rec.rows) {
            for (let index = 0; index < rec.rows.length; index++) {
              if (rec.rows[index].createTime) {
                rec.rows[index].createTime = (formatDbDate((rec.rows[index].createTime).toString())).replace(/T/g, ' ')
              }
              if (rec.rows[index].updateTime) {
                rec.rows[index].updateTime = (formatDbDate((rec.rows[index].updateTime).toString())).replace(/T/g, ' ')
              }
            }
            this.kycTableData = rec.rows
            this.total_count = rec.total_rows
            this.mainloading = false
          }
        })
      },
      // 审核
      handleCheckClick (row) {
        this.loginInvalid()
        this.queryModal(row)
        this.checkDetails = true
        this.dialogCheckVisible = true
      },
      // 查看详情
      checkDetailsClick (row) {
        this.loginInvalid()
        console.log(row)
        this.queryModal(row)
        this.checkDetails = false
        this.dialogCheckVisible = true
      },
      // moadal数据查询
      queryModal (row) {
        KycService.getKycItem(this, row.id).then(recitem => {
          if (recitem) {
            if (recitem.rows[0].createTime) {
              recitem.rows[0].createTime = (formatDbDate((recitem.rows[0].createTime).toString())).replace(/T/g, ' ')
            }
            if (recitem.rows[0].updateTime) {
              recitem.rows[0].updateTime = (formatDbDate((recitem.rows[0].updateTime).toString())).replace(/T/g, ' ')
            }
            this.kycInfo = recitem.rows[0]
          }
        })
        // 审核图片
        this.kycImagePath = ''
        this.kycFileId = ''
        KycService.getFilePath(this).then(rec => {
          if (rec) {
            this.kycImagePath = rec[0].parameterValue
          }
        })
        KycService.getKycFile(this, row.id).then(recitem => {
          if (recitem) {
            this.kycFileId = recitem
          }
        })
      },
      // 身份证号审核
      checkIdClick (id) {
        this.loginInvalid()
        this.kycIcNumber = ''
        this.dialogDocumentType = true
        KycService.getKycIcnumber(this, id).then(recitem => {
          console.log('getKycIcnumber', recitem)
          if (recitem) {
            for (let index = 0; index < recitem.length; index++) {
              if (recitem[index].createTime) {
                recitem[index].createTime = (formatDbDate((recitem[index].createTime).toString())).replace(/T/g, ' ')
              }
              if (recitem[index].updateTime) {
                recitem[index].updateTime = (formatDbDate((recitem[index].updateTime).toString())).replace(/T/g, ' ')
              }
            }
            this.kycIcNumber = recitem
          }
        })
      },
      // 分页操作
      handleSizeChange (val) {
        console.log('每页条:' + val)
        this.loginInvalid()
        this.page_size = val
        this.searchKycTasks(this.searchKycTasks_chainnanme, this.searchKycTasks_name, this.searchKycTasks_status, this.searchKycTasks_country)
      },
      handleCurrentChange (val) {
        console.log('当前页:' + val)
        this.loginInvalid()
        this.choosePage = val
        this.searchKycTasks(this.searchKycTasks_chainnanme, this.searchKycTasks_name, this.searchKycTasks_status, this.searchKycTasks_country)
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
.el_box{
  margin: 0 20px;
  .paging{
    padding:10px 0;
    text-align:right;
  }
  .not_audit_text{
    color: #409EFF;
  }
  .approved_text{
    color: #67C23A;
  }
  .not_approved_text{
    color: #F56C6C;
  }
  .reviewing_text{
    color: #E6A23C;
  }
}
.country_ch{
  float: left;
}
.country_en {
  margin-right:20px;
  float: right;
  color: #8492a6;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  margin-top: 20px;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.slot_empty {
  font-size: 50px;
}
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
  display: flex;
  .el_col_img{
    flex: 1
  }
}
</style>
