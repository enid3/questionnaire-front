<template>
  <select
      class="form-select"
      v-model="value"
  >
    <template v-for="(option, index) in options">
      <option
          v-if="typeof option === 'object'"
          :key="'obj-' + index"
          :value="option.value"
      >
        {{option.text}}
      </option>
      <option
          v-else-if="typeof option === 'string'"
          :key="index"
          :value="option"
      >
        {{option}}
      </option>
    </template>
  </select>
</template>

<script>
export default {
  name: "BFormSelect",
  props: {
    modelValue: String,
    options: Array,
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