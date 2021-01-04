<template>
  <div :class="cssClass">
    <input
      v-if="type === 'input'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="text"
      placeholder="name"
    >
    <textarea
      v-if="type === 'textarea'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="text"
      placeholder="description"
      rows="4"
    />
    <client-only v-if="type === 'date'">
      <date-picker v-model="model.value" :class="`${model.errors.length > 0 ? 'invalid' : ''}`" />
    </client-only>
    <span v-for="error in model.errors" :key="error" class="error">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    cssClass: {
      type: String,
      required: false,
      default: 'form-field mb-20'
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
