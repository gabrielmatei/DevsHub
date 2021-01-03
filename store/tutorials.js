export const state = () => ({
  tutorials: [],
  tutorial: undefined
})

export const mutations = {
  saveTutorials: (state, tutorials) => {
    state.tutorials = tutorials
  },
  saveTutorial: (state, tutorial) => {
    state.tutorial = tutorial
  }
}

export const actions = {
  async getTutorials ({ commit }) {
    const { status, data } = await this.$repositories.tutorials.getAll()
    if (status === 200) {
      const { tutorials } = data
      commit('saveTutorials', tutorials)
    } else {
      // TODO error
    }
  },
  async getTutorial ({ commit }, { id }) {
    const { status, data } = await this.$repositories.tutorials.get(id)
    if (status === 200) {
      commit('saveTutorial', data)
    } else {
      // TODO error
    }
  }
}
