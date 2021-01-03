<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Adauga anunt</h1>
    </div>
    <form>
      <div class="form-field mb-20">
        <input
          id="title"
          v-model="title.value"
          :class="`input ${title.errors.length > 0 ? 'invalid' : ''}`"
          type="text"
          placeholder="title"
        >
        <span v-for="error in title.errors" :key="error" class="error">
          {{ error }}
        </span>
      </div>
      <div class="form-field mb-20">
        <input
          id="type"
          v-model="type.value"
          :class="`input ${type.errors.length > 0 ? 'invalid' : ''}`"
          type="text"
          placeholder="type"
        >
        <span v-for="error in type.errors" :key="error" class="error">
          {{ error }}
        </span>
      </div>
      <div class="form-field mb-20">
        <textarea
          id="body"
          v-model="body.value"
          :class="`input ${body.errors.length > 0 ? 'invalid' : ''}`"
          type="text"
          placeholder="body"
          rows="4"
        />
        <span v-for="error in body.errors" :key="error" class="error">
          {{ error }}
        </span>
      </div>
      <div class="form-field mb-20">
        <client-only>
          <date-picker v-model="start.value" :class="`${start.errors.length > 0 ? 'invalid' : ''}`" />
        </client-only>
        <span v-for="error in start.errors" :key="error" :class="`${start.errors.length > 0 ? 'invalid' : ''}`">
          {{ error }}
        </span>
      </div>
      <div class="form-field mb-20">
        <client-only>
          <date-picker v-model="end.value" :class="`${end.errors.length > 0 ? 'invalid' : ''}`" />
        </client-only>
        <span v-for="error in end.errors" :key="error" class="error">
          {{ error }}
        </span>
      </div>
      <button class="btn btn-primary" @click.prevent="add">
        Adauga
      </button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'identity',
  meta: {
    roles: ['admin']
  },
  data: () => ({
    isLoading: false,
    title: {
      value: '',
      errors: []
    },
    body: {
      value: '',
      errors: []
    },
    type: {
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
  }),
  methods: {
    async add () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.announcements.create({
          title: this.title.value,
          body: this.body.value,
          type: this.type.value,
          start: this.start.value,
          end: this.end.value
        })
        if (status === 201) {
          this.$router.push('/announcements')
        }
        this.isLoading = false
      } catch (error) {
        this.showErrors(error.response.data.errors)
        this.isLoading = false
      }
    },
    showErrors (errors) {
      this.title.errors = []
      this.body.errors = []
      this.type.errors = []
      this.start.errors = []
      this.end.errors = []

      errors.forEach((error) => {
        this[error.fieldName].errors.push(error.message)
      })
    }
  }
}
</script>
