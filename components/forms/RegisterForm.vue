<template>
  <div>
    <loader v-if="isLoading" />
    <div v-if="error" class="alert alert-danger">
      {{ $t('account.register.error') }}
    </div>
    <h2 class="mb-20">
      {{ $t('account.register.title') }}
    </h2>
    <FormField :model="form.firstname" type="input" :placeholder="$t('account.register.firstName')" />
    <FormField :model="form.lastname" type="input" :placeholder="$t('account.register.lastName')" />
    <FormField :model="form.email" type="email" :placeholder="$t('account.register.email')" />
    <FormField :model="form.password" type="password" :placeholder="$t('account.register.password')" />
    <FormField :model="form.confirmpassword" type="password" :placeholder="$t('account.register.confirmPassword')" />
    <button class="btn btn-primary w-100" @click.prevent="register">
      {{ $t('account.register.button') }}
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
      firstname: { value: '', errors: [] },
      lastname: { value: '', errors: [] },
      email: { value: '', errors: [] },
      password: { value: '', errors: [] },
      confirmpassword: { value: '', errors: [] }
    }
  }),
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
    }
  }
}
</script>
