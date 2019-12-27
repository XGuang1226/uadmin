export default {
  getCountry (state, Object) {
    state.user.kycCountry = Object
  },
  getStatus (state, Object) {
    state.user.kycStatus = Object
  }
}
