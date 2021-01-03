<template>
  <nuxt-link class="card contest" :to="`/contests/${contest.id}`">
    {{ contest }}
    <nuxt-link v-if="role ==='admin'" :to="`/contests/${contest.id}/edit`" class="btn">
      Edit TODO
    </nuxt-link>
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      role: (state) => {
        if (state.auth.user === null) {
          return ''
        }
        return state.auth.user.role
      }
    })
  }
}
</script>
