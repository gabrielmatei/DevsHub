<template>
  <nuxt-link class="card tutorial" :to="`/tutorials/${tutorial.id}`">
    <div class="content mr-20">
      <span class="date">{{ tutorial.updatedAt | formatDateTime }}</span>
      <h4 class="title mb-10">
        {{ tutorial.title }}
      </h4>
      <div>
        <span v-for="category in tutorial.categories" :key="category.id" class="chip mr-10">{{ category.name }}</span>
      </div>
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
