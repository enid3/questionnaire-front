<template>
<button class="btn p-1" @click="onGoBack">
  <i class="bi bi-chevron-left"></i>
</button>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    onGoBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>

</style>