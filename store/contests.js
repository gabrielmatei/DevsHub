export const state = () => ({
  contests: [],
  contest: undefined
})

export const mutations = {
  saveContests: (state, contests) => {
    state.contests = contests
  },
  saveContest: (state, contest) => {
    state.contest = contest
  }
}

export const actions = {
  async getContests ({ commit }) {
    const { status, data } = await this.$repositories.contests.getAll()
    if (status === 200) {
      const { contests } = data
      commit('saveContests', contests)
    } else {
      // TODO error
    }
  },
  async getContest ({ commit }, { id }) {
    const { status, data } = await this.$repositories.contests.get(id)
    if (status === 200) {
      commit('saveContest', data)
    } else {
      // TODO error
    }
  }
}
