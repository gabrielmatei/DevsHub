<template>
  <div>
    <loader v-if="isLoading" />
    <div v-if="error" class="alert alert-danger">
      A aparut o eroare
    </div>
    <h2 class="mb-20">
      Register
    </h2>
    <FormField :model="form.firstname" type="input" placeholder="firstName" />
    <FormField :model="form.lastname" type="input" placeholder="lastName" />
    <FormField :model="form.email" type="email" placeholder="email" />
    <FormField :model="form.password" type="password" placeholder="password" />
    <FormField :model="form.confirmpassword" type="password" placeholder="confirm password" />
    <button class="btn btn-primary w-100" @click.prevent="register">
      Register
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
      firstname: {
        value: '',
        errors: []
      },
      lastname: {
        value: '',
        errors: []
      },
      email: {
        value: '',
        errors: []
      },
      password: {
        value: '',
        errors: []
      },
      confirmpassword: {
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
    async register () {
      this.isLoading = true
      this.error = false
      try {
        const { status } = await this.$repositories.account.register(this.formData)
        if (status === 200) {
          await this.$auth.loginWith('local', { data: this.formData })
          this.$router.push('/')
          this.isLoading = false
        }
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
