<template>
  <div :class="`card announcement ${announcement.type.toLowerCase()}`">
    {{ announcement.title }}
    {{ announcement.body }}
    {{ announcement.start | formatDate }}
    {{ announcement.end | formatDate }}
    <nuxt-link v-if="role ==='admin'" :to="`/announcements/${announcement.id}/edit`" class="btn">
      Edit
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  async fetch ({ store }) {
    await store.dispatch('announcements/getAnnouncements')
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

<style scoped>
.announcement.info {
  background-color: var(--blue);
}

.announcement.warning {
  background-color: var(--orange);
}

.announcement.danger {
  background-color: var(--red);
}
</style>
