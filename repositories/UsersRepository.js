const resource = 'v1/users'
export default $axios => ({
  getAll () {
    return $axios.get(`${resource}`)
  },

  get (id) {
    return $axios.get(`${resource}/${id}`)
  },

  update (id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete (id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
