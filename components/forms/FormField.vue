<template>
  <div :class="cssClass">
    <input
      v-if="type === 'input'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="text"
      :placeholder="placeholder"
    >
    <input
      v-if="type === 'email'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="email"
      :placeholder="placeholder"
      autocomplete="off"
    >
    <input
      v-if="type === 'password'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="password"
      :placeholder="placeholder"
      autocomplete="off"
    >
    <textarea
      v-if="type === 'textarea'"
      v-model="model.value"
      :class="`input ${model.errors.length > 0 ? 'invalid' : ''}`"
      type="text"
      :placeholder="placeholder"
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
