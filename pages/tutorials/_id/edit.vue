<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Editeaza tutorial</h1>
      <button class="btn btn-danger" @click.prevent="deleteModal = true">
        Sterge
      </button>
    </div>
    <form>
      <FormField :model="form.title" type="input" placeholder="title" />
      <FormField :model="form.content" type="textarea" placeholder="content" />
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
import api from '@/mixins/api'
import DeleteModal from '@/components/modals/DeleteModal'

export default {
  middleware: 'identity',
  meta: {
    roles: ['user']
  },
  components: {
    DeleteModal
  },
  mixins: [api],
  async fetch ({ store, route }) {
    await store.dispatch('tutorials/getTutorial', { id: route.params.id })
  },
  data: () => ({
    deleteModal: false,
    form: {
      title: {
        value: '',
        errors: []
      },
      content: {
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
      tutorial: (state) => {
        return state.tutorials.tutorial
      }
    })
  },
  mounted () {
    for (const [key] of Object.entries(this.form)) {
      this.form[key].value = this.tutorial[key]
    }
  },
  methods: {
    async save () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.tutorials.update(this.tutorial.id, this.formData)
        if (status === 200) {
          this.$router.push(`/tutorials/${this.tutorial.id}`)
        }
        this.isLoading = false
      } catch (error) {
        this.showErrors(error.response.data.errors)
        this.isLoading = false
      }
    },
    async deleteEntity () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.tutorials.delete(this.$route.params.id)
        if (status === 204) {
          this.$router.push('/tutorials')
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
