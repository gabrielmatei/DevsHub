<template>
  <div class="container">
    <div class="header">
      <h1>{{ $t('tutorialCategories.title') }}</h1>
    </div>
    <TutorialCategoryEdit v-for="category in categories" :key="category.id" :category="category" />
    <TutorialCategoryAdd />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TutorialCategoryAdd from '@/components/tutorials/TutorialCategoryAdd'
import TutorialCategoryEdit from '@/components/tutorials/TutorialCategoryEdit'

export default {
  middleware: 'identity',
  meta: {
    roles: ['admin']
  },
  components: {
    TutorialCategoryAdd,
    TutorialCategoryEdit
  },
  async fetch ({ store }) {
    await store.dispatch('tutorials/getCategories')
  },
  computed: {
    ...mapState({
      categories: (state) => {
        return state.tutorials.categories
      }
    })
  }
}
</script>
