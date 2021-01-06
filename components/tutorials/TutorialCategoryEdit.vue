<template>
  <div class="card tutorial-category">
    <loader v-if="isLoading" />
    <div v-if="!editing" class="content">
      <h4>
        {{ category.name }}
      </h4>
    </div>
    <div v-if="!editing" class="actions">
      <button class="btn btn-primary mr-10" @click.prevent="editing = true">
        {{ $t('tutorialCategories.form.edit') }}
      </button>
      <button class="btn btn-danger" @click.prevent="deleteModal = true">
        {{ $t('tutorialCategories.form.delete') }}
      </button>
    </div>

    <FormField v-if="editing" :model="form.name" type="input" :placeholder="$t('tutorialCategories.form.name')" css-class="form-field" />
    <div v-if="editing" class="actions">
      <button class="btn btn-primary mr-10" @click.prevent="save">
        {{ $t('tutorialCategories.form.save') }}
      </button>
      <button class="btn btn-danger" @click.prevent="editing = false">
        {{ $t('tutorialCategories.form.cancel') }}
      </button>
    </div>
    <DeleteModal
      v-if="deleteModal"
      @delete="deleteEntity"
      @close="deleteModal = false"
    >
      {{ $t('tutorialCategories.form.deleteMessage') }}
    </DeleteModal>
  </div>
</template>

<script>
import api from '@/mixins/api'

export default {
  mixins: [api],
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    editing: false,
    deleteModal: false,
    form: {
      name: {
        value: '',
        errors: []
      }
    }
  }),
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
    }
  }
}
</script>

<style scoped>
.actions {
  flex-direction: row;
}
</style>
