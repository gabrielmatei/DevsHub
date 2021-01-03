<template>
  <div class="container">
    <div class="header">
      <h1>{{ $t('contests.title') }}</h1>
      <nuxt-link v-if="role ==='admin' || role === 'organizer'" to="/contests/new" class="btn btn-primary">
        Adauga concurs
      </nuxt-link>
    </div>
    <ContestListView v-for="contest in contests" :key="contest.id" :contest="contest" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContestListView from '@/components/contests/ContestListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    ContestListView
  },
  async fetch ({ store }) {
    await store.dispatch('contests/getContests')
  },
  computed: {
    ...mapState({
      role: (state) => {
        if (state.auth.user === null) {
          return ''
        }
        return state.auth.user.role
      },
      contests: (state) => {
        return state.contests.contests
      }
    })
  }
}
</script>
