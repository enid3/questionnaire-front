<template>
  <div class="mt-2 mb-2 ms-1 me-1">
    <label
        v-if="label"
        :class="'col-'+labelCols"
        class="form-label"
        :for="labelFor"
    >
      <span class="text-secondary" >{{ label }}</span>
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BFormGroup",
  props: {
    label: String,
    labelFor: String,
    labelCols: String
    //description: String,
  }
}
</script>
