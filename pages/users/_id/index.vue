<template>
  <div class="container">
    <div class="header">
      <h1>{{ user.profile.name }}</h1>
      <nuxt-link v-if="role ==='admin'" :to="`/users/${user.id}/edit`" class="btn btn-primary">
        Edit
      </nuxt-link>
    </div>
    {{ user }}
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
    await store.dispatch('users/getUser', { id: route.params.id })
  },
  computed: {
    ...mapState({
      role: (state) => {
        if (state.auth.user === null) {
          return ''
        }
        return state.auth.user.role
      },
      user: (state) => {
        return state.users.user
      }
    })
  }
}
</script>
