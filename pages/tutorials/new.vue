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
import FormField from '@/components/forms/FormField'

export default {
  middleware: 'identity',
  meta: {
    roles: ['user']
  },
  components: {
    FormField
  },
  data: () => ({
    isLoading: false,
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
  computed: {
    formData () {
      const data = {}
      for (const [key, val] of Object.entries(this.form)) {
        data[key] = val.value
      }
      return data
    }
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
    showErrors (errors) {
      for (const [key] of Object.entries(this.form)) {
        this.form[key].errors = []
      }

      errors.forEach((error) => {
        this.form[error.fieldName].errors.push(error.message)
      })
    }
  }
}
</script>
