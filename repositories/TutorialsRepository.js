const resource = 'v1/tutorials'
export default $axios => ({
  getAll () {
    return $axios.get(`${resource}`)
  },

  get (id) {
    return $axios.get(`${resource}/${id}`)
  },

  create (payload) {
    return $axios.post(`${resource}/`, payload)
  },

  update (id, payload) {
    return $axios.put(`${resource}/${id}`, payload)
  },

  delete (id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
