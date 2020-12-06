<template>
  <div class="card user">
    <div class="name">
      {{ user.profile.name }}
    </div>
    <div class="rating">
      <span class="chip">Rating {{ user.profile.rating }}</span>
    </div>
    <div class="role">
      <span :class="`chip chip-${user.role}`">{{ user.role }}</span>
    </div>
  </div>
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
