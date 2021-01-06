<template>
  <div class="modal">
    <div class="container">
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <button class="btn btn-danger" @click="$emit('delete')">
          {{ $t('modals.delete.delete') }}
        </button>
        <button class="btn" @click="$emit('close')">
          {{ $t('modals.delete.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  justify-content: space-between;
}
</style>
