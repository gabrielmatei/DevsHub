<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div class="header">
      <h1>Editeaza anunt</h1>
      <button class="btn btn-danger" @click.prevent="deleteModal = true">
        Sterge
      </button>
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
          <date-picker v-model="end.value" class="form-field mb-20" />
        </client-only>
        <span v-for="error in end.errors" :key="error" class="error">
          {{ error }}
        </span>
      </div>
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
import DeleteModal from '@/components/modals/DeleteModal'

export default {
  middleware: 'identity',
  meta: {
    roles: ['admin']
  },
  components: {
    DeleteModal
  },
  async fetch ({ store }) {
    await store.dispatch('announcements/getAnnouncements')
  },
  data: () => ({
    isLoading: false,
    deleteModal: false,
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
  mounted () {
    const announcement = this.$store.state.announcements.announcements.find(announcement => announcement.id === this.$route.params.id)

    this.title.value = announcement.title
    this.body.value = announcement.body
    this.type.value = announcement.type
    this.start.value = announcement.start
    this.end.value = announcement.end
  },
  methods: {
    async save () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.announcements.update(this.$route.params.id, {
          title: this.title.value,
          body: this.body.value,
          type: this.type.value,
          start: this.start.value,
          end: this.end.value
        })
        if (status === 200) {
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
    },
    async deleteEntity () {
      this.isLoading = true
      try {
        const { status } = await this.$repositories.announcements.delete(this.$route.params.id)
        if (status === 204) {
          this.$router.push('/announcements')
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
