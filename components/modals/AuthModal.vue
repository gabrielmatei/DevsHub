<template>
  <div class="modal">
    <div class="container">
      <div class="header">
        <button class="btn btn-danger" @click="$emit('close')">
          Close
        </button>
      </div>
      <div class="body">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </div>
      <div class="footer">
        .... ?
        <button class="btn" @click="swapForm()">
          {{ isLogin ? 'Register' : 'Log in' }}
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
