<template>
  <div class="container">
    <div class="loader" />
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: wait;
  pointer-events: none;
}

.loader,
.loader:before,
.loader:after {
  background: #ffffff;
  animation: loading 1s infinite ease-in-out;
  width: 1rem;
  height: 4rem;
}

.loader {
  color: #ffffff;
  position: relative;
  animation-delay: -0.16s;
}

.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}

.loader:before {
  left: -1.5rem;
  animation-delay: -0.32s;
}

.loader:after {
  left: 1.5rem;
}

@keyframes loading {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4rem;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5rem;
  }
}
</style>
