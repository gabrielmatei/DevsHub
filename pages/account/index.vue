<template>
  <div class="container">
    <div class="header">
      <h1>{{ loggedInUser.profile.name }}</h1>
      <nuxt-link to="/account/edit" class="btn btn-primary">
        {{ $t('account.edit') }}
      </nuxt-link>
    </div>
    <button class="btn btn-danger" @click="logout">
      {{ $t('account.logout') }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'identity',
  meta: {
    roles: ['user']
  },
  computed: {
    ...mapState({
      loggedInUser: (state) => {
        return state.auth.user
      }
    })
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
