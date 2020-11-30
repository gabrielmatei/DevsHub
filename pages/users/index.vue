<template>
  <div class="container">
    <Loader v-if="$fetchState.pending" />
    <h1>{{ $t('users.title') }}</h1>
    <button @click="$fetch">
      Refresh
    </button>
    {{ users }}
  </div>
</template>

<script>
export default {
  async fetch () {
    this.users = await fetch('https://api.nuxtjs.dev/mountains')
      .then(res => res.json())
  },
  data: () => ({
    users: []
  })
}
</script>
