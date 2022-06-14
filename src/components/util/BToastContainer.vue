<template>
  <div class="toast-container position-absolute bottom-50 end-0 p-3">
    <BToast
      v-for="t in toasts"
      :toast="t"
      :key="t.id"
    />
  </div>
</template>

<script>
import BToast from "@/components/util/BToast";
export default {
  name: "BToastContainer",
  components: {BToast},
  props: {
    toasts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>