<template>
  <div :class="`card announcement ${announcement.type.toLowerCase()}`">
    <div class="content">
      <span class="date">{{ announcement.start | formatDate }} - {{ announcement.end | formatDate }}</span>
      <h4 class="title">
        {{ announcement.title }}
      </h4>
      <p class="description">
        {{ announcement.body }}
      </p>
    </div>
    <div class="actions">
      <nuxt-link v-if="role ==='admin'" :to="`/announcements/${announcement.id}/edit`" class="btn">
        Edit
      </nuxt-link>
    </div>
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
