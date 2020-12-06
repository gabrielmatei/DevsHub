export const state = () => ({
  users: []
})

export const mutations = {
  saveUsers: (state, users) => {
    state.users = users
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
  }
}
