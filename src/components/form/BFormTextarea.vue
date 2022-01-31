<template>
  <textarea
      class="form-control"
      :rows="rows"
      v-model="value"></textarea>
</template>

<script>
export default {
  name: "BFormTextArea",
  props: {
    modelValue: String,
    rows: 3,
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
