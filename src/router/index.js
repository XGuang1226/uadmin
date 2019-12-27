import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['/path-page/Frame/index.vue'], resolve),
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: resolve => require(['/path-page/Frame/home.vue'], resolve), needlogin: false},
        {path: 'logo', component: resolve => require(['/path-page/Frame/help.vue'], resolve), needlogin: false},
        {
          path: 'gateway',
          component: resolve => require(['/path-page/Gateway/index.vue'], resolve),
          redirect: '/gateway/deposite',
          needlogin: false,
          children: [
            {path: 'deposite', name: 'deposite', component: resolve => require(['/path-page/Gateway/deposite.vue'], resolve), needlogin: true},
            {path: 'withdraw', name: 'withdraw', component: resolve => require(['/path-page/Gateway/withdraw.vue'], resolve), needlogin: true},
            {path: 'deposite_cash', name: 'deposite_cash', component: resolve => require(['/path-page/Gateway/deposite_cash.vue'], resolve), needlogin: true},
            {path: 'withdraw_cash', name: 'withdraw_cash', component: resolve => require(['/path-page/Gateway/withdraw_cash.vue'], resolve), needlogin: true},
            {path: 'gateway_setting', name: 'gateway_setting', component: resolve => require(['/path-page/Gateway/gateway_setting.vue'], resolve), needlogin: true},
            {path: 'gateway_statistics', name: 'gateway_statistics', component: resolve => require(['/path-page/Gateway/gateway_statistics.vue'], resolve), needlogin: true}
          ]
        },
        {
          path: 'kyc',
          component: resolve => require(['/path-page/Kyc/index.vue'], resolve),
          redirect: '/kyc/kyclist',
          needlogin: false,
          children: [
            {path: 'kyclist', name: 'kyclist', component: resolve => require(['/path-page/Kyc/kyc.vue'], resolve), needlogin: true},
            {path: 'kyc_setting', name: 'kyc_setting', component: resolve => require(['/path-page/Kyc/kyc_setting.vue'], resolve), needlogin: true},
            {path: 'kyc_statistics', name: 'kyc_statistics', component: resolve => require(['/path-page/Kyc/kyc_statistics.vue'], resolve), needlogin: true}
          ]
        },
        {
          path: 'carrier',
          component: resolve => require(['/path-page/Carrier/index.vue'], resolve),
          redirect: '/carrier/carrier_setting',
          needlogin: false,
          children: [
            {path: 'carrier_setting', name: 'carrier_setting', component: resolve => require(['/path-page/Carrier/carrier_setting.vue'], resolve), needlogin: true},
            {path: 'carrier_statistics', name: 'carrier_statistics', component: resolve => require(['/path-page/Carrier/carrier_statistics.vue'], resolve), needlogin: true}
          ]
        },
        {
          path: 'node',
          component: resolve => require(['/path-page/Node/index.vue'], resolve),
          redirect: '/node/node_setting',
          needlogin: false,
          children: [
            {path: 'node_setting', name: 'carrier_setting', component: resolve => require(['/path-page/Node/node_setting.vue'], resolve), needlogin: true},
            {path: 'node_statistics', name: 'carrier_statistics', component: resolve => require(['/path-page/Node/node_statistics.vue'], resolve), needlogin: true}
          ]
        },
        {
          path: 'statistics',
          component: resolve => require(['/path-page/Statistics/index.vue'], resolve),
          redirect: '/statistics/account_stats',
          needlogin: false,
          children: [
            {path: 'account_stats', name: 'account_stats', component: resolve => require(['/path-page/Statistics/account_stats.vue'], resolve), needlogin: false},
            {path: 'balances_stats', name: 'balances_stats', component: resolve => require(['/path-page/Statistics/balances_stats.vue'], resolve), needlogin: false},
            {path: 'lending_stats', name: 'accoulending_statsnt_stats', component: resolve => require(['/path-page/Statistics/lending_stats.vue'], resolve), needlogin: false},
            {path: 'invest_stats', name: 'invest_stats', component: resolve => require(['/path-page/Statistics/invest_stats.vue'], resolve), needlogin: false},
            {path: 'dy_stats', name: 'dy_stats', component: resolve => require(['/path-page/Statistics/dy_stats.vue'], resolve), needlogin: false},
            {path: 'fixed_stats', name: 'fixed_stats', component: resolve => require(['/path-page/Statistics/fixed_stats.vue'], resolve), needlogin: false},
            {path: 'node_stats', name: 'node_stats', component: resolve => require(['/path-page/Statistics/node_stats.vue'], resolve), needlogin: false},
            {path: 'sell_stats', name: 'sell_stats', component: resolve => require(['/path-page/Statistics/sell_stats.vue'], resolve), needlogin: false}
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          component: resolve => require(['/path-page/Setting/setting.vue'], resolve),
          needlogin: false,
          redirect: '/setting/accessSettings',
          children: [
            {path: 'accessSettings', name: 'accessSettings', component: resolve => require(['/path-page/Setting/accessSettings.vue'], resolve), needlogin: false},
            {path: 'generalSetup', name: 'generalSetup', component: resolve => require(['/path-page/Setting/generalSetup.vue'], resolve), needlogin: false},
            {path: 'faucetAddress', name: 'faucetAddress', component: resolve => require(['/path-page/Setting/faucetAddress.vue'], resolve), needlogin: false},
            {path: 'information', name: 'information', component: resolve => require(['/path-page/Setting/information.vue'], resolve), needlogin: true},
            {path: 'permission', name: 'permission', component: resolve => require(['/path-page/Setting/permission.vue'], resolve), needlogin: true}
          ]
        },
        // {
        //   path: 'balance',
        //   name: 'balance',
        //   component: resolve => require(['/path-page/Balances/index.vue'], resolve),
        //   needlogin: true,
        //   redirect: '/balance/balances',
        //   children: [
        //     {path: 'balances', name: 'balances', component: resolve => require(['/path-page/Balances/balances.vue'], resolve), needlogin: true},
        //     {path: 'balanceslist', name: 'balanceslist', component: resolve => require(['/path-page/Balances/BalancesList.vue'], resolve), needlogin: true},
        //     {path: 'operationslist', name: 'operationslist', component: resolve => require(['/path-page/Balances/operationslist.vue'], resolve), needlogin: true},
        //     {path: 'authors', name: 'authors', component: resolve => require(['/path-page/Balances/authors.vue'], resolve), needlogin: true},
        //     {path: 'withdrawlock', name: 'withdrawlock', component: resolve => require(['/path-page/Balances/withdrawlock.vue'], resolve), needlogin: true}
        //   ]
        // },
        {path: '/invite', name: 'invite', component: resolve => require(['/path-page/Invite/index.vue'], resolve), needlogin: true},
        // {
        //   path: '/admin',
        //   name: 'admin',
        //   component: resolve => require(['/path-page/Admin/index.vue'], resolve),
        //   needlogin: false,
        //   redirect: '/admin/myProposalList',
        //   children: [
        //     {path: 'myProposalList', name: 'myProposalList', component: resolve => require(['/path-page/Admin/Proposal/myProposalList.vue'], resolve), needlogin: true},
        //     {path: 'processBadLoanList', name: 'processBadLoanList', component: resolve => require(['/path-page/Admin/Badloan/processBadLoanList.vue'], resolve), needlogin: true},
        //     {path: 'adminBadLoanDetail', name: 'adminBadLoanDetail', component: resolve => require(['/path-page/Admin/Badloan/adminBadLoanDetail.vue'], resolve), needlogin: true}
        //   ]
        // },
        // {path: '/register', name: 'register', component: resolve => require(['/path-page/Login/register.vue'], resolve), needlogin: false},
        {path: '/login', name: 'login', component: resolve => require(['/path-page/Login/login.vue'], resolve), needlogin: false}
      ]
    },
    // {path: '/register/:userid', name: 'register', component: resolve => require(['/path-page/Login/register.vue'], resolve), needlogin: false},
    {path: '*', redirect: '/home', needlogin: false}
  ],
  nextpath: undefined
})
