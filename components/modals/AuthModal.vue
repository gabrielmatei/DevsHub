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

<style scoped>
.modal {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .container {
  background: var(--bg-secondary);
  width: 450px;
}

.modal .header {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.modal .body {
  padding: 20px;
}

.modal .footer {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
