<template>
  <textarea
      class="form-control"
      v-model="options"
  >
  </textarea>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true
    },
  },
  computed: {
    options: {
      get() {
        return this.modelValue.join('\n')
      },
      set(val) {
        let temp = val.split('\n')
        this.$emit('update:modelValue', temp)
      }
    }
  },
  emits: ['update:modelValue']
}
</script>