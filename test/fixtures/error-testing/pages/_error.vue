<template>
  <h1>Hello World</h1>
</template>

<script>
export default {
  asyncData({ params }) {
    switch (params.error) {
      case 'kill-process':
        process.kill(process.pid, 'SIGTERM')
        break
      case 'nonzero-exit':
        process.exitCode = 1
        break
      case 'unhandled-error':
        throw new Error('My unhandled error')
    }
  }
}
</script>
