<template>
  <div class="modal">
    <div class="container">
      <div class="header">
        <button class="btn btn-danger" @click="$emit('close')">
          {{ $t('account.modal.close') }}
        </button>
      </div>
      <div class="body">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </div>
      <div class="footer">
        {{ isLogin ? $t('account.modal.register') : $t('account.modal.login') }}
        <button class="btn" @click="swapForm()">
          {{ isLogin ? $t('account.register.title') : $t('account.login.title') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm'
import RegisterForm from '@/components/forms/RegisterForm'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data: () => ({
    isLogin: true
  }),
  methods: {
    swapForm () {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style scoped>
.footer {
  align-items: center;
}
</style>
