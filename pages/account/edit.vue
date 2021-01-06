<template>
  <div class="container">
    <loader v-if="isLoading" />
    <h1>{{ $t('account.edit') }}</h1>
    <form>
      <FormField :model="form.firstname" type="input" :placeholder="$t('account.editPage.firstName')" />
      <FormField :model="form.lastname" type="input" :placeholder="$t('account.editPage.lastName')" />
      <button class="btn btn-primary" @click.prevent="save">
        {{ $t('account.editPage.save') }}
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
