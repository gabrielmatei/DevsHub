<template>
  <div class="container">
    <div class="header">
      <h1>{{ tutorial.title }}</h1>
      <nuxt-link v-if="isAuthenticated" :to="`/tutorials/${tutorial.id}/edit`" class="btn btn-primary">
        Edit
      </nuxt-link>
    </div>
    <p>Data: {{ tutorial.updatedAt | formatDateTime }}</p>
    <p>Autor: {{ tutorial.author.name }}</p>
    <p>{{ tutorial.content }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  async fetch ({ store, route }) {
    await store.dispatch('tutorials/getTutorial', { id: route.params.id })
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => {
        return state.auth.loggedIn
      },
      tutorial: (state) => {
        return state.tutorials.tutorial
      }
    })
  }
}
</script>
