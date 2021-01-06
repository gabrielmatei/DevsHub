<template>
  <div>
    <loader v-if="isLoading" />
    <div v-if="error" class="card card-danger">
      {{ $t('account.login.error') }}
    </div>
    <h2 class="mb-20">
      {{ $t('account.login.title') }}
    </h2>
    <FormField :model="form.email" type="email" :placeholder="$t('account.login.email')" />
    <FormField :model="form.password" type="password" :placeholder="$t('account.login.password')" />
    <button class="btn btn-primary w-100" @click.prevent="login">
      {{ $t('account.login.button') }}
    </button>
  </div>
</template>

<script>
import api from '@/mixins/api'
import FormField from '@/components/forms/FormField'

export default {
  components: {
    FormField
  },
  mixins: [api],
  data: () => ({
    form: {
      email: { value: '', errors: [] },
      password: { value: '', errors: [] }
    }
  }),
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
    }
  }
}
</script>
