<template>
  <div class="container">
    <div class="header">
      <h1>
        {{ user.profile.name }}
        <span class="chip">{{ $t('users.rating') }} {{ user.profile.rating }}</span>
        <span :class="`chip chip-${user.role}`">{{ user.role }}</span>
      </h1>
      <nuxt-link v-if="role ==='admin'" :to="`/users/${user.id}/edit`" class="btn btn-primary">
        {{ $t('users.edit') }}
      </nuxt-link>
    </div>

    <h3 v-if="user.contests.length > 0" class="subtitle mb-20">
      {{ $t('users.contests') }}
    </h3>
    <ContestListView v-for="contest in user.contests" :key="contest.id" :contest="contest" />

    <h3 v-if="user.tutorials.length > 0" class="subtitle mb-20">
      {{ $t('users.tutorials') }}
    </h3>
    <TutorialListView v-for="tutorial in user.tutorials" :key="tutorial.id" :tutorial="tutorial" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContestListView from '@/components/contests/ContestListView'
import TutorialListView from '@/components/tutorials/TutorialListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    ContestListView,
    TutorialListView
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

<style scoped>
.subtitle {
  font-size: 2rem;
}
</style>
