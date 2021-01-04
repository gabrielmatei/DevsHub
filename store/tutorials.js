export const state = () => ({
  tutorials: [],
  tutorial: undefined,
  categories: []
})

export const mutations = {
  saveTutorials: (state, tutorials) => {
    state.tutorials = tutorials
  },
  saveTutorial: (state, tutorial) => {
    state.tutorial = tutorial
  },
  saveCategories: (state, categories) => {
    state.categories = categories
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
  },
  async getCategories ({ commit }) {
    const { status, data } = await this.$repositories.tutorialCategories.getAll()
    if (status === 200) {
      const { tutorialCategories } = data
      commit('saveCategories', tutorialCategories)
    } else {
      // TODO error
    }
  }
}
