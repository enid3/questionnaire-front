<template>
  <div class="mt-2 mb-2 ms-1 me-1">
    <label
        v-if="label"
        :class="'col-'+labelCols"
        class="form-label"
        :for="labelFor"
    >
      <span class="text-secondary" >{{ label }}</span>
      <span class="text-danger">{{isRequired?'*':''}}</span>
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
    labelCols: String,
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    }
    //description: String,
  }
}
</script>

<style >
input[required]+label:after {
  content: '*';
  color: red;
}
</style>