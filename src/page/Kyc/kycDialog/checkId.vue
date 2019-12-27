<template>
  <div>
    <el-dialog 
    width="70%" 
    :title="$t('m.Author.ID_Type.title')" 
    v-bind="$attrs" 
    v-on="$listeners">
      <el-table
        :data="kycIcNumber"
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="icnumber"
          :label="$t('m.Author.ID_Num')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="chainId"
          :label="$t('m.Author.dig_account')"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('m.Author.status.title')"
          width="140">
          <template slot-scope="scope">
            <span>{{$t("m.Author.status." + scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('m.Author.submission_time')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :label="$t('m.Author.audit_time')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operator"
          :label="$t('m.Author.auditor')"
          width="140">
        </el-table-column>
        <el-table-column
          prop="remark"
          :label="$t('m.Author.remark')"
          width="200">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
 
<script>
    export default {
      name: 'checkIdDialog',
      props: ['kycIcNumber']
    }
</script>