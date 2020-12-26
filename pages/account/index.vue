<template>
  <div class="container">
    <h1>{{ loggedInUser.profile.name }}</h1>
    <button class="btn btn-danger" @click="logout">
      Log out
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
