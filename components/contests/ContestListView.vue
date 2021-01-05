<template>
  <nuxt-link class="card contest" :to="`/contests/${contest.id}`">
    <div class="content mr-20">
      <span class="date">{{ contest.start | formatDateTime }} - {{ contest.end | formatDateTime }}</span>
      <h4 class="title">
        {{ contest.name }}
      </h4>
    </div>
    <div class="actions">
      <span class="date">Organizator</span>
      <span class="organizer mb-10">{{ contest.organizer.name }}</span>
      <span class="chip">{{ $t('users.rating') }} {{ contest.organizer.rating }}</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    contest: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.actions {
  justify-content: flex-end;
}

.organizer {
  font-weight: 600;
}
</style>
