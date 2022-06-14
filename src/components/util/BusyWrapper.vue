<template>
<div class="position-relative container ps-0 pe-0">
  <div
      :class="{ 'busy-div': busy }"
  >
    <slot></slot>
  </div>
  <div v-if="busy"
       class="position-absolute w-100 h-100 left-0 top-0 right-0 start-0 d-flex align-items-center justify-content-center">
    <LoadingSpinner/>
  </div>
</div>
</template>

<script>
import LoadingSpinner from "@/components/util/LoadingSpinner";
export default {
  name: "BusyWrapper",
  components: {LoadingSpinner},
  props: {
    busy: {
      type: Boolean,
      required: true,
    }
  }

}
</script>

<style scoped>
.busy-div {
  pointer-events: none;
  opacity: 0.4;
}
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>