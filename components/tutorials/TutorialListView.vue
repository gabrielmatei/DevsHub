<template>
  <nuxt-link class="card tutorial" :to="`/tutorials/${tutorial.id}`">
    {{ tutorial }}
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
