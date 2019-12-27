export default {
  getCountrySync (countryText, Object) {
    countryText.commit('getCountry', Object)
  },
  getStatusSync (statusText, Object) {
    statusText.commit('getStatus', Object)
  }
}
