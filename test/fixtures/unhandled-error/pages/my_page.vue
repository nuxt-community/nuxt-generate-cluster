<template>
  <h1>User: {{ id }}</h1>
</template>

<script>
export default {
  asyncData() {
    throw new Error('My unhandled error')
  }
}
</script>
