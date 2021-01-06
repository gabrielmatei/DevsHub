<template>
  <div class="card tutorial-category add">
    <form>
      <FormField :model="form.name" type="input" :placeholder="$t('tutorialCategories.form.name')" css-class="form-field" />
      <button class="btn btn-primary" @click.prevent="add">
        {{ $t('tutorialCategories.form.add') }}
      </button>
    </form>
  </div>
</template>

<script>
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
      name: {
        value: '',
        errors: []
      }
    }
  }),
  methods: {
    async add () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.tutorialCategories.create(this.formData)
        if (status === 201) {
          this.form.name.value = ''
          this.form.name.errors = []
          await this.$store.dispatch('tutorials/getCategories')
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

<style scoped>
form {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
}
</style>
