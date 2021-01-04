<template>
  <div class="card tutorial-category add">
    <form>
      <FormField :model="form.name" type="input" placeholder="name" css-class="form-field" />
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
      name: {
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
        const { status } = await this.$repositories.tutorialCategories.create(this.formData)
        if (status === 201) {
          this.form.name.value = ''
          this.form.name.errors = []
          await this.$store.dispatch('tutorials/getCategories')
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

<style scoped>
form {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
}
</style>
