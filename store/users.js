export const state = () => ({
  users: [],
  user: undefined
})

export const mutations = {
  saveUsers: (state, users) => {
    state.users = users
  },
  saveUser: (state, user) => {
    state.user = user
  }
}

export const actions = {
  async getUsers ({ commit }) {
    const { status, data } = await this.$repositories.users.getAll()
    if (status === 200) {
      const { users } = data
      commit('saveUsers', users)
    } else {
      // TODO error
    }
  },
  async getUser ({ commit }, { id }) {
    const { status, data } = await this.$repositories.users.get(id)
    if (status === 200) {
      commit('saveUser', data)
    } else {
      // TODO error
    }
  }
}
