<template>
  <div class="card tutorial-category">
    <loader v-if="isLoading" />
    <div v-if="!editing">
      {{ category.name }}
    </div>
    <div v-if="!editing" class="actions">
      <button class="btn btn-primary" @click.prevent="editing = true">
        Editeaza
      </button>
      <button class="btn btn-danger" @click.prevent="deleteModal = true">
        Sterge
      </button>
    </div>

    <FormField v-if="editing" :model="form.name" type="input" placeholder="name" css-class="form-field" />
    <div v-if="editing" class="actions">
      <button class="btn btn-primary" @click.prevent="save">
        Salveaza
      </button>
      <button class="btn btn-danger" @click.prevent="editing = false">
        Anulare
      </button>
    </div>
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
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isLoading: false,
    editing: false,
    deleteModal: false,
    form: {
      name: {
        value: '',
        errors: []
      }
    }
  }),
  computed: {
    formData () {
      const data = {}
      for (const [key, val] of Object.entries(this.form)) {
        data[key] = val.value
      }
      return data
    }
  },
  mounted () {
    this.form.name.value = this.category.name
  },
  methods: {
    async deleteEntity () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.tutorialCategories.delete(this.category.id)
        if (status === 204) {
          await this.$store.dispatch('tutorials/getCategories')
        }
        this.isLoading = false
        this.deleteModal = false
      } catch (error) {
        this.isLoading = false
      }
    },
    async save () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.tutorialCategories.update(this.category.id, this.formData)
        if (status === 200) {
          this.editing = false
          await this.$store.dispatch('tutorials/getCategories')
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
    }
  }
}
</script>
