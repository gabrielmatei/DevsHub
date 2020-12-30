<template>
  <div class="modal">
    <div class="container">
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <button class="btn btn-danger" @click="$emit('delete')">
          Delete
        </button>
        <button class="btn" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
