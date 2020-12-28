<template>
  <div class="container">
    <h1>{{ $t('users.title') }}</h1>
    <UserListView v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserListView from '@/components/users/UserListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    UserListView
  },
  async fetch ({ store }) {
    await store.dispatch('users/getUsers')
  },
  computed: {
    ...mapState({
      users: (state) => {
        return state.users.users
      }
    })
  }
}
</script>
