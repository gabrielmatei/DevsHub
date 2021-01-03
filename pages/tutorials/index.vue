<template>
  <div class="container">
    <div class="header">
      <h1>{{ $t('tutorials.title') }}</h1>
      <nuxt-link v-if="isAuthenticated" to="/tutorials/new" class="btn btn-primary">
        Adauga tutorial
      </nuxt-link>
    </div>
    <TutorialListView v-for="tutorial in tutorials" :key="tutorial.id" :tutorial="tutorial" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TutorialListView from '@/components/tutorials/TutorialListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    TutorialListView
  },
  async fetch ({ store }) {
    await store.dispatch('tutorials/getTutorials')
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => {
        return state.auth.loggedIn
      },
      tutorials: (state) => {
        return state.tutorials.tutorials
      }
    })
  }
}
</script>
