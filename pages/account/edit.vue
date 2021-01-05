<template>
  <div class="container">
    <loader v-if="isLoading" />
    <h1>Editeaza profil</h1>
    <form>
      <FormField :model="form.firstname" type="input" placeholder="firstname" />
      <FormField :model="form.lastname" type="input" placeholder="lastname" />
      <button class="btn btn-primary" @click.prevent="save">
        Salveaza
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/mixins/api'
import FormField from '@/components/forms/FormField'

export default {
  middleware: 'identity',
  meta: {
    roles: ['user']
  },
  components: {
    FormField
  },
  mixins: [api],
  data: () => ({
    form: {
      firstname: { value: '', errors: [] },
      lastname: { value: '', errors: [] }
    }
  }),
  computed: {
    ...mapState({
      loggedInUser: (state) => {
        return state.auth.user
      }
    })
  },
  mounted () {
    const name = this.loggedInUser.profile.name.split(' ')
    this.form.firstname.value = name[0]
    this.form.lastname.value = name[1]
  },
  methods: {
    async save () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.account.update(this.formData)
        if (status === 200) {
          await this.$auth.fetchUser()
          this.$router.push('/account')
        }
        this.isLoading = false
      } catch (error) {
        this.showErrors(error.response.data.errors)
        this.isLoading = false
      }
    }
  }
}
</script>
