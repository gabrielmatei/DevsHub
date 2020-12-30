export const state = () => ({
  announcements: []
})

export const mutations = {
  saveAnnouncements: (state, announcements) => {
    state.announcements = announcements
  }
}

export const actions = {
  async getAnnouncements ({ commit }) {
    const { status, data } = await this.$repositories.announcements.getAll()
    if (status === 200) {
      const { announcements } = data
      commit('saveAnnouncements', announcements)
    } else {
      // TODO error
    }
  }
}
