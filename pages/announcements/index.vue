<template>
  <div class="container">
    <h1>{{ $t('announcements.title') }}</h1>
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
