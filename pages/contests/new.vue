<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Adauga concurs</h1>
    </div>
    <form>
      <FormField :model="form.name" type="input" placeholder="name" />
      <FormField :model="form.description" type="textarea" placeholder="description" />
      <FormField :model="form.start" type="date" />
      <FormField :model="form.end" type="date" />
      <button class="btn btn-primary" @click.prevent="add">
        Adauga
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
    roles: ['admin', 'organizer']
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
      },
      description: {
        value: '',
        errors: []
      },
      start: {
        value: new Date(),
        errors: []
      },
      end: {
        value: new Date(),
        errors: []
      }
    }
  }),
  methods: {
    async add () {
      this.isLoading = true
      try {
        const { status, data } = await this.$repositories.contests.create(this.formData)
        if (status === 201) {
          this.$router.push(`/contests/${data.id}`)
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
