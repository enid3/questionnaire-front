<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BModal"
}
</script>

<style scoped>

</style>