<template>
  <nuxt-link class="card user" :to="`/users/${user.id}`">
    <div class="content mr-20">
      <h4 class="title mb-10">
        {{ user.profile.name }}
      </h4>
      <span class="chip">{{ $t('users.rating') }} {{ user.profile.rating }}</span>
    </div>
    <div class="actions">
      <span :class="`chip chip-${user.role}`">{{ user.role }}</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
