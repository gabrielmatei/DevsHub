<template>
  <div class="container">
    <div class="header">
      <h1>{{ $t('announcements.title') }}</h1>
      <nuxt-link v-if="role ==='admin'" to="/announcements/new" class="btn btn-primary">
        Adauga anunt
      </nuxt-link>
    </div>
    <AnnouncementListView v-for="announcement in announcements" :key="announcement.id" :announcement="announcement" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AnnouncementListView from '@/components/announcements/AnnouncementListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    AnnouncementListView
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
      },
      announcements: (state) => {
        return state.announcements.announcements
      }
    })
  }
}
</script>
