<template>
  <div class="container">
    <div class="header">
      <h1>Contest</h1>
      <nuxt-link v-if="role ==='admin' || role === 'organizer'" :to="`/contests/${contest.id}/edit`" class="btn btn-primary">
        Edit
      </nuxt-link>
    </div>
    {{ contest }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  async fetch ({ store, route }) {
    await store.dispatch('contests/getContest', { id: route.params.id })
  },
  computed: {
    ...mapState({
      role: (state) => {
        if (state.auth.user === null) {
          return ''
        }
        return state.auth.user.role
      },
      contest: (state) => {
        return state.contests.contest
      }
    })
  }
}
</script>
