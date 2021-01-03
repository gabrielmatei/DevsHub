<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Adauga concurs</h1>
    </div>
    <form>
      <FormField :model="form.name" type="input" placeholder="name" />
      <FormField :model="form.description" type="textarea" placeholder="description" />
      <FormField :model="form.start" type="date" />
      <FormField :model="form.end" type="date" />
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
    roles: ['admin', 'organizer']
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
      },
      description: {
        value: '',
        errors: []
      },
      start: {
        value: new Date(),
        errors: []
      },
      end: {
        value: new Date(),
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
        const { status, data } = await this.$repositories.contests.create(this.formData)
        if (status === 201) {
          this.$router.push(`/contests/${data.id}`)
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
