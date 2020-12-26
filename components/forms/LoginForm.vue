<template>
  <div>
    <Loader v-if="isLoading" />
    <h2 class="mb-20">
      Log in
    </h2>
    <div class="form-field mb-20">
      <input
        id="email"
        v-model="email.value"
        :class="`input ${email.errors.length > 0 ? 'invalid' : ''}`"
        type="email"
        placeholder="email"
        autocomplete="off"
      >
      <span v-for="error in email.errors" :key="error" class="error">
        {{ error }}
      </span>
    </div>
    <div class="form-field mb-20">
      <input
        id="password"
        v-model="password.value"
        :class="`input ${password.errors.length > 0 ? 'invalid' : ''}`"
        type="password"
        placeholder="password"
        autocomplete="off"
      >
      <span v-for="error in password.errors" :key="error" class="error">
        {{ error }}
      </span>
    </div>
    <button class="btn btn-primary w-100" @click.prevent="login">
      Log in
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    email: {
      value: '',
      errors: []
    },
    password: {
      value: '',
      errors: []
    }
  }),
  methods: {
    async login () {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email.value,
            password: this.password.value
          }
        })

        this.$router.push('/')
        this.isLoading = false
      } catch (error) {
        this.showErrors(error.response.data.errors)
        this.isLoading = false
      }
    },
    showErrors (errors) {
      this.email.errors = []
      this.password.errors = []

      errors.forEach((error) => {
        this[error.fieldName].errors.push(error.message)
      })
    }
  }
}
</script>
