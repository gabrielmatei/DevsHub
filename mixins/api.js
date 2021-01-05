export default {
  data: () => ({
    isLoading: false,
    error: false
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
  methods: {
    showErrors (errors) {
      for (const [key] of Object.entries(this.form)) {
        this.form[key].errors = []
      }

      if (errors) {
        errors.forEach((error) => {
          this.form[error.fieldName].errors.push(error.message)
        })
      } else {
        this.error = true
      }
    }
  }
}
