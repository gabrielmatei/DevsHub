<template>
  <div class="container">
    <AnnouncementListView v-for="announcement in announcements" :key="announcement.id" :announcement="announcement" />
    <h1>{{ $t('index.title') }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AnnouncementListView from '@/components/announcements/AnnouncementListView'

export default {
  components: {
    AnnouncementListView
  },
  async fetch ({ store }) {
    await store.dispatch('announcements/getAnnouncements')
  },
  computed: {
    ...mapState({
      announcements: (state) => {
        return state.announcements.announcements
      }
    })
  }
}
</script>
