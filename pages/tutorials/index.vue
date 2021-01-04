<template>
  <div class="container">
    <div class="header">
      <h1>{{ $t('tutorials.title') }}</h1>
      <nuxt-link v-if="isAuthenticated" to="/tutorials/new" class="btn btn-primary">
        Adauga tutorial
      </nuxt-link>
    </div>
    <div class="content">
      <div class="list mr-20">
        <TutorialListView v-for="tutorial in tutorials" :key="tutorial.id" :tutorial="tutorial" />
      </div>
      <div class="aside card">
        <h3 class="mb-20">
          Categorii
        </h3>
        <p v-for="category in categories" :key="category.id">
          {{ category.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TutorialListView from '@/components/tutorials/TutorialListView'

export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  },
  components: {
    TutorialListView
  },
  async fetch ({ store }) {
    await store.dispatch('tutorials/getCategories')
    await store.dispatch('tutorials/getTutorials')
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => {
        return state.auth.loggedIn
      },
      tutorials: (state) => {
        return state.tutorials.tutorials
      },
      categories: (state) => {
        return state.tutorials.categories
      }
    })
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.list {
  flex-grow: 1;
}

.aside {
  width: 400px;
  display: flex;
  flex-direction: column;
}
</style>
