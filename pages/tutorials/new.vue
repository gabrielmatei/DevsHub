<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Adauga tutorial</h1>
    </div>
    <form>
      <FormField :model="form.title" type="input" placeholder="title" />
      <FormField :model="form.content" type="textarea" placeholder="content" />
      <button class="btn btn-primary" @click.prevent="add">
        Adauga
      </button>
    </form>
  </div>
</template>

<script>
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
  data: () => ({
    form: {
      title: {
        value: '',
        errors: []
      },
      content: {
        value: '',
        errors: []
      }
    }
  }),
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
    }
  }
}
</script>
