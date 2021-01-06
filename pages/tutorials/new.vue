<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Adauga tutorial</h1>
    </div>
    <form>
      <FormField :model="form.title" type="input" placeholder="title" />
      <FormField :model="form.content" type="textarea" placeholder="content" />
      <div class="form-field mb-20 categories">
        <span
          v-for="category in categories"
          :key="category.id"
          :class="`chip category mr-10 ${form.categories.value.includes(category.id) ? 'selected' : ''}`"
          @click.prevent="selectCategory(category.id)"
        >{{ category.name }}</span>
      </div>
      <button class="btn btn-primary" @click.prevent="add">
        Adauga
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/mixins/api'
import FormField from '@/components/forms/FormField'

export default {
  middleware: 'identity',
  meta: {
    roles: ['user']
  },
  components: {
    FormField
  },
  mixins: [api],
  async fetch ({ store }) {
    await store.dispatch('tutorials/getCategories')
  },
  data: () => ({
    form: {
      title: {
        value: '',
        errors: []
      },
      content: {
        value: '',
        errors: []
      },
      categories: {
        value: [],
        errors: []
      }
    }
  }),
  computed: {
    ...mapState({
      categories: (state) => {
        return state.tutorials.categories
      }
    })
  },
  methods: {
    async add () {
      this.isLoading = true
      try {
        const { status, data } = await this.$repositories.tutorials.create(this.formData)
        if (status === 201) {
          this.$router.push(`/tutorials/${data.id}`)
        }
        this.isLoading = false
      } catch (error) {
        this.showErrors(error.response.data.errors)
        this.isLoading = false
      }
    },
    selectCategory (id) {
      if (this.form.categories.value.includes(id)) {
        this.form.categories.value = this.form.categories.value.filter(c => c !== id)
      } else {
        this.form.categories.value.push(id)
      }
    }
  }
}
</script>

<style scoped>
.categories {
  display: block;
}

.category {
  background: var(--bg-primary);
}

.category.selected {
  background: var(--blue);
}
</style>
