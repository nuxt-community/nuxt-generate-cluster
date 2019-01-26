<template>
  <h1>Hello World</h1>
</template>

<script>
export default {
  asyncData() {
    process.kill(process.pid, 'SIGABRT')
  }
}
</script>
