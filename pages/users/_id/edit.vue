<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Editeaza utilizator</h1>
      <button class="btn btn-danger" @click.prevent="deleteModal = true">
        Sterge
      </button>
    </div>
    <form>
      <FormField :model="form.role" type="input" placeholder="role" />
      <button class="btn btn-primary" @click.prevent="save">
        Salveaza
      </button>
    </form>
    <DeleteModal
      v-if="deleteModal"
      @delete="deleteEntity"
      @close="deleteModal = false"
    >
      Are ??
    </DeleteModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DeleteModal from '@/components/modals/DeleteModal'

export default {
  middleware: 'identity',
  meta: {
    roles: ['admin']
  },
  components: {
    DeleteModal
  },
  async fetch ({ store, route }) {
    await store.dispatch('users/getUser', { id: route.params.id })
  },
  data: () => ({
    isLoading: false,
    deleteModal: false,
    form: {
      role: {
        value: '',
        errors: []
      }
    }
  }),
  computed: {
    ...mapState({
      role: (state) => {
        if (state.auth.user === null) {
          return ''
        }
        return state.auth.user.role
      },
      user: (state) => {
        return state.users.user
      }
    }),
    formData () {
      const data = {}
      for (const [key, val] of Object.entries(this.form)) {
        data[key] = val.value
      }
      return data
    }
  },
  mounted () {
    for (const [key] of Object.entries(this.form)) {
      this.form[key].value = this.user[key]
    }
  },
  methods: {
    async save () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.users.update(this.user.id, this.formData)
        if (status === 200) {
          this.$router.push(`/users/${this.user.id}`)
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
    },
    async deleteEntity () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.users.delete(this.$route.params.id)
        if (status === 204) {
          this.$router.push('/users')
        }
        this.isLoading = false
        this.deleteModal = false
      } catch (error) {
        this.isLoading = false
      }
    }
  }
}
</script>
