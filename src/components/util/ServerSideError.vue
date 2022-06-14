<template>
  <div
      v-if="error"
      class="alert alert-danger text-center"
      role="alert"
  >
    {{error}}
  </div>
</template>

<script>
export default {
  name: "ServerSideError",
  props: {
    error: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>