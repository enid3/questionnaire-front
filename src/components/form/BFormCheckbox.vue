<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" v-model="value" :id="id">
    <label class="form-check-label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "BFormCheckbox",
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      id: null
    }
  },
  computed: {
    value: {
      get() { return this.modelValue},
      set(val) { return this.$emit('update:modelValue', val) }
    }
  },
  emits: ['update:modelValue'],
  mounted () {
    this.id = this._uid
  }
}
</script>
