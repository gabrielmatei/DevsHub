<template>
  <div>
    <loader v-if="isLoading" />
    <div v-if="error" class="alert alert-danger">
      Emailul si parola nu se potrivesc
    </div>
    <h2 class="mb-20">
      Log in
    </h2>
    <FormField :model="form.email" type="email" placeholder="email" />
    <FormField :model="form.password" type="password" placeholder="password" />
    <button class="btn btn-primary w-100" @click.prevent="login">
      Log in
    </button>
  </div>
</template>

<script>
import FormField from '@/components/forms/FormField'

export default {
  components: {
    FormField
  },
  data: () => ({
    isLoading: false,
    error: false,
    form: {
      email: {
        value: '',
        errors: []
      },
      password: {
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
    async login () {
      this.isLoading = true
      this.error = false
      try {
        await this.$auth.loginWith('local', { data: this.formData })
        this.$router.push('/')
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

      if (errors) {
        errors.forEach((error) => {
          this.form[error.fieldName].errors.push(error.message)
        })
      } else {
        this.error = true
      }
    }
  }
}
</script>
