<template>
  <nuxt-link class="card tutorial" :to="`/tutorials/${tutorial.id}`">
    <div class="content mr-20">
      <span class="date">{{ tutorial.updatedAt | formatDateTime }}</span>
      <h4 class="title">
        {{ tutorial.title }}
      </h4>
    </div>
    <div class="actions">
      <span class="date">Autor</span>
      <span class="mb-10">{{ tutorial.author.name }}</span>
      <span class="chip">{{ $t('users.rating') }} {{ tutorial.author.rating }}</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    tutorial: {
      type: Object,
      required: true
    }
  }
}
</script>
