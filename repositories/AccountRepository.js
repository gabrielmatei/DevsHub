const resource = 'v1/account'
export default $axios => ({
  register (payload) {
    return $axios.post(`${resource}/register`, payload)
  },
  update (payload) {
    return $axios.put(`${resource}/`, payload)
  }
})
