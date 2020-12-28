<template>
  <div class="container">
    <h1>{{ $t('contests.title') }}</h1>
  </div>
</template>

<script>
export default {
  middleware: 'identity',
  meta: {
    roles: ['any']
  }
}
</script>
