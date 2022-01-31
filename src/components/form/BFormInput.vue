<template>
  <input class="form-control" v-model="value">
</template>

<script>
export default {
  name: "BFormInput",
  props:  {
    modelValue: String,
  },
  computed: {
    value: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) }
    }
  },
  emits: ['update:modelValue']

}
</script>